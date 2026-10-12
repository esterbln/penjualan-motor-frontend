import { admin, user } from 'src/helper/ListAkses'

const routes = [
  {
    path: '/login',
    name: 'loginPage',
    component: () => import('pages/auth/Login.vue')
  },
  {
    path: '/register',
    name: 'registerPage',
    component: () => import('pages/auth/Register.vue')
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/admin/',
    meta: {
      allowedRole: admin.value,
      auth: true
    },
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboardAdmin',
        component: () => import('pages/admin/Index.vue')
      },
      {
        path: 'tipe',
        name: 'dataTipeAdmin',
        component: () => import('pages/admin/tipe/Index.vue')
      },
      {
        path: 'motor',
        name: 'dataMotorAdmin',
        component: () => import('pages/admin/motor/Index.vue')
      },
      {
        path: 'motor/input',
        name: 'inputDataMotorAdmin',
        component: () => import('pages/admin/motor/Input.vue')
      },
      {
        path: 'motor/edit/:id',
        name: 'editDataMotorAdmin',
        component: () => import('pages/admin/motor/Edit.vue')
      }
    ]
  },
  {
    path: '/user/',
    meta: {
      allowedRole: user.value,
      auth: true
    },
    component: () => import('layouts/UserLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboardUser',
        component: () => import('pages/user/Index.vue')
      },
      {
        path: 'pembayaran',
        name: 'pembayaranUser',
        component: () => import('pages/user/Pembayaran.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
