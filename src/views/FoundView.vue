<template>
  <HeaderBase>
    商家列表
  </HeaderBase>

  <div class="business-list">
    <div 
      v-for="business in businesses" 
      :key="business.id" 
      class="business-item" 
      @click="clickBusiness(business.id)"
    >
      <div class="img-box">
        <el-badge :value="getUnreadCount(business.id)" :max="99" :hidden="getUnreadCount(business.id) <= 0" class="badge-item">
          <el-image :src="business.store_cover" fit="cover" class="store-img" lazy />
        </el-badge>
      </div>
      
      <div class="info-box">
        <h3 class="store-name text-truncate">{{ business.store_name }}</h3>
        <div class="store-delivery">
          <span>&#165;{{ business.start_price }}起送</span>
          <el-divider direction="vertical" />
          <span>&#165;{{ business.delivery_fee }}配送</span>
        </div>
        <p class="store-desc text-truncate">{{ business.store_description }}</p>
      </div>
      
      <div class="arrow-box">
        <el-icon><ArrowRight /></el-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import HeaderBase from '@/components/HeaderBase.vue';
import { ArrowRight } from '@element-plus/icons-vue';

const businesses = ref([
  {
    id: 1,
    store_name: '万家饺子（软件园店）',
    store_cover: 'https://elem-zone.oss-cn-shenzhen.aliyuncs.com/user/avatar/1.jpg',
    store_description: '现包现煮，味道鲜美',
    start_price: 15,
    delivery_fee: 3
  },
  {
    id: 2,
    store_name: '小锅饭（科技园店）',
    store_cover: 'https://elem-zone.oss-cn-shenzhen.aliyuncs.com/user/avatar/2.jpg',
    store_description: '分量足，味道好',
    start_price: 20,
    delivery_fee: 4
  },
  {
    id: 3,
    store_name: '麦当劳（高新南店）',
    store_cover: 'https://elem-zone.oss-cn-shenzhen.aliyuncs.com/user/avatar/3.jpg',
    store_description: '全球连锁，品质保证',
    start_price: 0,
    delivery_fee: 9
  }
]);

const getUnreadCount = (id: number) => {
  if (id === 1) return 3;
  if (id === 3) return 12;
  return 0;
};

const clickBusiness = (id: number) => {
  console.log(id);
};
</script>

<style scoped>
.business-list {
  width: 100%;
  margin-top: 12vw;
  margin-bottom: 14vw;
  background-color: #fff;
}

.business-item {
  display: flex;
  align-items: center;
  padding: 3vw;
  border-bottom: 1px solid #f2f2f2;
  cursor: pointer;
  transition: background-color 0.2s;
}

.business-item:active {
  background-color: #fafafa;
}

.img-box {
  margin-right: 3vw;
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.store-img {
  width: 16vw;
  height: 16vw;
  border-radius: 4px;
  display: block;
}

.image-slot {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
  color: #909399;
  font-size: 5vw;
}

:deep(.el-badge__content) {
  border: none;
  transform: translateY(-50%) translateX(50%) scale(0.8);
}

.info-box {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.store-name {
  font-size: 4vw;
  color: #333;
  margin: 0 0 1.5vw 0;
  font-weight: 600;
}

.store-delivery {
  font-size: 3vw;
  color: #666;
  display: flex;
  align-items: center;
  margin-bottom: 1.5vw;
}

.store-desc {
  font-size: 3vw;
  color: #999;
  margin: 0;
}

.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.arrow-box {
  margin-left: 2vw;
  color: #ccc;
  font-size: 4vw;
}
</style>