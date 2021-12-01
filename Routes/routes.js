const express = require ('express');
const UserController = require('../Controller/user')
const PacienteController = require('../Controller/paciente')
const auth = require('../Middleware/auth');
const BuscarController = require('../Controller/Buscar');
const GlucosaController = require('../Controller/Glucosa');
const PresionController = require('../Controller/Presion');
const DialisisController = require('../Controller/Dialisis');
const ActController = require('../Controller/Act');
const Activities = require('../Models/ActividadesSchema');
const GraphController = require('../Controller/graphs')
const Patient = require('../Models/PacienteSchema');
const User = require('../Models/UserSchema');
const Notification = require('../Models/NotificacionesSchema')
const nodemailer=require('nodemailer')
const util = require('util');
const moment = require('moment');



let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MESSAGEEMAIL,
    pass: process.env.PASSEMAIL
  }
});

const routes = {
    user: express.Router()
    .post('/register',UserController.register)
    .post('/login',UserController.login)
    .get('/logout',UserController.logout)
    .get('/refresh_token',UserController.refreshToken)
    .get('/info',auth,UserController.getUser),

    paciente: express.Router()
    .get('/findPaciente',BuscarController.findPaciente)
    .get('/getpaciente',auth,PacienteController.GetPaciente)
    .post('/createpaciente',auth,PacienteController.NewPaciente)
    .delete('/deletePaciente/:id',auth,PacienteController.DeletePaciente)
    .put('/putPaciente/:id',PacienteController.UpdatePaciente)
    /*Expedienete */
    .post('/createExpediente/:id',auth,PacienteController.CreateExpediente)
    .post('/createRegimen/:id',auth,PacienteController.createRegimen)
    .get('/getExpediente/:id',PacienteController.getExpediente)
    .post('/NewHistorial/:id',auth,PacienteController.NewHistorial)
    .delete('/DeleteHistorial/:id',PacienteController.DeleteExpediente)
    .post('/addCopy',auth,PacienteController.addCopy)

    /* GLUCOSA  PRESION DIALISIS */
    .post('/postGlucosa',auth,GlucosaController.postGlucosa)
    .get('/getGlucosa/:id',auth,GlucosaController.getGlucosaList)
    .put('/upGlucosa/:id',auth,GlucosaController.updateGlucosa)
    .delete('/deleteGlucosa/:id',auth,GlucosaController.deleteGlucosa)
    
    .post('/postPresion',auth,PresionController.postPresion)
    .get('/getPresion/:id',auth,PresionController.getPresionList)
    .put('/upPresion/:id',auth,PresionController.updatePresion)
    .delete('/deletePresion/:id',auth,PresionController.deletePresion)


    .post('/postDia',auth,DialisisController.postDialisis)
    .get('/getDia/:id',auth,DialisisController.getDialisisList)
    .put('/upDia/:id',auth,DialisisController.updateDialisis)
    .delete('/deleteDia/:id',auth,DialisisController.deleteDialisis)
    /* GLUCOSA  PRESION DIALISIS*/
    
    /* ACTIVIDADES */
    .post('/postACT',auth,ActController.postAct)
    .get('/getAct/:id',auth,ActController.getAct)
    .delete('/deleteAct/:id',ActController.deleteAct)
    .put('/upAct/:id',auth,ActController.updateAct)
    .put('/doneAct/:id',ActController.DoneAct)
    .put('/backOff/:id',ActController.Backoff)

    /* Grafica */
    .get('/graph/:id',GraphController.getGraphs)
    /* ADMIN */
    .get('/SuperGet',auth,UserController.SuperGet)
    .put('/ChangeRole/:id',auth,UserController.ChangeRole)

    /* NOTIFICATIONS */
    .get('/GetNotification',auth,PacienteController.getNotificacion)
    .delete('/deNotification/:id',PacienteController.deleteNotifications)

    /* DELETE */
    .delete('/deleteUser/:id',UserController.DeleteUser)
}

/* tick() *//* CADA MINUTO */
/* Ftomorrow() *//* CADA DIA */

