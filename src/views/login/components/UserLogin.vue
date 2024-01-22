<template>
  <div class="user-login">
    <el-form
      ref="loginFormRef"
      :rules="loginRules"
      :model="loginForm"
      class="login-form"
      :hide-required-asterisk="true"
      label-width="0">
      <el-form-item prop="username" class="item-input">
        <el-input
          v-model="loginForm.username"
          auto-complete="off"
          size="large"
          placeholder="请输入用户名"
          @keyup.enter.native="handleLogin"
          clearable
        >
          <template #prefix>
            <SvgIcon name="loginuser" height="20px" width="20px" fill="#484747"></SvgIcon>
          </template>
          <em slot="prefix" class="icon-yonghu"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="password" class="item-input">
        <el-input
          :type="!isEyeClose ? 'password' : 'text'"
          size="large"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="请输入密码"
          clearable
          @keyup.enter.native="handleLogin"
        >
          <template #prefix>
            <SvgIcon name="lock" height="20px" width="20px" fill="#484747"></SvgIcon>
          </template>
          <template #suffix>
            <SvgIcon v-show="isEyeClose" name="eye-close" height="20px" width="20px" fill="#cccbcb" style="cursor: pointer" @click="showPassword"></SvgIcon>
            <SvgIcon v-show="!isEyeClose" name="eye" height="20px" width="20px" fill="#cccbcb" style="cursor: pointer" @click="showPassword"></SvgIcon>
          </template>
        </el-input>
      </el-form-item>
      <!--    <el-form-item prop="code">-->
      <!--      <Verify v-if="picture"-->
      <!--              @success="verifySuccess"-->
      <!--              :mode="'pop'"-->
      <!--              :captchaType="'blockPuzzle'"-->
      <!--              :imgSize="{ width: '330px', height: '155px' }"-->
      <!--              ref="verify"-->
      <!--      />-->
      <!--    </el-form-item>-->
      <el-form-item>
        <el-button
          @click.native.prevent="handleLogin"
          :disabled="buttonStatus"
          :loading="buttonStatus"
          size="large"
          class="login-submit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from "vue"

const loginFormRef = ref(null)
const isEyeClose = ref(false)
const buttonStatus = ref(false)
const loginForm = ref({
  username: '',
  password: '',
  code: '',
  randomStr: 'blockPuzzle'
})
const loginRules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
  ]
})

const showPassword = () => {
  isEyeClose.value = !isEyeClose.value
}

const handleLogin = () => {
  console.log(123)
}
</script>

<style scoped lang="scss">
.login-icon{
  color: #666666;
  margin-bottom: 4px;
}
.user-login {
  width: 100%;
  padding: 25px 80px 40px 80px;
  .item-input {
    margin-bottom: 40px;
  }
  .el-button {
    width: 100%;
    background-color: #fff !important;
    color: var(--el-color-primary);
    margin-top: 30px;
  }
}
//背景色设置为透明
:deep(.el-input__wrapper) {
  background-color: transparent !important;
}
//历史记录后（缓存值）的颜色
:deep([data-v-37dfd6fc] input:-webkit-autofill) {
  -webkit-text-fill-color: #fff;
  transition: background-color 5000s ease-out 0.5s;
}
//提示框的字体颜色
:deep(input::-webkit-input-placeholder) {
  color: #fff;
}
:deep(input::-moz-input-placeholder) {
  color: #fff;
}
:deep(input::-ms-input-placeholder) {
  color: #fff;
}
//表单名称的字体颜色
.el-form-item--large :deep(.el-form-item__label) {
  color: #fff !important;
}
//图标的颜色
:deep(.el-input__prefix-inner) {
  color: #ffffff !important;
}
:deep(.el-input__wrapper) {
  --el-input-focus-border-color: #1dffff !important;
  --el-input-hover-border-color: #1dffff !important;
  --el-input-border-color: #1dffff !important;
}
</style>
