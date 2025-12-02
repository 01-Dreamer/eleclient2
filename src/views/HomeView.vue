<template>
  <div class="home-container">
    <el-affix :offset="0">
      <header>
        <div class="header-content">
          <el-icon class="location-icon" @click="is_loading ? null : getPosition()">
            <Loading v-if="is_loading" />
            <Location v-else />
          </el-icon>
          <div class="location-text">
            <span class="text-truncate">{{ location }}</span>
            <el-icon>
              <CaretBottom />
            </el-icon>
          </div>
        </div>

        <div class="search-box">
          <el-input v-model="search_input" class="search-input" @keyup.enter="searchKey" @focus="handleSearchFocus"
            @blur="handleSearchBlur" :prefix-icon="Search" placeholder="搜索饿了么商家、商品名称" clearable />

          <transition name="el-fade-in-linear">
            <div class="hot-search-panel" v-if="isSearchFocused && !search_input">
              <div class="hot-title">热门搜索</div>
              <ul class="hot-list">
                <li v-for="(item, index) in hotSearchList" :key="index" @click="clickHotSearch(item)">
                  <span :class="['rank-num', { 'top-rank': index < 3 }]">{{ index + 1 }}</span>
                  <span class="hot-text">{{ item }}</span>
                  <el-tag v-if="index < 2" size="small" type="danger" effect="plain" round
                    style="margin-left: 5px; transform: scale(0.8);">热</el-tag>
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </header>
    </el-affix>

    <ul class="foodtype">
      <li v-for="(item, index) in foodTypes" :key="index">
        <el-image :src="item.img" fit="cover" loading="lazy" />
        <p>{{ item.name }}</p>
      </li>
    </ul>

    <div class="banner">
      <h3>品质套餐</h3>
      <p>搭配齐全吃得好</p>
      <el-link type="warning" :underline="false" class="banner-link">立即抢购 &gt;</el-link>
    </div>

    <div class="supermember">
      <div class="left">
        <el-image src="https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/super_member.png" class="member-img" />
        <h3>超级会员</h3>
        <p>&#8226; 每月享超值权益</p>
      </div>
      <div class="right">
        立即开通 &gt;
      </div>
    </div>

    <div class="recommend">
      <div class="recommend-line"></div>
      <p>推荐商家</p>
      <div class="recommend-line"></div>
    </div>

    <div class="recommendtype">
      <el-dropdown trigger="click" @command="handleSort">
        <span class="el-dropdown-link filter-item">
          综合排序<el-icon class="el-icon--right">
            <CaretBottom />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rating">好评优先</el-dropdown-item>
            <el-dropdown-item command="price">价格最低</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <span class="filter-item" @click="handleSort('distance')">距离最近</span>
      <span class="filter-item" @click="handleSort('sales')">销量最高</span>
      <span class="filter-item" @click="handleSort('filter')">筛选<el-icon>
          <Filter />
        </el-icon></span>
    </div>

    <ul class="business">
      <li v-for="business in businesses" :key="business.id" @click="clickBusiness(business.id)">
        <el-image :src="business.store_cover" class="business-img" fit="cover" lazy />

        <div class="business-info">
          <div class="business-info-h">
            <h3>{{ business.store_name }}</h3>
            <el-icon color="#999">
              <MoreFilled />
            </el-icon>
          </div>

          <div class="business-info-star">
            <div class="star-wrapper">
              <el-rate v-model="business.store_review" disabled show-score text-color="#ff9900" score-template="{value}"
                size="small" />
              <span class="sales">销售{{ business.store_volume }}单</span>
            </div>
            <el-tag effect="dark" type="primary" size="small" class="delivery-tag">蜂鸟专送</el-tag>
          </div>

          <div class="business-info-delivery">
            <span>&#165;{{ business.start_price }}起送 | &#165;{{ business.delivery_fee }}配送</span>
            <span>{{ business.distance }}km | {{ business.duration }}分钟</span>
          </div>

          <div class="business-info-explain" v-if="business.store_description">
            <el-tag type="info" size="small" effect="plain">{{ business.store_description }}</el-tag>
          </div>

          <div class="business-info-promotion" v-for="(promo, pIndex) in business.promotions" :key="pIndex">
            <div class="left">
              <el-tag :color="promo.color" effect="dark" size="small" style="border:none; color: white;">{{ promo.icon
                }}</el-tag>
              <span class="promo-text">{{ promo.text }}</span>
            </div>
            <div class="right" v-if="pIndex === 0 && business.promotions.length > 1">
              <span>{{ business.promotions.length }}个活动</span>
              <el-icon>
                <CaretBottom />
              </el-icon>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div style="height: 10vh;"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { Location, Loading, Search, CaretBottom, Filter, Picture, MoreFilled } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

