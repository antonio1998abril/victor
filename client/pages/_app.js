import Router from "next/router";
import React from "react";


import '../styles/globals.css' 
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from "../components/Loader/Loader";
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import {DataProvider} from '../components/GlobalState'
import Sidebar from '../components/SideBar/Sidebar'


import {useRouter} from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false);

  const showBarLogin = router.pathname === '/login'  ? true : false;
  const showBarRegister = router.pathname === '/register' ? true : false;
  React.useEffect(() => {
    const start = () => {
/*       console.log("start"); */
      setLoading(true);
    };
    const end = () => {
    /*   console.log("findished"); */
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      <DataProvider>
       <div className="main"> 
            {
              !showBarLogin && !showBarRegister && (<React.Fragment>
              <Sidebar/>,
              <Header/>,
              <Footer/>
          
              </React.Fragment>
              )
            }
            
          {
            loading ? (
              <Loader/>
            ) : (<React.Fragment>
            <div /* className="content-wrap" */ className={!showBarLogin && !showBarRegister ? "content-wrap" : ""}>
              <Component {...pageProps} />
            </div>
              </React.Fragment>

            )
            
          }
        
         </div> 
      </DataProvider>
    </>
  );
}