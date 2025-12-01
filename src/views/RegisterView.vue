<template>
    <HeaderBase>
        用户注册
    </HeaderBase>
    <div class="register-input">
        <el-form-item class="input-form" label="邮箱:">
            <el-input placeholder="请输入邮箱..."></el-input>
        </el-form-item>
        <el-form-item class="input-form" label="密码:">
            <el-input show-password placeholder="请输入密码..."></el-input>
        </el-form-item>
        <el-form-item class="input-form" label="确认密码:">
            <el-input show-password placeholder="请确认密码..."></el-input>
        </el-form-item>
        <el-form-item class="input-form" label="验证码:">
            <div class="captcha-content">
                <el-input placeholder="请输入邮箱验证码..."></el-input>
                <el-button class="captcha-btn" type="primary">
                    获取验证码
                </el-button>
            </div>
        </el-form-item>
    </div>
    <div class="button-group">
        <el-button class="register-btn" type="primary">注册</el-button>
        <router-link :to="{ name: 'login' }">
            <el-button class="login-btn">去登录</el-button>
        </router-link>
    </div>
</template>

<script lang="ts" setup>
import HeaderBase from '@/components/HeaderBase.vue';


</script>

<style scoped>
.register-input {
  margin: 14vw 2vw auto 2vw;
}

.register-input .input-form {
  height: 8vw;
}

.register-input .input-form .captcha-content {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
}

.register-input .input-form .captcha-content .captcha-text {
  width: 60%;
}

.register-input .input-form .captcha-content .captcha-btn {
  width: 40%;
  cursor: pointer;
  margin-left: 1vw;
}

.button-group {
  display: flex;
  flex-direction: column;

  margin: auto 2vw;
}

.button-group .register-btn {
  width: 100%;
  cursor: pointer;
  margin-left: 0;
}

.button-group .login-btn {
  width: 100%;
  cursor: pointer;
  margin-left: 0;
  margin-top: 2vw;
}
</style>
