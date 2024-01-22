<template>
  <div class="login-wrapper">
    <div class="ground-glass">
      <div class="login-content">
        <p class="login-header">智慧云工业互联网·<span>私有云</span></p>
        <p class="sys-version">V4.1.2</p>
        <el-carousel height="300px" ref="remarkCaruselUp" :loop="false" :autoplay="false" indicatorPosition="none" arrow="never">
          <el-carousel-item v-for="item in loginTypes" :key="item">
            <component :is="layouts[item]"></component>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="login-check" v-show="active==='account'">
        <div class="more-type">账号密码登录</div>
        <div class="check-tip">使用账号密码开启本站</div>
        <div class="check-btn" @click="checkHandle('tel')" v-if="isWan">手机验证登录</div>
      </div>
      <div class="login-check"  v-show="active==='tel'">
        <div class="more-type">手机验证登录</div>
        <div class="check-tip">使用手机验证开启本站</div>
        <div class="check-btn" @click="checkHandle('account')" v-if="isWan">账号密码登录</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent, onMounted, nextTick } from "vue"

// import UserLogin from './components/UserLogin.vue'
// import CodeLogin from './components/CodeLogin.vue'

const layouts = {
  UserLogin: defineAsyncComponent(() => import("./components/UserLogin.vue")),
  CodeLogin: defineAsyncComponent(() => import("./components/CodeLogin.vue"))
}
const isWan = ref(true)
const loginTypes = ref(['UserLogin', 'CodeLogin'])
const active = ref('account')
const remarkCaruselUp = ref(null)

const checkHandle = val => {
  val && (active.value = val)
  if (val === 'account') {
    nextTick(() => {
      remarkCaruselUp.value.setActiveItem(0)
    })
  } else if (val === 'tel') {
    nextTick(() => {
      remarkCaruselUp.value.setActiveItem(1)
    })
  }
}

onMounted(() => {
  // 如果url中含有公网地址 只允许手机好登录
  // if (!window.location.href.includes("112.29.109.79")){
  //   loginTypes.value = [ 'CodeLogin' ]
  //   this.isWan = false;  // 非外网环境
  //   this.activeName = 'account';
  // }
})
</script>

<style scoped lang="scss">
.login-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url(../../assets/img/login.png) no-repeat;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .ground-glass {
    width: 650px;
    height: 450px;
    position: absolute;
    top: 20vh;
    backdrop-filter: blur(18px); /* 使用 backdrop-filter 实现毛玻璃效果，可以根据需求调整模糊程度 */
    //background-color: rgba(255, 255, 255, 0.3); /* 设置内层div的背景色，可以根据需求调整透明度 */
    background-size: cover; /* 让背景图片完全填满容器 */
    transform: translateZ(100px);
    border-radius: 6px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    display: flex;
  }
  .login-content {
    width: 550px;
    height: 100%;
    text-align: center;
    position: relative;
    .login-header {
      font-size: 1.5rem;
      letter-spacing: 5px;
      color: #fff;
      padding: 65px 0 20px 0;
      span {
        color: #eaa40b;
      }
    }
    .sys-version {
      font-size: 1.25rem;
      color: #fff;
      padding: 10px 0;
    }
    .login-form {
      width: 100%;
    }
  }
  .login-check {
    width: 200px;
    height: 100%;
    text-align: center;
    color: #fff;
    background: url(../../assets/img/login-check.jpg) no-repeat;
    backdrop-filter: blur(80px); /* 使用 backdrop-filter 实现毛玻璃效果，可以根据需求调整模糊程度 */
    //background-color: rgba(0, 0, 0, .3);
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    .more-type {
      font-size: 1.2rem;
      font-family: "宋体", "Microsoft YaHei", SimSun, STSong, sans-serif;
      font-weight: 600;
      margin-top: 85px;
    }
    .check-tip {
      font-family: "宋体", "Microsoft YaHei", SimSun, STSong, sans-serif;
      font-size: 0.8rem;
      margin-top: 20px;
      color: #92918f;
    }
    .check-btn {
      width: 110px;
      border: 1px solid #fff;
      border-radius: 100px;
      font-size: 0.9rem;
      padding: 7px;
      margin: 200px auto 0 auto;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .check-btn:hover {
      border-color: #eaa40b;
      color: #eaa40b;
    }
  }
}
:deep(.el-menu--collapse .el-submenu__title) {
  transition: margin-left 0.3s !important; /* 使用 CSS 过渡效果 */
}

/* 展开动画 */
:deep(.el-menu--collapse .el-submenu.is-opened>.el-submenu__title) {
  transition: margin-left 0.3s !important; /* 使用 CSS 过渡效果 */
}
</style>