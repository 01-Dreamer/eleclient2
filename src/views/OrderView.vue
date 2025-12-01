<template>
  <HeaderBase>我的订单</HeaderBase>

  <div class="tabs-container">
    <el-tabs v-model="activeTab" stretch class="custom-tabs">
      <el-tab-pane label="我是买家" name="buyer"></el-tab-pane>
      <el-tab-pane label="我是商家" name="merchant"></el-tab-pane>
      <el-tab-pane label="我是骑手" name="rider"></el-tab-pane>
    </el-tabs>
  </div>

  <el-main class="order-container">
    
    <div v-if="activeTab === 'buyer'">
      <el-card class="order-section" v-if="buyer_unpaid.length">
        <template #header>
          <div class="order-header">
            <span class="section-title">待支付订单</span>
            <el-tag type="warning" size="small" effect="dark">未支付</el-tag>
          </div>
        </template>
        <el-collapse>
          <el-collapse-item v-for="order in buyer_unpaid" :key="order.id" :name="order.id">
            <template #title>
              <div class="order-title">
                <span class="store-name text-truncate">{{ order.store_name }}</span>
                <span class="order-price">¥{{ order.total_price }}</span>
              </div>
            </template>
            <div class="order-content">
              <div class="time-display">下单时间: {{ order.time }}</div>
              <div class="order-item" v-for="(item, index) in order.items" :key="index">
                <span class="item-name">{{ item.name }}</span>
                <span class="item-price">¥{{ item.price }}</span>
              </div>
              <div class="btn-group">
                 <el-button type="info" plain size="small" @click="handleContactMerchant(order.id)">联系商家</el-button>
                 <el-button type="warning" round size="small" @click="handleBuyerPay(order.id)">去支付</el-button>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>

      <el-card class="order-section" v-if="buyer_ongoing.length">
        <template #header>
          <div class="order-header">
            <span class="section-title">进行中的订单</span>
            <el-tag type="success" size="small" effect="dark">配送中</el-tag>
          </div>
        </template>
        <el-collapse>
          <el-collapse-item v-for="order in buyer_ongoing" :key="order.id" :name="order.id">
            <template #title>
              <div class="order-title">
                <span class="store-name text-truncate">{{ order.store_name }}</span>
                <span class="order-price">¥{{ order.total_price }}</span>
              </div>
            </template>
            <div class="order-content">
              <div class="time-display">预计送达: {{ order.eta }}</div>
              <div class="order-item" v-for="(item, index) in order.items" :key="index">
                <span class="item-name">{{ item.name }}</span>
                <span class="item-price">¥{{ item.price }}</span>
              </div>
              <div class="btn-group">
                 <el-button type="info" plain size="small" @click="handleContactMerchant(order.id)">联系商家</el-button>
                 <el-button type="info" plain size="small" @click="handleContactRider(order.id)">联系骑手</el-button>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>

      <el-card class="order-section" v-if="buyer_history.length">
        <template #header>
          <div class="order-header">
            <span class="section-title">历史订单</span>
          </div>
        </template>
        <el-collapse>
          <el-collapse-item v-for="order in buyer_history" :key="order.id" :name="order.id">
            <template #title>
              <div class="order-title">
                <span class="store-name text-truncate">{{ order.store_name }}</span>
                <div class="status-tag">
                    <span v-if="order.status === 2" style="color: #F56C6C">商家拒单</span>
                    <span v-else-if="order.status === 1" class="text-muted">已完成</span>
                    <span v-else style="color: #E6A23C">待评价</span>
                </div>
              </div>
            </template>
            <div class="order-content">
              <div class="time-display">下单时间: {{ order.time }}</div>
              <div class="order-item" v-for="(item, index) in order.items" :key="index">
                <span class="item-name">{{ item.name }}</span>
                <span class="item-price">¥{{ item.price }}</span>
              </div>
              <el-divider style="margin: 2vw 0;" />
              
              <div v-if="order.status === 2" class="rejected-box">
                  <el-alert title="订单已被商家取消" type="error" :closable="false" show-icon />
                  <div class="btn-group" style="margin-top: 2vw;">
                    <el-button type="info" plain size="small" @click="handleContactMerchant(order.id)">联系商家</el-button>
                 </div>
              </div>

              <div v-else class="rating-area">
                 <div v-if="order.status === 1" class="rated-box">
                    <span>我的评分：</span>
                    <el-rate v-model="order.rating_score" disabled show-score allow-half text-color="#ff9900"/>
                 </div>
                 <div v-else class="rate-input-box">
                    <span>请评分：</span>
                    <el-rate v-model="order.rating_score" show-score allow-half text-color="#ff9900" />
                 </div>
                 <div class="btn-group" style="margin-top: 2vw;">
                    <el-button type="info" plain size="small" @click="handleContactMerchant(order.id)">联系商家</el-button>
                    <el-button type="info" plain size="small" @click="handleContactRider(order.id)">联系骑手</el-button>
                    <el-button v-if="order.status === 0" type="primary" plain size="small" @click="handleBuyerRate(order.id, order.rating_score)">提交评价</el-button>
                 </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>

    <div v-if="activeTab === 'merchant'">
      <el-card class="order-section">
        <template #header>
          <div class="order-header">
            <span class="section-title">待处理订单</span>
            <el-badge :value="merchant_pending.length" class="item" type="danger" />
          </div>
        </template>
        <el-collapse>
            <el-collapse-item v-for="order in merchant_pending" :key="order.id" :name="order.id">
                <template #title>
                    <div class="order-title">
                        <span class="store-name">#{{ order.id }} - {{ order.user_name }}</span>
                        <span class="text-muted">待接单</span>
                    </div>
                </template>
                <div class="order-content">
                    <div class="time-display">下单时间: {{ order.time }}</div>
                    <el-divider style="margin: 2vw 0;" />
                    <div class="order-item" v-for="(item, i) in order.items" :key="i">
                        <span>{{ item.name }} x{{ item.count }}</span>
                        <span>¥{{ item.price }}</span>
                    </div>
                    <div class="btn-group">
                        <el-button type="info" plain size="small" @click="handleContactBuyer(order.id)">联系买家</el-button>
                        <el-button type="danger" plain size="small" @click="handleMerchantReject(order.id)">拒绝</el-button>
                        <el-button type="primary" size="small" @click="handleMerchantAccept(order.id)">接单制作</el-button>
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>
      </el-card>

      <el-card class="order-section" v-if="merchant_ongoing.length">
        <template #header>
          <div class="order-header">
            <span class="section-title">进行中的订单</span>
            <el-tag type="primary" size="small" effect="dark">处理中</el-tag>
          </div>
        </template>
        <el-collapse>
            <el-collapse-item v-for="order in merchant_ongoing" :key="order.id" :name="order.id">
                <template #title>
                    <div class="order-title">
                        <span class="store-name">#{{ order.id }} - {{ order.user_name }}</span>
                        <div class="status-tag">
                            <el-tag v-if="order.status === 'delivering'" type="success" size="small" effect="plain">配送中</el-tag>
                            <el-tag v-else type="warning" size="small" effect="plain">待配送</el-tag>
                        </div>
                    </div>
                </template>
                <div class="order-content">
                    <div class="time-display">接单时间: {{ order.time }}</div>
                    <div class="order-item" v-for="(item, i) in order.items" :key="i">
                        <span>{{ item.name }} x{{ item.count }}</span>
                        <span>¥{{ item.price }}</span>
                    </div>
                    <div class="btn-group">
                        <el-button type="info" plain size="small" @click="handleContactBuyer(order.id)">联系买家</el-button>
                        <el-button v-if="order.status === 'delivering'" type="info" plain size="small" @click="handleContactRider(order.id)">联系骑手</el-button>
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>
      </el-card>

      <el-card class="order-section">
        <template #header>
          <div class="order-header">
            <span class="section-title">历史订单评价</span>
          </div>
        </template>
        <el-collapse>
            <el-collapse-item v-for="order in merchant_history" :key="order.id" :name="order.id">
                <template #title>
                    <div class="order-title">
                        <span class="store-name">#{{ order.id }}</span>
                        <span class="text-muted">{{ order.time.split(' ')[0] }}</span>
                    </div>
                </template>
                <div class="order-content">
                    <div class="order-item-simple">
                        共 {{ order.item_count }} 件商品 | 实付 ¥{{ order.total_amount }}
                    </div>
                    <div class="merchant-rating-box">
                        <div v-if="order.has_buyer_rated">
                            <span class="label">顾客评分:</span>
                            <el-rate v-model="order.buyer_rating" disabled show-score allow-half text-color="#ff9900" size="small"/>
                        </div>
                        <div v-else>
                            <el-tag type="info" size="small">顾客暂未评价</el-tag>
                        </div>
                    </div>
                    <div class="btn-group-right">
                        <el-button type="info" plain size="small" @click="handleContactBuyer(order.id)">联系买家</el-button>
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>

    <div v-if="activeTab === 'rider'">
      <el-card class="order-section">
        <template #header>
          <div class="order-header">
            <span class="section-title">待抢单大厅</span>
            <el-icon color="#409EFF"><Bicycle /></el-icon>
          </div>
        </template>
        <el-collapse>
            <el-collapse-item v-for="order in rider_pool" :key="order.id" :name="order.id">
                <template #title>
                    <div class="order-title">
                        <span class="store-name">{{ order.store_name }}</span>
                        <span class="order-price" style="color:#F56C6C">¥{{ order.income }}</span>
                    </div>
                </template>
                <div class="order-content">
                    <div class="time-display" style="margin-bottom: 2vw;">发布时间: {{ order.time }}</div>
                    <div class="rider-route">
                        <div class="route-point start">
                        <el-tag size="small" type="warning">取</el-tag> {{ order.store_name }}
                        </div>
                        <div class="route-point end">
                        <el-tag size="small" type="success">送</el-tag> {{ order.address }}
                        </div>
                    </div>
                    <div class="rider-info">
                        <span>含配送费: <b style="color:red">¥{{ order.income }}</b></span>
                        <span>距离: {{ order.distance }}km</span>
                    </div>
                    <el-button type="primary" style="width: 100%; margin-top: 2vw" @click="handleRiderGrab(order.id)">立即抢单</el-button>
                </div>
            </el-collapse-item>
        </el-collapse>
      </el-card>

       <el-card class="order-section">
        <template #header>
          <div class="order-header">
            <span class="section-title">配送中</span>
            <el-tag effect="dark" type="success" size="small">进行中</el-tag>
          </div>
        </template>
        <div class="empty-tip" v-if="rider_delivering.length === 0">暂无配送中订单</div>
        <el-collapse v-else>
            <el-collapse-item v-for="order in rider_delivering" :key="order.id" :name="order.id">
                <template #title>
                    <div class="order-title">
                        <span class="store-name">{{ order.store_name }}</span>
                        <span class="time-limit">{{ order.time_left }}分钟送达</span>
                    </div>
                </template>
                <div class="order-content">
                     <div class="time-display" style="margin-bottom: 2vw;">接单时间: {{ order.time }}</div>
                    <div class="rider-route">
                        <div class="route-point start">
                        <el-tag size="small" type="warning">取</el-tag> {{ order.store_name }}
                        </div>
                        <div class="route-point end">
                        <el-tag size="small" type="success">送</el-tag> {{ order.address }}
                        </div>
                    </div>
                    <el-divider style="margin: 2vw 0;" />
                    <el-button type="success" style="width: 100%;" @click="handleRiderFinish(order.id)">确认已送达</el-button>
                    <div class="btn-group" style="margin-top: 2vw;">
                        <el-button type="info" plain size="small" style="width: 48%;" @click="handleContactMerchant(order.id)">联系商家</el-button>
                        <el-button type="info" plain size="small" style="width: 48%;" @click="handleContactBuyer(order.id)">联系买家</el-button>
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>
      </el-card>

      <el-card class="order-section">
        <template #header>
            <div class="order-header">
                <span class="section-title">历史配送</span>
            </div>
        </template>
        <el-collapse>
            <el-collapse-item v-for="order in rider_history" :key="order.id" :name="order.id">
                <template #title>
                    <div class="order-title">
                        <span class="store-name">{{ order.store_name }}</span>
                        <span class="order-price" style="color:#F56C6C">+{{ order.income }}</span>
                    </div>
                </template>
                <div class="order-content">
                    <div class="time-display" style="margin-bottom: 2vw;">送达时间: {{ order.time }}</div>
                    <div class="rider-route">
                        <div class="route-point start">
                        <el-tag size="small" type="info">取</el-tag> {{ order.store_name }}
                        </div>
                        <div class="route-point end">
                        <el-tag size="small" type="info">送</el-tag> {{ order.address }}
                        </div>
                    </div>
                    <el-divider style="margin: 2vw 0;" />
                    <div class="rider-info">
                        <span>本次收入: <b style="color:#F56C6C">¥{{ order.income }}</b></span>
                        <span>距离: {{ order.distance }}km</span>
                    </div>
                    <div class="btn-group" style="margin-top: 2vw;">
                        <el-button type="info" plain size="small" style="width: 48%;" @click="handleContactMerchant(order.id)">联系商家</el-button>
                        <el-button type="info" plain size="small" style="width: 48%;" @click="handleContactBuyer(order.id)">联系买家</el-button>
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>

  </el-main>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import HeaderBase from '@/components/HeaderBase.vue';
