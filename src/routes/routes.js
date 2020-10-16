import DashboardLayout from '../layout/DashboardLayout.vue'
import Login from '../components/Login.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Overview from 'src/pages/Overview.vue'
import SQACriteria from 'src/pages/SQACriteria.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import Files from 'src/pages/Files.vue'
import SelectOption from 'src/pages/SelectOption.vue'
import FullAssessment from 'src/pages/FullAssessment.vue'
import Typography from 'src/pages/Typography.vue'
import Icons from 'src/pages/Icons.vue'
import Maps from 'src/pages/Maps.vue'
import Notifications from 'src/pages/Notifications.vue'
import Upgrade from 'src/pages/Upgrade.vue'

const routes = [
  {
    path: '/login',
    component: Login,
    // redirect: '/dashboard'
  },
  { path: '',
    component: Login,
    // beforeEnter: requireAuth
  },
  { path: '/',
    component: Login,
  // beforeEnter: requireAuth
  },
  // {
  //   path: '/dashboard',
  //   component: DashboardLayout,
  //   name: 'dashboard',
  //   // redirect: '/admin/overview'
  // },
  {
    path: '/auth',
    component: DashboardLayout,
    name: 'user',
    // redirect: '/admin/overview',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Overview
      },
      {
        path: 'select-option',
        name: 'SelectOption',
        component: SelectOption
      },
      {
        path: 'sqa-criteria',
        name: 'SQACriteria',
        component: SQACriteria
      },
      {
        path: 'full-assessment',
        name: 'full_assessment',
        component: FullAssessment
      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile
      },
      {
        path: 'files',
        name: 'Files',
        component: Files
      },
      {
        path: 'typography',
        name: 'Typography',
        component: Typography
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade
      },
      { path: '/logout',
        beforeEnter (to, from, next) {
          next('/login')
          // localStorage.removeItem('session');
          localStorage.removeItem('token');
          localStorage.clear()
        }
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
