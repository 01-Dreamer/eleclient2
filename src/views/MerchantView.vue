<template>
  <div class="page-container">
    <HeaderBase>商家信息</HeaderBase>

    <div class="merchant-section">
      <div 
        class="merchant-logo" 
        @click="is_merchant ? updateStoreCover() : null"
      >
        <el-image :src="merchant_info.cover" fit="cover" class="logo-img" />
      </div>

      <div class="merchant-info">
        <h1 @click="is_merchant ? editStoreField('name', '店铺名称') : null">
          {{ merchant_info.name }}
        </h1>

        <div class="meta-info">
          <el-tag 
            size="small" type="info" effect="plain"
            @click="is_merchant ? editStoreField('start_price', '起送价') : null"
          >
            ¥{{ merchant_info.start_price }}起送
          </el-tag>

          <el-tag 
            size="small" type="info" effect="plain"
            @click="is_merchant ? editStoreField('delivery_fee', '配送费') : null"
          >
            ¥{{ merchant_info.delivery_fee }}配送
          </el-tag>

          <span class="distance-time">{{ merchant_info.distance }}km | {{ merchant_info.duration }}分钟</span>
        </div>

        <p 
          class="desc text-truncate"
          @click="is_merchant ? editStoreField('description', '店铺描述') : null"
        >
          {{ merchant_info.description }}
        </p>
        
        <el-button 
          v-if="!is_merchant" 
          type="primary" 
          size="small" 
          class="contact-btn" 
          round
          @click="clickContact"
        >
          <el-icon class="el-icon--left"><Phone /></el-icon>联系商家
        </el-button>
      </div>
    </div>

    <div class="food-container" :class="{ 'merchant-padding': is_merchant, 'customer-padding': !is_merchant }">
      <div 
        v-for="(item, index) in items" 
        :key="item.id" 
        class="food-item"
      >
        
        <div class="move-actions" v-if="is_merchant">
          <div 
            class="arrow-btn up" 
            :class="{ disabled: index === 0 }" 
            @click.stop="index > 0 ? moveItem(index, -1) : null"
          >
            <el-icon><CaretTop /></el-icon>
          </div>
          <div 
            class="arrow-btn down" 
            :class="{ disabled: index === items.length - 1 }" 
            @click.stop="index < items.length - 1 ? moveItem(index, 1) : null"
          >
            <el-icon><CaretBottom /></el-icon>
          </div>
        </div>

        <div class="food-img-wrapper" style="position: relative;">
          <el-image 
            :src="item.cover" 
            fit="cover" 
            class="food-img"
            @click="is_merchant ? updateItemCover(item.id) : null"
            lazy
          />
        </div>

        <div class="food-content">
          <h3 
            class="food-title text-truncate" 
            @click="is_merchant ? editItemField(item.id, 'name', '商品名称') : null"
          >
            {{ item.name }}
          </h3>
          
          <p 
            class="food-desc text-truncate"
            @click="is_merchant ? editItemField(item.id, 'description', '商品描述') : null"
          >
            {{ item.description }}
          </p>

          <div class="food-row-bottom">
            <div 
              class="food-price"
              @click="is_merchant ? editItemField(item.id, 'price', '商品价格') : null"
            >
              <span class="currency">¥</span>
              <span class="amount">{{ item.price }}</span>
            </div>

            <div class="food-actions">
              <el-button v-if="is_merchant" type="danger" circle size="small" class="action-btn-del" @click="delItem(item.id)">
                <el-icon><Delete /></el-icon>
              </el-button>

              <div v-else class="stepper">
                <transition name="el-zoom-in-center">
                  <div v-show="item.quantity > 0" class="stepper-group">
                    <el-icon class="btn-minus" @click.stop="decrementItem(item)"><Minus /></el-icon>
                    <span class="quantity">{{ item.quantity }}</span>
                  </div>
                </transition>
                <el-icon class="btn-plus" @click.stop="incrementItem(item)"><Plus /></el-icon>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="add-item-wrapper" v-if="is_merchant">
        <el-button type="success" class="add-btn" @click="addItem">
          <el-icon class="el-icon--left"><Plus /></el-icon> 添加新商品
        </el-button>
      </div>
    </div>

    <div class="cart-bar" v-if="!is_merchant">
      <div class="cart-left">
        <div class="cart-icon-wrapper" :class="{ 'has-goods': total_quantity > 0 }">
          <el-badge :value="total_quantity" :hidden="total_quantity === 0" class="cart-badge">
            <el-icon :size="24"><ShoppingCart /></el-icon>
          </el-badge>
        </div>
        <div class="cart-info">
          <p class="total-price">¥{{ total_price }}</p>
          <p class="delivery-tip">另需配送费 ¥{{ merchant_info.delivery_fee }}</p>
        </div>
      </div>
      <div 
        class="cart-right" 
        :class="{ 'can-pay': total_price >= merchant_info.start_price }"
        @click="goToPay"
      >
        {{ pay_button_text }}
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import HeaderBase from "@/components/HeaderBase.vue";
import { 
  Delete, Plus, Minus, ShoppingCart, Picture, Phone, CaretTop, CaretBottom 
} from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const is_merchant = ref(false);