import { Bicycle } from '@element-plus/icons-vue';

const activeTab = ref('buyer');

const buyer_unpaid = ref([
  {
    id: 101,
    store_name: '麦当劳 (科技园店)',
    time: '2025-12-01 20:06',
    total_price: 38.5,
    items: [{ name: '巨无霸套餐', price: 35.5 }, { name: '配送费', price: 3 }]
  }
]);

const buyer_ongoing = ref([
  {
    id: 104,
    store_name: '真功夫 (高新园店)',
    eta: '12:30',
    total_price: 28.0,
    items: [{ name: '香菇滑鸡饭', price: 25.0 }, { name: '配送费', price: 3 }]
  }
]);

const buyer_history = ref([
  {
    id: 102,
    store_name: '蜜雪冰城 (大学城店)',
    time: '2025-12-01 20:06',
    total_price: 15,
    status: 1, 
    rating_score: 5.0,
    items: [{ name: '冰鲜柠檬水', price: 4 }, { name: '珍珠奶茶', price: 8 }, { name: '配送费', price: 3 }]
  },
  {
    id: 103,
    store_name: '华莱士炸鸡汉堡',
    time: '2025-12-01 20:06',
    total_price: 22,
    status: 0, 
    rating_score: 0,
    items: [{ name: '香辣鸡腿堡', price: 10 }, { name: '辣翅一对', price: 9 }, { name: '配送费', price: 3 }]
  },
  {
    id: 105,
    store_name: '兰州拉面',
    time: '2025-12-01 20:06',
    total_price: 18,
    status: 2, 
    rating_score: 0,
    items: [{ name: '牛肉拉面', price: 15 }, { name: '配送费', price: 3 }]
  }
]);

