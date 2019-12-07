import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import ProductList from './views/step/productList.vue'
import OrderCheck from './views/step/orderCheck.vue'
import ReCharge from './views/step/reCharge.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    }, 
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '导航栏',
        redirect:'/productlist',
        children: [
            { path: '/productlist', component: ProductList, name: '可购买商品列表'},
            { path: '/ordercheck', component: OrderCheck, name: '订单查询'},
            { path: '/recharge', component: ReCharge, name: '充值',},
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;