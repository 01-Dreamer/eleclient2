<template>
    <HeaderBase>
        页面不存在
    </HeaderBase>

    <div class="not-found-container">
        <div class="content">
            <div class="error-code">404</div>
            <div class="desc">当前页面无法访问</div>
            <el-button type="primary" round class="back-btn" @click="goHome">
                回到首页
            </el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import HeaderBase from '@/components/HeaderBase.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
    router.push({ name: 'home' });
};
</script>

<style scoped>
.not-found-container {
    padding-top: 14vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    box-sizing: border-box;
}

.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -20vw;
}

.error-code {
    font-size: 100px;
    font-weight: 900;
    color: #0097FF;
    line-height: 1;
    margin-bottom: 20px;
    text-shadow: 4px 4px 0px rgba(0, 151, 255, 0.1);
}

.desc {
    font-size: 16px;
    color: #666;
    margin-bottom: 40px;
    letter-spacing: 1px;
}

.back-btn {
    width: 140px;
    height: 40px;
    font-size: 16px;
    background-color: #0097FF;
    border-color: #0097FF;
}
</style>