const merchant_pending = ref([
  {
    id: 201,
    user_name: '张三先生',
    time: '2025-12-01 20:06',
    items: [{ name: '招牌红烧肉', count: 1, price: 45 }, { name: '米饭', count: 2, price: 4 }]
  }
]);

const merchant_ongoing = ref([
    {
        id: 202,
        user_name: '李女士',
        time: '2025-12-01 20:10',
        status: 'pending', 
        items: [{ name: '小炒黄牛肉', count: 1, price: 38 }]
    },
    {
        id: 203,
        user_name: '王五先生',
        time: '2025-12-01 20:00',
        status: 'delivering',
        items: [{ name: '酸辣土豆丝', count: 1, price: 18 }]
    }
]);

const merchant_history = ref([
    {
        id: 205,
        time: '2025-12-01 20:06',
        item_count: 3,
        total_amount: 56,
        has_buyer_rated: true,
        buyer_rating: 4.5
    },
    {
        id: 206,
        time: '2025-12-01 20:06',
        item_count: 1,
        total_amount: 22,
        has_buyer_rated: false,
        buyer_rating: 0
    }
]);

const rider_pool = ref([
  {
    id: 301,
    store_name: '必胜客 (高新南店)',
    time: '2025-12-01 20:06',
    address: '阳光花园3栋201',
    income: 5.5,
    distance: 1.2
  },
  {
    id: 302,
    store_name: '老王烧烤',
    time: '2025-12-01 20:06',
    address: '腾讯大厦B座',
    income: 8.0,
    distance: 2.5
  }
]);

