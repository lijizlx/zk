<template>
  <div class="lock-screen-form">
    <el-form
      ref="loginFormRef"
      :rules="loginRules"
      :model="loginForm"
      class="login-form"
      :hide-required-asterisk="true"
    >
      <el-form-item prop="password" class="item-input" :label="t('system.setLockScreenPwd')">
        <el-input
          v-model="loginForm.password"
          auto-complete="off"
          :placeholder="t('system.setLockScreenPwdTip')"
          @keyup.enter.native="setLockPwd"
          clearable
        >
          <template #prefix>
            <SvgIcon name="lock" height="17px" width="17px" fill="#8d8c8c"></SvgIcon>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button
        type="primary"
        @click.native.prevent="setLockPwd"
        class="login-submit">{{ t('system.confirmBtnText') }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { useThemeConfig } from "@/stores/themeConfig.js"
import { storeToRefs } from "pinia"
import { Local } from "@/utils/storage.js"

const emits = defineEmits(['increase'])

const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);

const loginFormRef = ref(null)
const loginForm = ref({
  password: ''
})
const loginRules = ref({
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
  ]
})

const setLockPwd = () => {
  if (loginForm.value.password) {
    emits('closeLockScreen')
    themeConfig.value.lockScreenPwd = loginForm.value.password
    themeConfig.value.isLockScreen = true
    Local.set('themeConfig', themeConfig)
    loginForm.value.password = ''
  }
}
</script>

<style scoped lang="scss">
.lock-screen-form {
  width: 100%;
  .el-button {
    margin-left: 50%;
  }
  .el-input {
    width: 100%;
  }
  .item-input {
    margin: 30px 0;
  }
  .btn {
    width: 100%;
    text-align: right;
  }
  :deep(.el-form-item__content) {
    width: 100%;
  }
}
</style>