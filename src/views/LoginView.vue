<template>
  <HeaderBase>
    用户登录
  </HeaderBase>
  <div class="login-input">
    <el-form-item class="input-form" label="邮箱:">
      <el-input placeholder="请输入邮箱..."></el-input>
    </el-form-item>
    <el-form-item class="input-form" label="密码:">
      <el-input show-password placeholder="请输入密码..."></el-input>
    </el-form-item>
    <el-form-item class="input-form" label="验证码:">
      <div class="captcha-content">
        <el-input class="captcha-text" placeholder="请输入验证码..."></el-input>
        <el-image :src="base64_img" class="captcha-img" />
      </div>
    </el-form-item>
  </div>
  <div class="button-group">
    <el-button class="login-btn" type="primary">登录</el-button>
    <router-link :to="{ name: 'register' }">
      <el-button class="register-btn">去注册</el-button>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import HeaderBase from '@/components/HeaderBase.vue';
import { ref } from 'vue';

const base64_img = ref('')

</script>

<style scoped>
.login-input {
  margin: 14vw 2vw auto 2vw;
}

.login-input .input-form {
  height: 8vw;
}

.login-input .input-form .captcha-content {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
}

.login-input .input-form .captcha-content .captcha-text {
  width: 60%;
}

.login-input .input-form .captcha-content .captcha-img {
  width: 40%;
}

.button-group {
  display: flex;
  flex-direction: column;

  margin: auto 2vw;
}

.button-group .login-btn {
  width: 100%;
  cursor: pointer;
  margin-left: 0;
}

.button-group .register-btn {
  width: 100%;
  cursor: pointer;
  margin-left: 0;
  margin-top: 2vw;
}
</style>