function Ftomorrow(){
  var hours =new Date().getHours();
  var minutes=new Date().getMinutes();
  let timeDay=hours+':'+minutes
/*   if(timeDay >= "11:00"  && timeDay <= "23:59"){ */
        getremindD(timeDay)  
  /* } */
}

function tick(){
    var hours =new Date().getHours();
    var minutes=new Date().getMinutes();
    let time=hours+':'+minutes
   /*  if(time >= "23:00"  && time <= "2:59"){ */
         getremind(time) 
   /*  }    */
}

var toExactMinute = 60000 - (new Date().getTime() % 60000);


/* setInterval(tick,50000); *///cada minuto
/* setInterval(Ftomorrow,86400000) *///cada 24 horas

///CADA MINUTO
function getremind(time){

  
    const CreateNotification= async ({State,Medics}) =>{
    for (i=0;i < Medics.length; i++){
        let notifications = new Notification({
        title:`Muy pronto la actividad ${State.Activityname} para ${State.name} ${State.lastname}  `,
        Content: `Debera de completarse antes del  ${State.DateToComplete} a las ${State.TimeToComplete}`,
        user_id:Medics[i],
        }) 
        notifications.save().then(()=> {
          console.log("new Notification")
      }) 
      } 
  }
    const getAct = async()=> {
        let ListReminder = await Activities.find({Status:false}).lean().populate('paciente_id')
        ListReminder = JSON.stringify(ListReminder) 
        ListReminder = JSON.parse(ListReminder)

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth()).padStart(2, '0'); 
        let yyyy = today.getFullYear();
        /* FECHA DE HOY */
        today =  yyyy + '-' + mm + '-' + dd; 
        let tomorrowDay = moment(today, "YYYY.MM.DD");

        let tomorrowDayA2 = moment(new Date()).toDate();
        let m =tomorrowDayA2.getMonth() +1
        tomorrowDayA2 = tomorrowDayA2.getFullYear()  + '-' + m + '-' + tomorrowDayA2.getDay().toString().padStart(2, '0'); 

        let sTime2 = moment(new Date()).toDate();
        sTime2 = sTime2.getHours().toString().padStart(2, '0')+':'+ sTime2.getMinutes().toString().padStart(2, '0');


        tomorrowDay =tomorrowDay.add(1, 'days').toDate().getDate();
        /* let cca = moment(today).add(2, 'months') console.log(cca.toDate().getMonth()) */
        let tomorrow = new Date();
        let tomorrowMonth =  moment(new Date()).add(1, 'M').toDate();
        /* FECHA DE MAÑANA */
        tomorrow =  tomorrowMonth.getFullYear() + '-' + tomorrowMonth.getMonth() + '-' + tomorrowDay ;
        /* HORA MAS QUINCE MINUTOS */
        let Remember15 = moment(new Date()).add(15, 'm').toDate();
        Remember15 = Remember15.getHours().toString().padStart(2, '0') +':'+Remember15.getMinutes().toString().padStart(2, '0');
        //ListReminder  = util.inspect(ListReminder, false, null) dos horas
        let Remember2 = moment(new Date()).add(2,'h').toDate();
        Remember2 = Remember2.getHours().toString().padStart(2, '0') +':'+Remember2.getMinutes().toString().padStart(2, '0');
            if (ListReminder.length >= 0){
             for (i =0 ; i< ListReminder.length; i++ ) {
                let info = ListReminder[i].paciente_id
                let Medics = ListReminder[i].paciente_id.MedicoDeCabecera
                
               
                const State =  new Object({
                    name: info.name,
                    lastname:info.lastname,
                    email:info.email,
                    Activityname:ListReminder[i].Activityname,
                    DateToComplete:ListReminder[i].DateToComplete,
                    TimeToComplete:ListReminder[i].TimeToComplete
                })
                /* comparar fecha del  usuario con la variable tomorrow */
                /*  console.log(sTime2,ListReminder[i].TimeToComplete)
                console.log(ListReminder[i].DateToComplete,tomorrowDayA2)  */

                if(ListReminder[i].DateToComplete == today && ListReminder[i].TimeToComplete ==  Remember2  || ListReminder[i].TimeToComplete == Remember15  || ListReminder[i].DateToComplete == tomorrowDayA2 && sTime2 == ListReminder[i].TimeToComplete){
              

                  CreateNotification({State,Medics})
                    let mailOptions = {
                    from: process.env.MESSAGEEMAIL,
                    to: info.email,
                    subject: `La actividad ${State.Activityname} vence pronto!!! `,
                    text: `La actividad ${State.Activityname} asignada a ${State.name} ${State.lastname} debera completarse pronto antes del ${State.DateToComplete} a las ${State.TimeToComplete}` ,
                }; 
                 transporter.sendMail(mailOptions, function(error, info){ 
                    if (error) { console.log(error); } else {console.log('Email sent: ' + info.response); }
                });   
                                     
                  }               
            }
          
       /*      console.log("**********************************")
            console.log("Tiempo 15 MINUTOS ANTES: ",Remember15)
            console.log("Tiempo comparar dos horas despues pero de la hora de la cita: ",Remember2)
            console.log("Fecha un dia despues",tomorrow)
            console.log("**********************************") */
        }
    }

    getAct()
}


