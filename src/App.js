import './App.css';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Categories from './components/Categories/Categories';
import Products from './components/Products/Products';
import Register from './components/Register/Register';
import Cart from './components/Cart/Cart';
import NotExist from './components/NotExist/NotExist';
import Login from './components/Login/Login';
import Brands from './components/Brands/Brands';
import { UserContextProvider } from './Context/userContext';
import RoutingGuard from './components/RoutingGuard/RoutingGuard';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import ResetPassWord from './components/ResetPassWord/ResetPassWord';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { ToastContainer } from 'react-toastify';
import CheckOut from './components/CheckOut/CheckOut';
import AllOrders from './components/AllOrders/AllOrders';
import { CartContextProvider } from './Context/cartContext';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';

let routers = createHashRouter([
  {
    path: '/', element: <Layout />, children: [
      { index: true, element: <RoutingGuard><Home /></RoutingGuard> },
      { path: 'cart', element: <RoutingGuard><Cart /></RoutingGuard> },
      { path: 'products', element: <RoutingGuard><Products /></RoutingGuard> },
      { path: 'categories', element: <RoutingGuard><Categories /></RoutingGuard>,children:[
        {path:'music',element:''},
        {path:"Men'sFashion",element:''},
        {path:"Women'sFashion",element:''},
        {path:'SuperMarket',element:''},
        {path:'Baby&Toys',element:''},
        {path:'House',element:''},
        {path:'Books',element:''},
        {path:'Beauty&Health',element:''},
        {path:'Mobiles',element:''},
        {path:'Electronics',element:''},
      ] },
      { path: 'brands', element: <RoutingGuard><Brands /></RoutingGuard> },
      { path: 'productDetails/:id', element: <RoutingGuard><ProductDetails /></RoutingGuard> },
      { path: 'checkout/:cartId', element: <RoutingGuard><CheckOut /></RoutingGuard> },
      { path: 'allOrders', element: <RoutingGuard><AllOrders /></RoutingGuard> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'forgetPassword', element: <ForgetPassword /> },
      { path: 'resetPassword', element: <ResetPassWord /> },
      { path: '*', element: <NotExist /> },
    ]
  }

])

function App() {
  const queryClient = new QueryClient()
  return <>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <CartContextProvider>
          <RouterProvider router={routers}></RouterProvider>
        </CartContextProvider>
      </UserContextProvider>
      {/* <ReactQueryDevtools/> 5as be ta3'eer settings ta5zen el data fe el cash */}
    </QueryClientProvider>


    <ToastContainer />


  </>
}

export default App;
