import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
// routes
import Router from './routes';
// theme
// components
import './App.css'
import { verify } from './utils/requests';
// ----------------------------------------------------------------------

export default function App() {
  const [isAuth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const  appContext = useSelector(state=>state.appState);
  const dispatch = useDispatch();

  useEffect(()=>{
    const user = localStorage.getItem('user');
    
    if(user){
      const user_ = JSON.parse(user);
      console.log(user_, "uuu")
      verify({token:user_.token}).then(response=>{
        dispatch({type:"LOGIN_OK", payload:response.data});
        setLoading(false)
        setAuth(true);
      }).catch(error=>{
        
        alert(JSON.stringify(error.message))

        dispatch({type:"LOGIN_FAILED", payload:null});
        setLoading(false)
        setAuth(false)
        
      })
    }
    else{
      dispatch({type:"LOGIN_FAILED", payload:null});
      setLoading(false)
      setAuth(false)
    }
    

  }, [])
  return (
    <>
      {
        loading?(
          <div>
            Loadingggggg
          </div>
        ):(
          <BrowserRouter>
              <Router auth={isAuth}/>
          </BrowserRouter>
        )
      }
    </>
  );
}