const merchant_info = ref({
  name: '麦当劳（科技园店）',
  cover: 'https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/ce5dbd36-b308-4a59-9c0a-02a416a50c45.png',
  description: '全球知名快餐连锁，品质保证，现点现做。',
  start_price: 15,
  delivery_fee: 3,
  distance: 1.2,
  duration: 30
});

const items = ref([
  {
    id: 101,
    name: '巨无霸汉堡',
    description: '100%纯牛肉，搭配特制酱汁',
    price: 25,
    cover: 'https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/ce5dbd36-b308-4a59-9c0a-02a416a50c45.png',
    quantity: 0,
    priority: 10000.0 
  },
  {
    id: 102,
    name: '麦辣鸡腿堡',
    description: '金黄酥脆，鲜嫩多汁，经典辣味',
    price: 18,
    cover: 'https://elem-zone.oss-cn-shenzhen.aliyuncs.com/user/avatar/2.jpg',
    quantity: 0,
    priority: 20000.0
  },
  {
    id: 103,
    name: '大杯可乐',
    description: '冰爽刺激，解渴神器',
    price: 8,
    cover: 'https://elem-zone.oss-cn-shenzhen.aliyuncs.com/user/avatar/4.jpg',
    quantity: 0,
    priority: 30000.0
  }
]);

const total_quantity = computed(() => {
  return items.value.reduce((sum, item) => sum + item.quantity, 0);
});

const total_price = computed(() => {
  return items.value.reduce((sum, item) => sum + item.quantity * item.price, 0);
});

const pay_button_text = computed(() => {
  if (total_price.value === 0) return `¥${merchant_info.value.start_price}起送`;
  if (total_price.value < merchant_info.value.start_price) return `还差¥${merchant_info.value.start_price - total_price.value}起送`;
  return '去结算';
});

const clickContact = () => {
  ElMessage.info('正在联系商家...');
};

const updateStoreCover = () => {
  ElMessageBox.confirm('是否更换店铺封面图？', '更换封面', { confirmButtonText: '更换' })
    .then(() => { ElMessage.success('店铺封面已更新'); });
};

const updateItemCover = (id: number) => {
  ElMessageBox.confirm('是否更换该商品图片？', '更换商品图', { confirmButtonText: '更换' })
    .then(() => { ElMessage.success(`商品 ${id} 图片已更新`); });
};

const editStoreField = (key: keyof typeof merchant_info.value, label: string) => {
  ElMessageBox.prompt(`请输入新的${label}`, '修改信息', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue: String(merchant_info.value[key]),
  }).then(({ value }) => {
    if (key === 'start_price' || key === 'delivery_fee') {
        (merchant_info.value as any)[key] = Number(value);
    } else {
        (merchant_info.value as any)[key] = value;
    }
    ElMessage.success(`${label} 已修改为：${value}`);
  }).catch(() => {});
};

const editItemField = (id: number, key: 'name' | 'description' | 'price', label: string) => {
  const item = items.value.find(i => i.id === id);
  if (!item) return;

  ElMessageBox.prompt(`请输入新的${label}`, '修改商品信息', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue: String(item[key]),
  }).then(({ value }) => {
    if (key === 'price') {
        item[key] = Number(value);
    } else {
        item[key] = value;
    }
    ElMessage.success(`${label} 已修改为：${value}`);
  }).catch(() => {});
};

const delItem = (id: number) => {
  ElMessageBox.confirm('确定删除该商品吗？', '警告', { type: 'warning' })
    .then(() => {
        items.value = items.value.filter(item => item.id !== id);
        ElMessage.success('商品已删除');
    }).catch(() => {});
};

const addItem = () => {
  ElMessage.success('点击了添加新商品');
  const maxPriority = items.value.length > 0 ? Math.max(...items.value.map(i => i.priority)) : 0;
  items.value.push({
    id: Date.now(),
    name: '新增商品',
    description: '请点击修改描述',
    price: 99,
    cover: '',
    quantity: 0,
    priority: maxPriority + 10000.0
  });
};

const moveItem = (index: number, direction: number) => {
  const targetIndex = index + direction;
  
  if (targetIndex < 0 || targetIndex >= items.value.length) return;

  const currentItem = items.value[index];
  const targetItem = items.value[targetIndex];

  if (!currentItem || !targetItem) return;

  items.value[index] = targetItem;
  items.value[targetIndex] = currentItem;

  const tempPriority = currentItem.priority;
  currentItem.priority = targetItem.priority;
  targetItem.priority = tempPriority;

  console.log("=== 移动后商品列表顺序及优先级 ===");
  items.value.forEach(item => {
    console.log(`ID: ${item.id}, Name: ${item.name}, Priority: ${item.priority}`);
  });

  ElMessage.success('商品顺序已更新');
};

