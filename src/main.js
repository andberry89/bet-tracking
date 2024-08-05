import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import * as VueRouter from 'vue-router'

/**
 * * Make sure to add the Vue component to '@/components/pages/index.js
 */
import {
  AddContributor,
  ContributorDashboard,
  ContributorPage,
  ContributorsPage,
  DashboardPage,
  PageNotFound,
  SheetPage,
  SheetsPage,
} from '@/components/pages'

/**
 * * Only register components that are regularly used globally
 */
import {
  ArrowComponent,
  CheckboxInput,
  InputDate,
  InputNumber,
  InputText,
  LineChart,
  ModalOverlay,
  RadioButton,
  RadioButtonGroup,
  SelectComponent,
  SVGComponent,
  SVGEdit,
  SVGPlusMinus,
} from '@/components/common'

const app = createApp(App)

app.component('ArrowComponent', ArrowComponent)
app.component('CheckboxInput', CheckboxInput)
app.component('InputDate', InputDate)
app.component('InputNumber', InputNumber)
app.component('InputText', InputText)
app.component('LineChart', LineChart)
app.component('ModalOverlay', ModalOverlay)
app.component('RadioButton', RadioButton)
app.component('RadioButtonGroup', RadioButtonGroup)
app.component('SelectComponent', SelectComponent)
app.component('SVGComponent', SVGComponent)
app.component('SVGEdit', SVGEdit)
app.component('SVGPlusMinus', SVGPlusMinus)

app.use(
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
        path: '/dashboard/add-new-contributor',
        component: AddContributor,
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

app.mount('#app')
