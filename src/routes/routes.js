import DashboardLayout from '../layout/DashboardLayout.vue'
import Login from '../components/Login.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import General from 'src/pages/General.vue'
import Composer from 'src/pages/Composer.vue'
import SQACriteria from 'src/pages/SQACriteria.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import Files from 'src/pages/Files.vue'
import SelectOption from 'src/pages/SelectOption.vue'
import FullAssessment from 'src/pages/FullAssessment.vue'
import VueRouter from 'vue-router'

function requireAuth (to, from, next) {
  localStorage.getItem('session');
  var session = JSON.parse(localStorage.getItem("session"));
   if(session){
     if(session.user.authenticated == true){
       return next()
     }else{
        next({
         path: '/login',
         query: { redirect: to.fullPath }
       })
     }
   }else{
      next({
         path: '/login',
         query: { redirect: to.fullPath }
       })
   }
}

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
        path: 'general-options',
        name: 'general',
        // beforeEnter: requireAuth,
        component: General
      },
      {
        path: 'composer-options',
        name: 'composer',
        // beforeEnter: requireAuth,
        component: Composer
      },
      {
        path: 'select-option',
        name: 'SelectOption',
        // beforeEnter: requireAuth,
        component: SelectOption
      },
      {
        path: 'sqa-criteria',
        name: 'SQACriteria',
        // beforeEnter: requireAuth,
        component: SQACriteria
      },
      {
        path: 'full-assessment',
        name: 'full_assessment',
        // beforeEnter: requireAuth,
        component: FullAssessment
      },
      {
        path: 'user',
        name: 'User',
        // beforeEnter: requireAuth,
        component: UserProfile
      },
      {
        path: 'files',
        name: 'Files',
        // beforeEnter: requireAuth,
        component: Files
      },

      { path: '/logout',
        beforeEnter (to, from, next) {
          next('/')
          // localStorage.removeItem('session');
          localStorage.removeItem('session');
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
