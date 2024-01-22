import { createI18n } from "vue-i18n";
import zh from './zh.js'
import en from './en.js'
import pinia from '@/stores/index'
import { useThemeConfig } from "@/stores/themeConfig.js";
import { storeToRefs } from "pinia";
import { Local } from "@/utils/storage.js";

const storesThemeConfig = useThemeConfig(pinia);
const { themeConfig } = storeToRefs(storesThemeConfig);

const messages = { zh, en }

const i18n = createI18n({
  locale: Local.get('globalI18n') ||  navigator.language.replace(/-[A-Za-z]*/, '') || 'en',
  legacy: false,
  messages
})

export default i18n