import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import * as VueRouter from 'vue-router'
import CapperPage from './pages/CapperPage.vue'
import CappersPage from './pages/CappersPage.vue'
import SheetPage from './pages/SheetPage.vue'
import SheetsPage from './pages/SheetsPage.vue'

createApp(App)
  .use(
    VueRouter.createRouter({
      history: VueRouter.createWebHistory(process.env.BASE_URL),
      routes: [
        {
          path: '/cappers',
          component: CappersPage,
        },
        {
          path: '/cappers/:capperId',
          component: CapperPage,
        },
        {
          path: '/sheets',
          component: SheetsPage,
        },
        {
          path: '/sheets/:sheetID',
          component: SheetPage,
        },
      ],
    }),
  )
  .mount('#app')
