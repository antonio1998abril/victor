import React, { useContext } from 'react'
import {MenuOption} from './MenuOption'
import {MenuAdmin} from './MenuAdmin'
import {useRouter} from 'next/router';
import Link from 'next/link';
import { GlobalState } from '../GlobalState';



function Sidebar() {
    const router = useRouter()
    const active = router.pathname;

    const state = useContext(GlobalState);
    const [isAdmin]= state.User.isAdmin

    const AdminMenu = () =>{
      return (
        <React.Fragment>
           {
            MenuAdmin.map((item,index) => {
              return (
              
            <Link href={item.path} key={index} >

              <a className={(item.path === active ? 'nav__item active': 'nav__item')}> 
                <div className="nav__item-icon">
                  { item.admin && isAdmin ? item.iconAdmin :item.icon }

                </div>
              
                <div  className="nav__item-name">
                  { item.admin && isAdmin ? item.titleAdmin  :item.title }
                </div>
              </a>

            </Link>
            
              )
            })
          }           {
            MenuOption.map((item,index) => {
              return (
              
            <Link href={item.path} key={index} >

              <a className={(item.path === active ? 'nav__item active': 'nav__item')}> 
                <div className="nav__item-icon">
                  { item.admin && isAdmin ? item.iconAdmin :item.icon }

                </div>
              
                <div  className="nav__item-name">
                  { item.admin && isAdmin ? item.titleAdmin  :item.title }
                </div>
              </a>

            </Link>
            
              )
            })
          }
          
          
        </React.Fragment>
      )
    }

    const CommonMenu = () => {
      return (
        <React.Fragment>
           {
            MenuOption.map((item,index) => {
              return (
              
            <Link href={item.path} key={index} >

              <a className={(item.path === active ? 'nav__item active': 'nav__item')}> 
                <div className="nav__item-icon">
                  { item.admin && isAdmin ? item.iconAdmin :item.icon }

                </div>
              
                <div  className="nav__item-name">
                  { item.admin && isAdmin ? item.titleAdmin  :item.title }
                </div>
              </a>

            </Link>
            
              )
            })
          }
        </React.Fragment>
      )
    }
    return (
      <nav className="sidebar">
      <div className="nav__container" >
        
         {/*  {
            MenuOption.map((item,index) => {
              return (
              
            <Link href={item.path} key={index} >

              <a className={(item.path === active ? 'nav__item active': 'nav__item')}> 
                <div className="nav__item-icon">
                  { item.admin && isAdmin ? item.iconAdmin :item.icon }

                </div>
              
                <div  className="nav__item-name">
                  { item.admin && isAdmin ? item.titleAdmin  :item.title }
                </div>
              </a>

            </Link>
            
              )
            })
          } */}

          {
            isAdmin ? AdminMenu() : CommonMenu()
          }
      </div>
    </nav>

    )
}

export default Sidebar
