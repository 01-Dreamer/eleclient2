<template>
    <HeaderBase>
        我的页面
    </HeaderBase>

    <div class="profile-container">
        <div class="user-info-card">
            <div class="avatar-container" @click="handleEditAvatar">
                <el-avatar :size="80" :src="userInfo.avatar" class="avatar"></el-avatar>
                <div class="camera-icon">
                    <el-icon color="#fff" :size="14"><Camera /></el-icon>
                </div>
            </div>
            <div class="username">{{ userInfo.nickname }}</div>
            <div class="user-id">ID: {{ userInfo.userId }}</div>
        </div>

        <div class="menu-list">
            <div class="menu-item" @click="handleOpenLocation">
                <div class="left">
                    <el-icon class="menu-icon" color="#0097FF" :size="22"><MapLocation /></el-icon>
                    <span class="label">我的位置</span>
                </div>
                <div class="right">
                    <el-icon class="arrow-icon" :size="16"><ArrowRight /></el-icon>
                </div>
            </div>

            <div class="menu-item" @click="handleOpenShop">
                <div class="left">
                    <el-icon class="menu-icon" color="#0097FF" :size="22"><Shop /></el-icon>
                    <span class="label">我的店铺</span>
                </div>
                <div class="right">
                    <el-icon class="arrow-icon" :size="16"><ArrowRight /></el-icon>
                </div>
            </div>

            <div class="menu-item" @click="handleBindWechat">
                <div class="left">
                    <el-icon class="menu-icon" color="#07C160" :size="22"><ChatDotRound /></el-icon>
                    <span class="label">绑定微信</span>
                </div>
                <div class="right">
                    <span v-if="userInfo.wechatId" class="wechat-id">{{ userInfo.wechatId }}</span>
                    <span v-else class="status-text">去绑定</span>
                    <el-icon class="arrow-icon" :size="16"><ArrowRight /></el-icon>
                </div>
            </div>
        </div>

        <div class="logout-section">
            <el-button type="danger" round class="logout-btn" @click="handleLogout">
                退出登录
            </el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import HeaderBase from '@/components/HeaderBase.vue';
import { reactive } from 'vue';
import { MapLocation, Shop, ChatDotRound, ArrowRight, Camera } from '@element-plus/icons-vue';

const userInfo = reactive({
    userId: '10086',
    nickname: '饿了么干饭人',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    wechatId: 'wx_12345678'
});

const handleEditAvatar = () => {
    console.log("点击了 [头像] - 准备上传新头像");
};

const handleOpenLocation = () => {
    console.log("点击了 [我的位置]");
};

const handleOpenShop = () => {
    console.log("点击了 [我的店铺]");
};

const handleBindWechat = () => {
    if (userInfo.wechatId) {
        console.log("点击了 [微信] - 当前已绑定 ID:", userInfo.wechatId);
    } else {
        console.log("点击了 [微信] - 发起绑定");
    }
};

const handleLogout = () => {
    console.log("点击了 [退出登录]");
};

</script>

<style scoped>
.profile-container {
    padding: 20px;
    padding-top: 14vw; 
    background-color: #f5f5f5;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-sizing: border-box;
}

.user-info-card {
    background-color: #fff;
    border-radius: 12px;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.avatar-container {
    position: relative;
    cursor: pointer;
}

.avatar-container:active {
    opacity: 0.8;
}

.camera-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #fff;
}

.username {
    margin-top: 12px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
}

.user-id {
    margin-top: 6px;
    font-size: 12px;
    color: #999;
}

.menu-list {
    background-color: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    transition: background-color 0.2s;
}

.menu-item:last-child {
    border-bottom: none;
}

.menu-item:active {
    background-color: #fafafa;
}

.left {
    display: flex;
    align-items: center;
    gap: 12px; 
}

.menu-icon {
    vertical-align: middle;
}

.label {
    font-size: 15px;
    color: #333;
    font-weight: 500;
}

.right {
    display: flex;
    align-items: center;
    gap: 6px;
}

.wechat-id {
    font-size: 14px;
    color: #999;
}

.status-text {
    font-size: 14px;
    color: #0097FF;
}

.arrow-icon {
    color: #c0c4cc;
}

.logout-section {
    margin-top: 20px;
    text-align: center;
}

.logout-btn {
    width: 100%;
    height: 44px;
    font-size: 16px;
}
</style>