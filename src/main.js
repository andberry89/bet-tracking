import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import * as VueRouter from 'vue-router'
import ContributorPage from './pages/ContributorPage.vue'
import ContributorsPage from './pages/ContributorsPage.vue'
import SheetPage from './pages/SheetPage.vue'
import SheetsPage from './pages/SheetsPage.vue'
import PageNotFound from './pages/PageNotFound.vue'
import DashboardPage from './pages/DashboardPage.vue'
import ContributorDashboard from './pages/ContributorDashboard.vue'

createApp(App)
  .use(
    VueRouter.createRouter({
      history: VueRouter.createWebHistory(process.env.BASE_URL),
      routes: [
        {
          path: '/contributors',
          component: ContributorsPage,
        },
        {
          path: '/contributors/:contributorId',
          component: ContributorPage,
        },
        {
          path: '/sheets',
          component: SheetsPage,
        },
        {
          path: '/sheets/:sheetId',
          component: SheetPage,
        },
        {
          path: '/dashboard',
          component: DashboardPage,
        },
        {
          path: '/dashboard/:contributorId',
          component: ContributorDashboard,
        },
        {
          path: '/:pathMatch(.*)*',
          component: PageNotFound,
        },
      ],
    }),
  )
  .mount('#app')
