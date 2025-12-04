<template>
    <HeaderBase>
        地址管理
    </HeaderBase>

    <div class="address-container">
        
        <div class="section-title">店铺位置</div>
        <div class="address-card shop-card">
            <div class="card-left">
                <div class="icon-wrapper shop-icon-bg">
                    <el-icon color="#fff" :size="20"><Shop /></el-icon>
                </div>
                <div class="info-content">
                    <div class="top-row">
                        <span class="name">{{ shopAddress.name }}</span>
                        <el-tag size="small" type="warning" effect="dark" round>当前店铺</el-tag>
                    </div>
                    <div class="address-text">{{ shopAddress.address }}</div>
                    <div class="contact-text">{{ shopAddress.contactName }} {{ shopAddress.phone }}</div>
                </div>
            </div>
            <div class="card-right" @click="handleEditShop">
                <el-icon :size="20" color="#999"><EditPen /></el-icon>
            </div>
        </div>

        <div class="section-title">我的位置</div>
        <div class="address-list">
            <div v-for="(item, index) in myAddresses" :key="item.id" class="address-card">
                <div class="card-left">
                    <div class="icon-wrapper user-icon-bg">
                        <el-icon color="#fff" :size="18"><MapLocation /></el-icon>
                    </div>
                    <div class="info-content">
                        <div class="top-row">
                            <span class="name">{{ item.address }}</span>
                            <el-tag v-if="item.label" size="small" effect="plain">{{ item.label }}</el-tag>
                        </div>
                        <div class="address-text">{{ item.detail }}</div>
                        <div class="contact-text">{{ item.consignee }} {{ item.phone }}</div>
                    </div>
                </div>
                
                <div class="action-buttons">
                    <div class="action-btn" @click="handleEditUserAddress(item.id)">
                        <el-icon :size="20" color="#999"><EditPen /></el-icon>
                    </div>
                    <div class="action-btn delete-btn" @click="handleDeleteUserAddress(item.id)">
                        <el-icon :size="20" color="#F56C6C"><Delete /></el-icon>
                    </div>
                </div>
            </div>
        </div>

        <div class="bottom-placeholder"></div> <div class="bottom-bar">
            <el-button type="primary" class="add-btn" round size="large" @click="handleAddAddress">
                <el-icon style="margin-right: 5px"><Plus /></el-icon>
                新增收货地址
            </el-button>
        </div>

    </div>
</template>

<script lang="ts" setup>
import HeaderBase from '@/components/HeaderBase.vue';
import { reactive } from 'vue';
import { Shop, MapLocation, EditPen, Delete, Plus } from '@element-plus/icons-vue';

// 模拟数据：店铺位置 (只有一条)
const shopAddress = reactive({
    id: 1,
    name: '肯德基(北京西站店)',
    address: '北京市丰台区莲花池东路118号北京西站F1',
    contactName: '店长张三',
    phone: '13800138000'
});

// 模拟数据：我的位置 (多条)
const myAddresses = reactive([
    {
        id: 101,
        address: '北京大学',
        detail: '海淀区颐和园路5号48号楼302室',
        consignee: '王同学',
        phone: '13911112222',
        label: '学校'
    },
    {
        id: 102,
        address: '腾讯大厦',
        detail: '海淀区海淀大街38号',
        consignee: '王先生',
        phone: '13911112222',
        label: '公司'
    }
]);

// --- 事件处理 ---

// 修改店铺位置
const handleEditShop = () => {
    console.log("点击了 [修改店铺位置] - ID:", shopAddress.id);
};

// 修改用户地址
const handleEditUserAddress = (id: number) => {
    console.log("点击了 [修改我的位置] - ID:", id);
};

// 删除用户地址
const handleDeleteUserAddress = (id: number) => {
    console.log("点击了 [删除我的位置] - ID:", id);
    // 实际逻辑中这里应该弹窗确认 confirm，然后调接口
};

// 新增地址
const handleAddAddress = () => {
    console.log("点击了 [新增地址]");
};

</script>

<style scoped>
.address-container {
    padding: 20px;
    padding-top: 14vw; 
    background-color: #f5f5f5;
    min-height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.section-title {
    font-size: 14px;
    color: #666;
    margin-left: 4px;
    margin-bottom: -5px; /* 拉近标题和卡片的距离 */
}

/* 卡片通用样式 */
.address-card {
    background-color: #fff;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.02);
}

.card-left {
    display: flex;
    align-items: flex-start;
    flex: 1; /* 占据剩余空间 */
    overflow: hidden; /* 防止文字过长撑开 */
}

/* 图标容器 */
.icon-wrapper {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 12px;
    flex-shrink: 0;
}

.shop-icon-bg {
    background-color: #ff9900; /* 店铺用橙色 */
}

.user-icon-bg {
    background-color: #0097FF; /* 用户用蓝色 */
}

/* 文本信息区域 */
.info-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
}

.top-row {
    display: flex;
    align-items: center;
    gap: 8px;
}

.name {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    /* 文字超长省略 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 160px;
}

.address-text {
    font-size: 13px;
    color: #666;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 最多显示2行 */
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.contact-text {
    font-size: 12px;
    color: #999;
}

/* 右侧按钮区域 */
.card-right {
    padding-left: 15px;
    border-left: 1px solid #eee;
    margin-left: 10px;
    height: 40px;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.action-buttons {
    display: flex;
    align-items: center;
    gap: 15px;
    padding-left: 15px;
    border-left: 1px solid #eee;
    margin-left: 10px;
}

.action-btn {
    padding: 5px;
    cursor: pointer;
}

/* 底部固定按钮 */
.bottom-placeholder {
    height: 80px; /* 占位，防止内容被底部遮挡 */
}

.bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
    z-index: 100;
}

.add-btn {
    width: 90%;
    font-weight: bold;
    font-size: 16px;
    height: 48px;
}
</style>