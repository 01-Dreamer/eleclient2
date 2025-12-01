<template>
    <ul class="nav">
        <router-link class="link" :to="{ name: 'home' }" active-class="active">
            <li>
                <el-icon><HomeFilled /></el-icon>
                <span>首页</span>
            </li>
        </router-link>
        <router-link class="link" :to="{ name: 'found' }" active-class="active">
            <li>
                <el-icon><Compass /></el-icon>
                <span>发现</span>
            </li>
        </router-link>
        <router-link class="link" :to="{ name: 'order' }" active-class="active">
            <li>
                <el-icon><Tickets /></el-icon>
                <span>订单</span>
            </li>
        </router-link>
        <router-link class="link" :to="{ name: 'mine' }" active-class="active">
            <li>
                <el-icon><User /></el-icon>
                <span>我的</span>
            </li>
        </router-link>
    </ul>
</template>

<script lang="ts" setup>
import { HomeFilled, Compass, Tickets, User } from '@element-plus/icons-vue';
</script>

<style scoped>
.nav {
    width: 100%;
    height: 14vw;
    border-top: solid 1px #DDD;
    background-color: #FFF;

    display: flex;
    justify-content: space-around;
    align-items: center;

    padding-left: 0;
    margin-bottom: 0;
}

.nav .link {
    text-decoration: none;
}

.nav .link li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    color: #999;
    user-select: none;
    cursor: pointer;
}

.nav .link li .el-icon {
    font-size: 6vw;
    margin-bottom: 0.5vw;
}

.nav .link li span {
    font-size: 2.8vw;
}

.nav .link.active li {
    color: #0097FF;
}
</style>