const incrementItem = (item: any) => { item.quantity++; };
const decrementItem = (item: any) => { if (item.quantity > 0) item.quantity--; };
const goToPay = () => { if (total_price.value >= merchant_info.value.start_price) ElMessage.success('去结算'); };
</script>

<style scoped>
.page-container {
  width: 100%;
  background-color: #fff;
}

.merchant-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 14vw;
  padding-bottom: 2vw;
  border-bottom: 1px solid #f2f2f2;
}

.merchant-logo {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2vw;
  position: relative;
}

.logo-img {
  width: 28vw;
  height: 28vw;
  border-radius: 8px;
  display: block;
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
  font-size: 8vw;
}

.merchant-info {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2vw;
  text-align: center;
}

.merchant-info h1 {
  font-size: 5vw;
  font-weight: 700;
  margin: 1vw 0;
  color: #333;
  padding: 0 1vw;
}

.meta-info {
  display: flex;
  align-items: center;
  gap: 1.5vw;
  margin-bottom: 1.5vw;
}

.distance-time {
  font-size: 3vw;
  color: #999;
}

.desc {
  font-size: 3.2vw;
  color: #666;
  margin: 0 0 2vw 0;
  width: 100%;
  padding: 0 1vw;
}

.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.contact-btn {
  width: 40%;
}

.food-container {
  width: 100%;
}

.merchant-padding {
  padding-bottom: 18vw;
}
.customer-padding {
  padding-bottom: 32vw;
}

.food-item {
  display: flex;
  padding: 3vw 4vw;
  border-bottom: 1px solid #f8f8f8;
  height: 22vw;
  box-sizing: content-box;
  background-color: #fff;
  transition: background-color 0.2s;
  align-items: center;
}

.move-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 2vw;
  gap: 1vw;
  flex-shrink: 0;
}

.arrow-btn {
  font-size: 4.5vw;
  color: #909399;
  cursor: pointer;
  padding: 1vw;
  border-radius: 4px;
  background-color: #f5f7fa;
}

.arrow-btn:active {
  background-color: #e6e8eb;
}

.arrow-btn.disabled {
  color: #e4e7ed;
  cursor: not-allowed;
  background-color: transparent;
}

.food-img-wrapper {
  flex-shrink: 0;
  margin-right: 3vw;
}

.food-img {
  width: 22vw;
  height: 22vw;
  border-radius: 6px;
  display: block;
}

.food-img-slot {
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #909399;
}

.food-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  overflow: hidden;
  height: 100%; 
}

.food-title {
  font-size: 4.2vw;
  font-weight: 700;
  color: #333;
  margin: 0;
  line-height: 1.2;
}

.food-desc {
  font-size: 3vw;
  color: #999;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.food-row-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0; 
}

.food-price {
  color: #ff5339;
  font-weight: 600;
  display: flex;
  align-items: baseline;
  padding-right: 2vw;
}

.currency {
  font-size: 3.2vw;
  margin-right: 2px;
}

.amount {
  font-size: 4.8vw;
}

.food-actions {
  display: flex;
  align-items: center;
}

.stepper {
  display: flex;
  align-items: center;
}

.stepper-group {
  display: flex;
  align-items: center;
}

.btn-minus, .btn-plus {
  font-size: 5.5vw;
  cursor: pointer;
}

.btn-minus {
  color: #999;
  border: 1px solid #ddd;
  border-radius: 50%;
  padding: 1px;
}

.btn-plus {
  color: #2395ff;
  background-color: #2395ff;
  color: white;
  border-radius: 50%;
  padding: 1px;
}

.quantity {
  font-size: 3.8vw;
  color: #333;
  width: 7vw;
  text-align: center;
}

.add-item-wrapper {
  padding: 4vw;
}
.add-btn {
  width: 100%;
  height: 10vw;
  font-size: 3.5vw;
}

.cart-bar {
  position: fixed;
  left: 0;
  bottom: 14vw;
  width: 100%;
  height: 13vw;
  background-color: #505051;
  display: flex;
  z-index: 100;
}

.cart-left {
  flex: 2;
  display: flex;
  align-items: center;
  position: relative;
}

.cart-icon-wrapper {
  position: relative;
  top: -4vw;
  left: 4vw;
  width: 13vw;
  height: 13vw;
  background-color: #363636;
  border-radius: 50%;
  border: 1.5vw solid #444;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #80858a;
}

.cart-icon-wrapper.has-goods {
  background-color: #3190E8;
  color: #fff;
}

.cart-badge {
  transform: translateY(-2px);
}

.cart-info {
  margin-left: 8vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.total-price {
  color: #fff;
  font-size: 4.5vw;
  font-weight: bold;
  margin: 0;
}

.delivery-tip {
  color: #999;
  font-size: 2.8vw;
  margin: 0;
}

.cart-right {
  flex: 1;
  background-color: #535356;
  color: #999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4vw;
  font-weight: bold;
  user-select: none;
}

.cart-right.can-pay {
  background-color: #38CA73;
  color: #fff;
  cursor: pointer;
}
</style>