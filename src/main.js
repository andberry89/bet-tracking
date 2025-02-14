import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import * as VueRouter from 'vue-router'

/**
 * * Make sure to add the Vue component to '@/components/pages/index.js
 */
import {
  AddContributor,
  AddSheet,
  ContributorDashboard,
  ContributorPage,
  ContributorsPage,
  DashboardPage,
  PageNotFound,
  SheetDashboard,
  SheetPage,
  SheetsPage,
} from '@/components/pages'

/**
 * * Only register components that are regularly used globally
 */
import {
  ArrowComponent,
  CheckboxInput,
  DoughnutChart,
  InputDate,
  InputNumber,
  InputText,
  LineChart,
  ModalOverlay,
  RadioButton,
  RadioButtonGroup,
  SearchBox,
  SelectComponent,
  SVGComponent,
  SVGEdit,
  SVGPlusMinus,
} from '@/components/common'

const app = createApp(App)

app.component('ArrowComponent', ArrowComponent)
app.component('CheckboxInput', CheckboxInput)
app.component('DoughnutChart', DoughnutChart)
app.component('InputDate', InputDate)
app.component('InputNumber', InputNumber)
app.component('InputText', InputText)
app.component('LineChart', LineChart)
app.component('ModalOverlay', ModalOverlay)
app.component('RadioButton', RadioButton)
app.component('RadioButtonGroup', RadioButtonGroup)
app.component('SearchBox', SearchBox)
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
        path: '/dashboard/contributors/add-new-contributor',
        component: AddContributor,
      },
      {
        path: '/dashboard/contributors/:contributorId',
        component: ContributorDashboard,
      },
      {
        path: '/dashboard/sheets/add-new-sheet',
        component: AddSheet,
      },
      {
        path: '/dashboard/sheets/:sheetId',
        component: SheetDashboard,
      },
      {
        path: '/:pathMatch(.*)*',
        component: PageNotFound,
      },
    ],
  }),
)

app.mount('#app')