/* CADA DIA */
function getremindD(time){


  const CreateNotification= async ({State,Medics}) =>{
  for (i=0;i < Medics.length; i++){
      let notifications = new Notification({
      title:`Muy pronto la actividad ${State.Activityname} para ${State.name} ${State.lastname}  `,
      Content: `Debera de completarse antes del  ${State.DateToComplete} a las ${State.TimeToComplete}`,
      user_id:Medics[i],
      }) 
      notifications.save().then(()=> {
        console.log("new Notification")
    }) 
    }
}

  const getActD = async()=> {
      let ListReminder = await Activities.find({Status:false}).lean().populate('paciente_id')
      ListReminder = JSON.stringify(ListReminder) 
      ListReminder = JSON.parse(ListReminder)
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth()).padStart(2, '0'); 
      let yyyy = today.getFullYear();
      /* FECHA DE HOY */
      today =  yyyy + '-' + mm + '-' + dd; 
      let tomorrowDay = moment(today, "YYYY.MM.DD");
      tomorrowDay =tomorrowDay.add(1, 'days').toDate().getDate();
      let tomorrow = new Date();
      let tomorrowMonth =  moment(new Date()).add(1, 'M').toDate();
      /* FECHA DE MAÑANA */
      tomorrow =  tomorrowMonth.getFullYear() + '-' + tomorrowMonth.getMonth() + '-' + tomorrowDay ;
          if (ListReminder.length >= 0){
           for (i =0 ; i< ListReminder.length; i++ ) {
              let info = ListReminder[i].paciente_id
              let Medics = ListReminder[i].paciente_id.MedicoDeCabecera
              const State =  new Object({
                  name: info.name,
                  lastname:info.lastname,
                  email:info.email,
                  Activityname:ListReminder[i].Activityname,
                  DateToComplete:ListReminder[i].DateToComplete,
                  TimeToComplete:ListReminder[i].TimeToComplete
              })
              /* comparar fecha del  usuario con la variable tomorrow */
              if(ListReminder[i].DateToComplete == tomorrow){
                CreateNotification({State,Medics})
                  let mailOptions = {
                  from: process.env.MESSAGEEMAIL,
                  to: info.email,
                  subject: `La actividad ${State.Activityname} vence pronto!!! `,
                  text: `La actividad ${State.Activityname} asignada a ${State.name} ${State.lastname} debera completarse pronto antes del ${State.DateToComplete} a las ${State.TimeToComplete}` ,
              }; 
               transporter.sendMail(mailOptions, function(error, info){ 
                  if (error) { console.log(error); } else {console.log('Email sent: ' + info.response); }
              });   
                  console.log("MENSAJE ENVIADO PARA MAÑANA")                    
                }               
          }
      }
  }

  getActD()
}

module.exports = routes

/*   let getTimeToRemember = moment(tomorrow + ListReminder[i].TimeToComplete , "YYYY.MM.DD HH.mm").toDate();  */