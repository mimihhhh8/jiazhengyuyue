
// ref: https://umijs.org/config/
export default {
  hash:true,
  history:"hash",
  treeShaking: true,
  // routes: [
  //   {
  //     path: '/',
  //     component: '../layouts/index',
  //     routes: [
  //       { path: '/', component: '../pages/index' },
  //       { path: '/home', component: '../pages/home/index' },
  //       { path: '/serveList', component: '../pages/serveList/index' },
  //       { path: '/addServe', component: '../pages/addServe/index' },
  //       {path:'/login',component:'../pages/login/index'},
  //       {path:'/register',component:'../pages/register/index'},
  //       {path:'/mineOrder',component:'../pages/mineOrder/index'},
  //       {path:'/mineappointment',component:'../pages/mineAppointment/index'},
  //     ]
  //   },
  //   // { path: '/login/', component: '../pages/login/index.js' },
    
  // ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'houseorder',
      dll: false,
      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}
