import SvgIcon from './SvgIcon/index.vue'
import TransitionWrapper from '@/components/global/TransitionWrapper.vue'
import RButton from '@/components/remote/RButton.vue'

const allGlobalComponents = { SvgIcon, TransitionWrapper, RButton }

export default {
  install (app) {
    Object.keys(allGlobalComponents).forEach(key => {
      app.component(key, allGlobalComponents[key])
    })
  }
}