
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import AddProduct from 'views/AddProduct.js'
import Blog from "views/Blog";
import UsersCRUD from "views/UsersCRUD";
import Orders from "views/Orders";
import Login from 'views/Login'
import HomeSlider from "views/HomeSlider";
import SpecialOffers from "views/SpecialOffers";
import Banners from "views/Banners";
import TopSelling from "views/TopSelling";
import Category from "views/Category";
import Colors from 'views/Colors'
import JoinTeam from 'views/JoinTeam'
import TradeIn from "views/TradeIn"
import Subscribe from "views/Subscribe";
import Test from "views/Test";
var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "/admin",
  },
   {
    path: "/homeslider",
    name: "Home Slider",
    icon: "nc-icon nc-diamond",
    component: <HomeSlider />,
    layout: "/admin",
  },
   {
    path: "/specialoffer",
    name: "Special Offers",
    icon: "nc-icon nc-diamond",
    component: <SpecialOffers />,
    layout: "/admin",
  },
  //  {
  //   path: "/category",
  //   name: "Category",
  //   icon: "nc-icon nc-diamond",
  //   component: <Category />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/color",
  //   name: "Color",
  //   icon: "nc-icon nc-diamond",
  //   component: <Colors/>,
  //   layout: "/admin",
  // },
   {
    path: "/topselling",
    name: "Top Selling ",
    icon: "nc-icon nc-diamond",
    component: <TopSelling />,
    layout: "/admin",
  },
  // {
  //   path: "/test",
  //   name: "Test ",
  //   icon: "nc-icon nc-diamond",
  //   component: <Test />,
  //   layout: "/admin",
  // },
  {
    path: "/jointeam",
    name: "Join Team",
    icon: "nc-icon nc-diamond",
    component: <JoinTeam/>,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-diamond",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: <Notifications />,
  //   layout: "/admin",
  // },
  {
    path: "/usercrud",
    name: "Users",
    icon: "nc-icon nc-single-02",
    component: <UsersCRUD />,
    layout: "/admin",
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "nc-icon nc-single-02",
  //   component: <Login/>,
  //   layout: "/admin",
  // },
  {
    path: "/addproduct",
    name: "Product",
    icon: "nc-icon nc-single-02",
    component: <AddProduct/>,
    layout: "/admin",
  },
  {
    path: "/blog",
    name: "Blog",
    icon: "nc-icon nc-single-02",
    component: <Blog/>,
    layout: "/admin",
  },
  {
    path: "/orders",
    name: "Orders",
    icon: "nc-icon nc-single-02",
    component: <Orders/>,
    layout: "/admin",
  },
  {
    path: "/tradein",
    name: "TradeIn",
    icon: "nc-icon nc-diamond",
    component: <TradeIn/>,
    layout: "/admin",
  },
  {
    path: "/subscribe",
    name: "Subscribe",
    icon: "nc-icon nc-diamond",
    component: <Subscribe/>,
    layout: "/admin",
  },
  {
    path: "/image",
    name: "Image",
    icon: "nc-icon nc-diamond",
    component: <Test/>,
    layout: "/admin",
  },
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "nc-icon nc-tile-56",
  //   component: <TableList />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: <Typography />,
  //   layout: "/admin",
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-spaceship",
  //   component: <UpgradeToPro />,
  //   layout: "/admin",
  // },
];
export default routes;
