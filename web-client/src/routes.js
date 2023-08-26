import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import LoginPage from './pages/Auth/Login/LoginPage';
import Page404 from './pages/Page404';

import CalculatorLayout from './layouts/calculator/CalculatorLayout';
import Calculator from './components/Calculator/Calculator';
import Test from './components/Calculator/Insights';
import Signup from './pages/Auth/Signup/Signup';
import Signin from './pages/Auth/Signin/Signin';
import Insights from './components/Calculator/Insights';

// ----------------------------------------------------------------------


// const ProtectedRoute = ({ path, element }) => {
//   const user = localStorage.getItem('user');
//   if (user) {
//     return <Navigate to={path}/>
//   } else {
//     return <Navigate to="/login" />;
//   }
// };


export default function Router({auth}) {
  
  // const [isAuth, setAuth] = React.useState(false);
  const  appContext = useSelector(state=>state.userState);
  // const dispatch = useDispatch();

  // React.useEffect(()=>{
  //   const user = localStorage.getItem('user') || {user:null, token:null};
  //   const user_ = JSON.parse(user);
  //   console.log(user_, "uuu")
  //   if(user_.token){
  //     verify({token:user_.token}).then(response=>{
  //       console.log(response.data, "appppppp")
  //       dispatch({type:"LOGIN_OK", payload:response.data});
  //       dispatch({type:"LOADING_END"});
  //       setAuth(true);
  //     }).catch(error=>{

  //       dispatch({type:"LOGIN_FAILED", payload:null});
  //       dispatch({type:"LOADING_END"});
  //       setAuth(false)
  //       console.log(error)
  //     })
  //   }
    

  // }, [])


  const routes = useRoutes([
    {
      path:'/',
      element: auth?<Navigate to="/dashboard" />:<Navigate to={'/login'} />
    },
    {
      path: '/dashboard',
      element: auth?<CalculatorLayout />:<Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/expenses" />, index: true },
        { path: 'expenses', element: <Calculator/> },

        { path: 'insights', element: <Insights /> ,},
      ],
    },
    {
      path: 'login',
      element:!auth?<Signin />:<Navigate to="/dashboard" />,
    },
    {
      path: 'register',
      element: <Signup />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
