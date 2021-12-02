import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../components/GlobalState';
import Router from 'next/router';

function Admin() {
    const state = useContext(GlobalState);
    const [loaded,setLoaded] = useState(false)
    const [islogged]= state.User.isLogged

/*     useEffect(() => {
        if(!isAdmin || !islogged) {
          let timerFunc = setTimeout(() => {
            Router.push('/')
          }, 100);
    
          return () => clearTimeout(timerFunc);
      }else{ 
          setLoaded(true) 
        }
    }, [!isAdmin, !islogged]);
   */

    useEffect(() => {
      if(!islogged) {
        let timerFunc = setTimeout(() => {
          Router.push('/login')
        }, 100);
  
        return () => clearTimeout(timerFunc);
    }else{ 
        setLoaded(true) 
      }
  }, [!islogged]);
  
    if (!loaded) { return <div></div> } 
  
    return (
      <>
       <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="paciente ">
              <div className="card-header">
                <h3 className="card-title">Citas</h3>
              </div>
         
              <div className="card-body">
                <div className="row ">

                <div className="col-sm-4">
                    <div className="position-relative p-3 bg-gray citas" >
                      <div className="ribbon-wrapper">
                        <div className="ribbon bg-success">
                        HECHO
                        </div>
                      </div>
                      Ribbon Default <br/>
                      <small>.ribbon-wrapper.ribbon-lg .ribbon</small>
                    </div>
                  </div>
                  <br/>

                  <div className="col-sm-4">
                    <div className="position-relative p-3 bg-gray citas"  >
                      <div className="ribbon-wrapper ribbon-xl">
                        <div className="ribbon bg-warning text-lg">
                          Proxima
                        </div>
                      </div>
                      Ribbon Extra Large <br/> with Large Text <br/>
                      <small>.ribbon-wrapper.ribbon-xl .ribbon.text-lg</small>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="position-relative p-3 bg-gray citas" >
                      <div className="ribbon-wrapper ribbon-xl">
                        <div className="ribbon bg-danger text-xl">
                          Pronto
                        </div>
                      </div>
                      Ribbon Extra Large <br/> with Extra Large Text <br/>
                      <small>.ribbon-wrapper.ribbon-xl .ribbon.text-xl</small>
                    </div>
                  </div>
                </div>
              </div> 
             </div>
          </div>
        </div>
      </div> 

{/* ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss */}

<div className="kanban" /* style="min-height: 1191px;" */>
    <section className="content-header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <h1>Mis Actividades</h1>
          </div>
          <div className="col-sm-6 d-none d-sm-block">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item active">Kanban Board</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section className="content pb-3">
      <div className="container-fluid h-100">
        <div className="paciente card-row card-secondary">
          <div className="card-header-kaban">
            <h3 className="card-title">
              Backlog
            </h3>
          </div>
          <div className="card-body">
            <div className="paciente card-info card-outline">
              <div className="card-header-paciente ">
                <h5 className="card-title">Create Labels</h5>
                <div className="card-tools">
                  <a href="#" className="btn btn-tool btn-link">#3</a>
                  <a href="#" className="btn btn-tool">
                    <i className="fas fa-pen"></i>
                  </a>
                </div>
              </div>
              <div className="card-body">

              </div>
            </div>
            <div className="paciente card-primary card-outline">
              <div className="card-header-paciente">
                <h5 className="card-title">Create Issue template</h5>
                <div className="card-tools">
                  <a href="#" className="btn btn-tool btn-link">#4</a>
                  <a href="#" className="btn btn-tool">
                    <i className="fas fa-pen"></i>
                  </a>
                </div>
              </div>
              <div className="card-body">


              </div>
            </div>
            <div className="paciente card-primary card-outline">
              <div className="card-header-paciente">
                <h5 className="card-title">Create PR template</h5>
                <div className="card-tools">
                  <a href="#" className="btn btn-tool btn-link">#6</a>
                  <a href="#" className="btn btn-tool">
                    <i className="fas fa-pen"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="paciente card-light card-outline">
              <div className="card-header-paciente">
                <h5 className="card-title">Create Actions</h5>
                <div className="card-tools">
                  <a href="#" className="btn btn-tool btn-link">#7</a>
                  <a href="#" className="btn btn-tool">
                    <i className="fas fa-pen"></i>
                  </a>
                </div>

              </div>
              <div className="card-body">
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa.
                  Cum sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="paciente card-row card-primary">
          <div className="card-header-kaban">
            <h3 className="card-title">
              To Do
            </h3>
          </div>
          <div className="card-body">
            <div className="paciente card-primary card-outline">
              <div className="card-header-paciente">
                <h5 className="card-title">Create first milestone</h5>
                <div className="card-tools">
                  <a href="#" className="btn btn-tool btn-link">#5</a>
                  <a href="#" className="btn btn-tool">
                    <i className="fas fa-pen"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="paciente card-row card-default">
          <div className="card-header-kaban bg-info">
            <h3 className="card-title">
              In Progress
            </h3>
          </div>
          <div className="card-body">
            <div className="paciente card-light card-outline">
              <div className="card-header-paciente">
                <h5 className="card-title">Update Readme</h5>
                <div className="card-tools">
                  <a href="#" className="btn btn-tool btn-link">#2</a>
                  <a href="#" className="btn btn-tool">
                    <i className="fas fa-pen"></i>
                  </a>
                </div>
              </div>
              <div className="card-body">
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa.
                  Cum sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="paciente card-row card-success">
          <div className="card-header-kaban">
            <h3 className="card-title">
              Done
            </h3>
          </div>
          <div className="card-body">
            <div className="paciente card-primary card-outline">
              <div className="card-header-paciente">
                <h5 className="card-title">Create repo</h5>
                <div className="card-tools">
                  <a href="#" className="btn btn-tool btn-link">#1</a>
                  <a href="#" className="btn btn-tool">
                    <i className="fas fa-pen"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>



      </>
    )
  }

export default Admin