const rider_delivering = ref([
    {
        id: 303,
        store_name: '喜茶 (万象天地店)',
        time: '2025-12-01 20:06',
        address: '深南大道9988号',
        time_left: 15
    }
]);

const rider_history = ref([
    { 
        id: 3001, 
        store_name: '肯德基', 
        address: '深大北门',
        time: '2025-12-01 20:06', 
        income: 6.5,
        distance: 1.5
    },
    { 
        id: 3002, 
        store_name: '真功夫', 
        address: '软件大厦',
        time: '2025-12-01 20:06', 
        income: 4.0,
        distance: 0.8
    },
    { 
        id: 3003, 
        store_name: '木屋烧烤', 
        address: '桂庙新村',
        time: '2025-12-01 20:06', 
        income: 12.0,
        distance: 3.2
    }
]);

const handleBuyerPay = (id: number) => console.log('买家支付:', id);
const handleBuyerRate = (id: number, score: number) => console.log('买家评价:', id, score);
const handleContactMerchant = (id: number) => console.log('联系商家:', id);
const handleContactBuyer = (id: number) => console.log('联系买家:', id);
const handleContactRider = (id: number) => console.log('联系骑手:', id);

const handleMerchantAccept = (id: number) => console.log('商家接单:', id);
const handleMerchantReject = (id: number) => console.log('商家拒单:', id);

