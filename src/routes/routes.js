import LoginComponent from "../components/login"
import CustomerDashboard from "../components/customer-dashboard"
import SignUp from "../components/sign-up"
import store from "../store/store";
import NewOrder from "../components/new-order"
import OrderHistory from "../components/order-history"

export default [
        {
            path: '/',
            component: LoginComponent
        },
        {
            path: "/login",
            name: "login",
            component: LoginComponent
        },
        {
            path: "/sign-up",
            name: "sign-up",
            component: SignUp
        },
        {
            path: "/customer-dashboard",
            name: "customer-dashboard",
            component: CustomerDashboard,
            beforeEnter: (to, from, next) => {
                if(store.state.authenticated == false) {
                    next('/');
                } else {
                    next();
                }
            }
        },
        {
            path: "/order-history",
            name: "order-history",
            component: OrderHistory,
            props: route => ({ query: route.query.q }),
            beforeEnter: (to, from, next) => {
                if(store.state.authenticated == false) {
                    next('/');
                } else {
                    next();
                }
            }
        },
        {
            path: "/new-order",
            name: "new-order",
            component: NewOrder,
            beforeEnter: (to, from, next) => {
                if(store.state.authenticated == false) {
                    next('/');
                } else {
                    next();
                }
            }
        }
        
    ]
    