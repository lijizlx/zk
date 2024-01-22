<template>
  <div class="code-login">
    <el-form
      ref="loginFormRef"
      :rules="loginRules"
      :model="loginForm"
      class="login-form"
      status-icon
      label-width="0">
      <el-form-item prop="phone" class="item-input">
        <el-input
          v-model="loginForm.mobile"
          size="large"
          auto-complete="off"
          placeholder="请输入手机号码"
          @keyup.enter.native="handleLogin">
          <template #prefix>
            <SvgIcon name="phone" height="20px" width="20px" fill="#484747"></SvgIcon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code" class="item-input">
        <el-input
          v-model="loginForm.code"
          size="large"
          auto-complete="off"
          placeholder="请输入验证码"
          @keyup.enter.native="handleLogin"
        >
          <template #prefix>
            <SvgIcon name="verify" height="20px" width="20px" fill="#484747"></SvgIcon>
          </template>
          <template #append>
            <span
              :class="[{display:msgKey}]"
              class="msg-text"
              @click="handleSend">{{ msgText }}</span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          size="large"
          type="primary"
          class="login-submit"
          @click.native.prevent="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { isvalidatemobile } from '@/utils/validate'

const loginFormRef = ref()
const loginForm = ref({
  username: '',
  password: '',
  code: '',
  randomStr: 'blockPuzzle'
})
const msgKey =  ref(false)
const MSGINIT = '发送验证码', MSGSCUCCESS = '${time}秒后重发', MSGTIME = 60
const msgText = ref(MSGINIT)
const msgTime = ref(MSGTIME)
const validatePhone = (rule, valu, callback) => {
  if (isvalidatemobile(value)[0]) {
    callback(new Error(isvalidatemobile(value)[1]))
  } else {
    callback()
  }
}
const validateCode = (rule, value, callback) => {
  if (value.length !== 4) {
    callback(new Error('请输入4位数的验证码'))
  } else {
    callback()
  }
}
const loginRules = ref({
  mobile: [{ required: true, trigger: 'blur', validator: validatePhone }],
  code: [{ required: true, trigger: 'blur', validator: validateCode }]
})

const handleSend = () => {
  if (this.msgKey) return

  const isValidateMobileResult =isvalidatemobile(this.loginForm.mobile)
  if(isValidateMobileResult[0]===true) {
    this.$message.error(isValidateMobileResult[1])
    return
  }

  request({
    url: '/admin/mobile/' + this.loginForm.mobile,
    method: 'get'
  }).then(response => {
    if (response.data.data) {
      this.$message.success('验证码发送成功')
    } else {
      this.$message.error(response.data.msg)
    }
  })

  this.msgText = MSGSCUCCESS.replace('${time}', this.msgTime)
  this.msgKey = true
  const time = setInterval(() => {
    this.msgTime--
    this.msgText = MSGSCUCCESS.replace('${time}', this.msgTime)
    if (this.msgTime == 0) {
      this.msgTime = MSGTIME
      this.msgText = MSGINIT
      this.msgKey = false
      clearInterval(time)
    }
  }, 1000)
}

const handleLogin = () => {

}
</script>

<style scoped lang="scss">
.code-login {
  width: 100%;
  padding: 25px 80px 40px 80px;
  .item-input {
    margin-bottom: 40px;
  }
}
.msg-text {
  display: block;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
  height: 40px;
  //background: #FFFFFF;
  color: #2d72cb;
}
.msg-text.display {
  color: #ccc;
}
.el-button {
  width: 100%;
  background-color: #fff !important;
  color: var(--el-color-primary);
  margin-top: 30px;
}
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