const is_loading = ref(false);
const location = ref('上海市普陀区长风生态商务区');
const search_input = ref('');
const isSearchFocused = ref(false);

const hotSearchList = ref([
  '蜜雪冰城', '华莱士', '螺蛳粉', '麻辣烫',
  '一点点', '炸鸡', '烧烤', '米线', '汉堡王', '水果'
]);

const foodTypes = reactive([
  { name: '美食', img: 'https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/dcfl01.png' },
  { name: '早餐', img: 'https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/dcfl02.png' },
  { name: '跑腿代购', img: 'https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/dcfl03.png' },
  { name: '汉堡披萨', img: 'https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/dcfl04.png' },
  { name: '甜品饮品', img: 'https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/dcfl05.png' },
  { name: '速食简餐', img: 'https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/dcfl06.png' },
  { name: '地方小吃', img: 'https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/dcfl07.png' },
  { name: '米粉面馆', img: 'https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/dcfl08.png' },
  { name: '包子粥铺', img: 'https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/dcfl09.png' },
  { name: '炸鸡炸串', img: 'https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/dcfl10.png' },
]);

const businesses = ref([
  {
    id: 1,
    store_name: '万家饺子（软件园店）',
    store_cover: 'https://elem-zone.oss-cn-shenzhen.aliyuncs.com/user/avatar/1.jpg',
    store_review: 4.8,
    store_volume: 688,
    start_price: 15,
    delivery_fee: 3,
    distance: 1.2,
    duration: 30,
    store_description: '现包现煮，味道鲜美',
    promotions: [
      { icon: '新', color: '#70BC46', text: '饿了么新用户首单立减9元' },
      { icon: '特', color: '#F1884F', text: '特价商品5元起' }
    ]
  },
  {
    id: 2,
    store_name: '小锅饭（科技园店）',
    store_cover: 'https://elem-zone.oss-cn-shenzhen.aliyuncs.com/user/avatar/2.jpg',
    store_review: 3.5,
    store_volume: 120,
    start_price: 20,
    delivery_fee: 5,
    distance: 2.5,
    duration: 45,
    store_description: '分量足，味道好',
    promotions: [
      { icon: '减', color: '#F07373', text: '满30减5，满60减8' }
    ]
  }
]);

const getPosition = () => {
  is_loading.value = true;
  console.log('正在获取定位...');
  setTimeout(() => {
    location.value = '定位成功：北京市朝阳区';
    is_loading.value = false;
    ElMessage.success('定位更新成功');
  }, 1000);
};

const handleSearchFocus = () => {
  isSearchFocused.value = true;
};

const handleSearchBlur = () => {
  setTimeout(() => {
    isSearchFocused.value = false;
  }, 100);
};

const clickHotSearch = (item: string) => {
  search_input.value = item;
  searchKey();
};

const searchKey = () => {
  if (!search_input.value) return;
};

const handleSort = (type: string) => {
  console.log('执行排序：', type);
  if (type === 'sales') {
    businesses.value.sort((a, b) => b.store_volume - a.store_volume);
  } else if (type === 'distance') {
    businesses.value.sort((a, b) => a.distance - b.distance);
  }
};

const clickBusiness = (id: number) => {
  console.log('点击了商家ID：', id);
};
</script>

<style scoped>
.home-container {
  width: 100%;
  overflow-x: hidden;
  background-color: #fff;
}

header {
  width: 100%;
  background-color: #0097FF;
  padding-bottom: 2vw;
  display: flex;
  flex-direction: column;
}

.header-content {
  display: flex;
  align-items: center;
  padding: 2vw 4vw;
  height: 10vw;
}

.location-icon {
  font-size: 6vw;
  color: #FFF;
  cursor: pointer;
  margin-right: 2vw;
}

.location-text {
  font-size: 4.5vw;
  font-weight: 700;
  color: #FFF;
  display: flex;
  align-items: center;
  max-width: 80%;
}

.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-box {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 1vw;
  position: relative;
}

:deep(.el-input__wrapper) {
  border-radius: 20px;
  box-shadow: none;
}

.search-input {
  width: 92%;
}

