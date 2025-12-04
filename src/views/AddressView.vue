<template>
    <HeaderBase>
        地址管理
    </HeaderBase>

    <div class="address-container">
        
        <div class="section-header">当前店铺</div>
        <div class="address-card shop-card">
            <div class="card-content">
                <div class="main-text-row">
                    <span class="main-text">{{ shopAddress.name }}</span>
                    <el-tag size="small" type="warning" effect="dark" round class="mini-tag">当前</el-tag>
                </div>
                <div class="sub-text">{{ shopAddress.address }}</div>
                <div class="sub-text highlight">{{ shopAddress.contactName }} {{ shopAddress.phone }}</div>
            </div>
            <div class="card-action" @click="handleEditShop">
                <el-icon :size="18" color="#999"><EditPen /></el-icon>
            </div>
        </div>

        <div class="section-header">我的收货地址</div>
        <div class="address-list">
            <div v-for="(item, index) in myAddresses" :key="item.id" class="address-item">
                <div class="item-body" @click="handleEditUserAddress(item.id)">
                    <div class="address-row">
                        <span class="location-text">
                            <el-tag v-if="item.label" size="small" effect="plain" class="address-tag">{{ item.label }}</el-tag>
                            {{ item.address }} {{ item.detail }}
                        </span>
                    </div>
                    <div class="user-row">
                        <span class="user-name">{{ item.consignee }}</span>
                        <span class="user-phone">{{ item.phone }}</span>
                    </div>
                </div>
                
                <div class="item-actions">
                    <div class="icon-btn" @click.stop="handleEditUserAddress(item.id)">
                        <el-icon :size="18"><EditPen /></el-icon>
                    </div>
                    <div class="icon-btn delete" @click.stop="handleDeleteUserAddress(item.id)">
                        <el-icon :size="18"><Delete /></el-icon>
                    </div>
                </div>
            </div>
        </div>

        <div class="bottom-placeholder"></div>
        <div class="bottom-bar">
            <el-button type="primary" class="add-btn" round size="large" @click="handleAddAddress">
                <el-icon style="margin-right: 4px"><Plus /></el-icon> 新增地址
            </el-button>
        </div>

    </div>
</template>

<script lang="ts" setup>
import HeaderBase from '@/components/HeaderBase.vue';
import { reactive } from 'vue';
import { EditPen, Delete, Plus } from '@element-plus/icons-vue';

// 数据保持不变
const shopAddress = reactive({
    id: 1,
    name: '肯德基(北京西站店)',
    address: '丰台区莲花池东路118号北京西站F1',
    contactName: '店长张三',
    phone: '13800138000'
});

const myAddresses = reactive([
    {
        id: 101,
        address: '北京大学',
        detail: '48号楼302室',
        consignee: '王同学',
        phone: '13911112222',
        label: '学校'
    },
    {
        id: 102,
        address: '腾讯大厦',
        detail: '海淀大街38号',
        consignee: '王先生',
        phone: '18600009999',
        label: '公司'
    },
    {
        id: 103,
        address: '万科星园',
        detail: '12号楼2单元501',
        consignee: '小王',
        phone: '13588887777',
        label: ''
    }
]);

const handleEditShop = () => console.log("Edit Shop");
const handleEditUserAddress = (id: number) => console.log("Edit User", id);
const handleDeleteUserAddress = (id: number) => console.log("Delete User", id);
const handleAddAddress = () => console.log("Add Address");
</script>

<style scoped>
.address-container {
    padding-top: 14vw; /* 保持原有的顶部避让 */
    padding-bottom: 20px;
    background-color: #f7f8fa; /* 更淡的背景色，护眼 */
    min-height: 100vh;
}

.section-header {
    font-size: 13px;
    color: #909399;
    padding: 15px 15px 8px; /* 左侧对齐 */
}

/* --- 店铺卡片 (特殊样式) --- */
.address-card.shop-card {
    background: #fff;
    margin: 0 12px; /* 左右留一点边距 */
    padding: 15px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 1px 4px rgba(0,0,0,0.03);
}

.card-content {
    flex: 1;
    margin-right: 10px;
}

.main-text-row {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
}

.main-text {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-right: 6px;
}

.mini-tag {
    height: 18px;
    line-height: 16px;
    padding: 0 4px;
    font-size: 10px;
}

.sub-text {
    font-size: 13px;
    color: #666;
    line-height: 1.4;
}
.sub-text.highlight {
    font-size: 12px;
    color: #999;
    margin-top: 2px;
}

/* --- 地址列表 (仿原生列表风格) --- */
.address-list {
    background: #fff;
    /* 如果希望是通栏风格（左右无缝），可以去掉 margin 和 border-radius */
    margin: 0 12px; 
    border-radius: 8px;
    overflow: hidden; /* 圆角 */
}

.address-item {
    display: flex;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #f0f0f0; /* 细分割线 */
    transition: background-color 0.2s;
}

.address-item:last-child {
    border-bottom: none;
}

.address-item:active {
    background-color: #f9f9f9; /* 点击反馈 */
}

.item-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-right: 10px;
}

.address-row {
    line-height: 1.4;
}

.location-text {
    font-size: 15px;
    color: #333;
    font-weight: 500;
}

.address-tag {
    margin-right: 4px;
    border: none;
    background-color: #e6f7ff;
    color: #1890ff;
    height: 20px;
    line-height: 20px;
    padding: 0 4px;
}

.user-row {
    font-size: 13px;
    color: #999;
    display: flex;
    align-items: center;
}

.user-name {
    margin-right: 10px;
    color: #666; /* 名字稍微深一点 */
}

/* 右侧操作区 */
.item-actions {
    display: flex;
    align-items: center;
    gap: 16px; /* 按钮之间的间距 */
}

.icon-btn {
    padding: 4px;
    color: #999;
    cursor: pointer;
}

.icon-btn.delete {
    color: #ff4d4f; /* 删除红色，但不刺眼 */
}

/* 底部按钮 */
.bottom-placeholder {
    height: 80px;
}

.bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70px; /* 稍微调矮一点 */
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 -1px 6px rgba(0,0,0,0.05);
    z-index: 100;
}

.add-btn {
    width: 90%;
    height: 44px; /* 移动端按钮标准高度 */
    font-size: 15px;
    font-weight: 500;
}
</style>