const handleRiderGrab = (id: number) => console.log('骑手抢单:', id);
const handleRiderFinish = (id: number) => console.log('骑手送达:', id);

</script>

<style scoped>
.tabs-container {
  position: fixed;
  top: 12vw;
  left: 0;
  width: 100%;
  z-index: 99;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.order-container {
  padding: 3vw;
  margin-top: 24vw;
  padding-bottom: 20vw;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.order-section {
  margin-bottom: 3vw;
  border-radius: 2vw;
  border: none;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  font-size: 4vw;
  font-weight: bold;
  color: #333;
}

.order-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 2vw;
  font-size: 3.8vw;
}

.store-name {
  font-weight: 600;
  color: #333;
  max-width: 60%;
}

.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.order-price {
  font-weight: bold;
  color: #333;
}

.text-muted {
    color: #999;
    font-size: 3.2vw;
}

.order-content {
  padding: 0 2vw;
}

.time-display {
    font-size: 3vw;
    color: #999;
    margin-bottom: 1.5vw;
}

.order-item {
  display: flex;
  justify-content: space-between;
  padding: 1.5vw 0;
  font-size: 3.4vw;
  color: #666;
}

.btn-group {
  display: flex;
  justify-content: flex-end;
  gap: 2vw;
  margin-top: 2vw;
}

.btn-group-right {
    display: flex;
    justify-content: flex-end;
    margin-top: 2vw;
}

.rated-box, .rate-input-box {
    display: flex;
    align-items: center;
    font-size: 3.2vw;
    color: #666;
}

.order-item-simple {
    font-size: 3.2vw;
    color: #666;
    margin: 1.5vw 0;
}

.merchant-rating-box {
    display: flex;
    align-items: center;
    background: #fdfdfd;
    padding: 1vw 2vw;
    border-radius: 4px;
}
.merchant-rating-box .label {
    font-size: 3vw;
    color: #666;
    margin-right: 2vw;
}

.rider-route {
  display: flex;
  flex-direction: column;
  gap: 2vw;
}
.route-point {
  font-size: 3.6vw;
  color: #333;
}
.rider-info {
  display: flex;
  justify-content: space-between;
  font-size: 3.4vw;
  color: #666;
  margin-top: 2vw;
}

.time-limit {
    color: #E6A23C;
    font-weight: bold;
    font-size: 3.5vw;
}

.empty-tip {
  text-align: center;
  color: #999;
  padding: 4vw;
  font-size: 3.5vw;
}

:deep(.el-tabs__header) {
  margin: 0;
}
:deep(.el-tabs__item) {
  font-size: 4vw;
  height: 11vw;
  line-height: 11vw;
}
:deep(.el-card__header) {
  padding: 3vw;
  border-bottom: 1px solid #f0f0f0;
}
:deep(.el-collapse-item__header) {
  height: 12vw;
  line-height: 12vw;
}
</style>