.hot-search-panel {
  position: absolute;
  top: 100%;
  left: 4%;
  width: 92%;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 200;
  padding: 2vw 0;
  box-sizing: border-box;
  margin-top: 1vw;
}

.hot-title {
  padding: 0 3vw 2vw 3vw;
  font-size: 3.5vw;
  color: #666;
  font-weight: bold;
  border-bottom: 1px solid #f0f0f0;
}

.hot-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.hot-list li {
  display: flex;
  align-items: center;
  padding: 2.5vw 3vw;
  cursor: pointer;
  font-size: 3.5vw;
  color: #333;
}

.hot-list li:active {
  background-color: #f5f5f5;
}

.rank-num {
  width: 5vw;
  font-weight: bold;
  color: #999;
  margin-right: 2vw;
  font-style: italic;
}

.rank-num.top-rank {
  color: #ff4b33;
}

.hot-text {
  flex: 1;
}

.foodtype {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 2vw 0;
  margin: 0;
  list-style: none;
}

.foodtype li {
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 3vw;
  cursor: pointer;
}

.foodtype li .el-image {
  width: 12vw;
  height: 12vw;
  margin-bottom: 1vw;
}

.foodtype li p {
  font-size: 3.2vw;
  color: #666;
  margin: 0;
}

.banner {
  width: 95%;
  margin: 2vw auto;
  height: 29vw;
  background-image: url("https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/index_banner.png");
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 4px;
  padding: 3vw 5vw;
  box-sizing: border-box;
}

.banner h3 {
  font-size: 4.5vw;
  margin: 0 0 1vw 0;
  color: #333;
}

.banner p {
  font-size: 3.4vw;
  color: #666;
  margin: 0 0 2vw 0;
}

.banner-link {
  font-size: 3.2vw;
  font-weight: 700;
  color: #C79060;
}

.supermember {
  width: 95%;
  margin: 0 auto 4vw auto;
  height: 11.5vw;
  background-color: #FEEDC1;
  border-radius: 4px;
  color: #644F1B;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3vw;
  box-sizing: border-box;
}

.supermember .left {
  display: flex;
  align-items: center;
}

.member-img {
  width: 6vw;
  height: 6vw;
  margin-right: 2vw;
}

.supermember .left h3 {
  font-size: 4vw;
  margin: 0 2vw 0 0;
}

.supermember .left p {
  font-size: 3vw;
  margin: 0;
}

.supermember .right {
  font-size: 3vw;
}

.recommend {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vw;
}

.recommend .recommend-line {
  width: 6vw;
  height: 1px;
  background-color: #999;
}

.recommend p {
  font-size: 4vw;
  margin: 0 4vw;
  font-weight: bold;
}

.recommendtype {
  position: sticky;
  top: 13vw;
  z-index: 10;
  background: white;
  width: 100%;
  height: 10vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.filter-item,
.el-dropdown-link {
  font-size: 3.5vw;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.business {
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
}

.business li {
  padding: 3vw;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  cursor: pointer;
}

.business-img {
  width: 18vw;
  height: 18vw;
  border-radius: 4px;
  flex-shrink: 0;
}

.business-info {
  flex: 1;
  padding-left: 3vw;
  overflow: hidden;
}

.business-info-h {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5vw;
}

.business-info-h h3 {
  font-size: 4.2vw;
  color: #333;
  margin: 0;
  font-weight: 700;
}

.business-info-star {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5vw;
}

.star-wrapper {
  display: flex;
  align-items: center;
}

.star-wrapper .sales {
  font-size: 3vw;
  color: #666;
  margin-left: 2vw;
}

:deep(.el-rate) {
  --el-rate-icon-size: 3.5vw;
  --el-rate-icon-margin: 0;
  height: auto;
}

:deep(.el-rate__text) {
  font-size: 3.2vw;
  margin-left: 1vw;
}

.delivery-tag {
  transform: scale(0.9);
}

.business-info-delivery {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 3vw;
  margin-bottom: 1.5vw;
}

.business-info-explain {
  margin-bottom: 1.5vw;
}

.business-info-promotion {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1vw;
}

.business-info-promotion .left {
  display: flex;
  align-items: center;
  overflow: hidden;
}

.promo-text {
  font-size: 3vw;
  color: #666;
  margin-left: 2vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.business-info-promotion .right {
  display: flex;
  align-items: center;
  font-size: 2.5vw;
  color: #999;
  flex-shrink: 0;
}
</style>