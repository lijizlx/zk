<template>
  <div class="lock-screen">
    <div class="content">
      <div class="box">
        <div class="header-img">
          <img src="src/assets/img/coffee.png">
          <svgIcon name="lock" width="35px" height="35px" fill="red" class="lock-icon"></svgIcon>
          <div class="locked-text">{{ t('system.lockedText') }}</div>
          <div class="unlock">
            <el-input
              v-model="password"
              size="large"
              auto-complete="off"
              :placeholder="t('system.setUnlockScreenPwdTip')"
              @keyup.enter.native="cancelLockScreen"
            >
              <template #prefix>
                <SvgIcon name="unlock" height="18px" width="18px" fill="#484747"></SvgIcon>
              </template>
              <template #append>
                <el-button type="primary" plain @click="cancelLockScreen">{{ t('system.unlockText') }}</el-button>
              </template>
            </el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { h } from 'vue'
import { ElMessage } from 'element-plus'
import { useThemeConfig } from "@/stores/themeConfig.js";
import { storeToRefs } from "pinia";
import { Local } from "@/utils/storage.js";

const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);

let password = ref('')

const cancelLockScreen = () => {
  if (!password.value) return
  if (themeConfig.value.lockScreenPwd !== password.value) {
    ElMessage({
      message: t('system.unlockError'),
      type: 'error',
    })
  } else {
    themeConfig.value.isLockScreen = false
    themeConfig.value.lockScreenPwd = password.value = ''
    Local.set('themeConfig', themeConfig.value)
  }
}

onMounted(() => {
  password.value = ''
})
</script>

<style scoped lang="scss">
.lock-screen {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: url(../../assets/img/login-check.jpg) no-repeat;
  background-size: cover; /* 让背景图片完全填满容器 */
  .content {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(18px); /* 使用 backdrop-filter 实现毛玻璃效果，可以根据需求调整模糊程度 */
  }
  .box {
    position: absolute;
    top: 40vh;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 400px;
    background: rgba(255, 255, 255, .5);
    border-radius: 12px;
    .header-img {
      position: relative;
      img {
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: 160px;
        height: 160px;
      }
      .lock-icon {
        position: absolute;
        top: 200px;
        left: 50%;
        transform: translateX(-50%);
      }
      .locked-text {
        width: 100%;
        position: absolute;
        top: 250px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        font-size: 1.2rem;
        font-weight: bold;
      }
      .unlock {
        width: 80%;
        position: absolute;
        top: 300px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
</style>