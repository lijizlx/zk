import { defineStore } from 'pinia';
import { Local } from "@/utils/storage.js";
import { dynamicRoutes } from "@/router/index.js";

export const useRouterInfo = defineStore('routerInfo', {
  state: () => ({
    routesList: [],
    tagsViewList: [dynamicRoutes[0]]
  }),
  actions: {
  }
})