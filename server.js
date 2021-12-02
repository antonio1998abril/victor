const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

/* end all */

const Notification = require("./Models/NotificacionesSchema");
const Activities = require("./Models/ActividadesSchema");
const nodemailer = require("nodemailer");
const moment = require("moment");
/* end all */
//my routes
const Routes = require("./Routes/routes");
const uploadRoute = require("./Routes/uploads");
//Connect to data base
const mongoose = require("mongoose");
mongoose.set("runValidators", true);
mongoose
  .connect(process.env.TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((response) => console.log("MongoDB Connected Successfully."))
  .catch((err) => console.log("Database connection failed."));
mongoose.connection;
//get data from inputs of my frontend
app.use(express.json());

//get body entries
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//used to on jsonwebtoken cookie
app.use(cookieParser());

app.use("/api", Routes.user);
app.use("/api", Routes.paciente);
app.use("/api", uploadRoute);

app.use(function (err, req, res, next) {
  res.json({ error: err.message });
  return res.status(500).json({ msg: err.message });
});

app.get("/", function (req, res) {
  res.send("backend subido");
});

/* BOORRAR */

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MESSAGEEMAIL,
    pass: process.env.PASSEMAIL,
  },
});

module.exports = {
  RegresionLogistica({ fields, owner }) {
    let HemoglobinaGlucosilada = fields.HemoglobinaGlucosilada;
    let Microalbuminuria = fields.Microalbuminuria;
    let NivelCoresterol = fields.NivelCoresterol;
    let NivelTrigliseridos = fields.NivelTrigliseridos;
    let Electrocadriograma = fields.Electrocadriograma;
    let Cuerpodano = fields.Cuerpodaño;
    let OtrasEnfermedades = fields.OtrasEnfermedades;
    let FactorRiesgo = fields.FactorRiesgo;
    let EstadoMental = fields.EstadoMental;
    let EstatusDental = fields.EstatusDental;
    let ownerid = owner;

    console.log(EstadoMental);
    const { spawn } = require("child_process");
    const processt = spawn("python", [
      "./predecir.py",
      `${owner}`,
      `${HemoglobinaGlucosilada}`,
      `${Microalbuminuria}`,
      `${NivelCoresterol}`,
      `${NivelTrigliseridos}`,
      `${Electrocadriograma}`,
      `${Cuerpodano}`,
      `${OtrasEnfermedades}`,
      `${FactorRiesgo}`,
      `${EstadoMental}`,
      `${EstatusDental}`,
    ]);
    processt.stdout.on("data", (data) => {
      console.log(data.toString());
    });
    processt.on("close", (code) => {
      console.log("child process exited with code: " + code);
    });
  },
};

/*  const { spawn } = require('child_process');
const processt = spawn('python', ['./predecir.py', 'Paco']);
processt.stdout.on('data', (data) => {
    console.log(data.toString());
})
processt.on('close', (code) => {
    console.log('child process exited with code: ' + code)
})   
 */

/* var CronJob = require('cron').CronJob; */
/* new CronJob('* * * * * *', function() {
  console.log('You will see this message every 4 minute');
  tick()
Ftomorrow()
}, null, true, 'America/Mexico_City'); */

/* var DataFrame = require('dataframe-js').DataFrame;

const df = new DataFrame([
  {class: 1, age: 6,sex: 2}, // <------- A row
  {class: 3, age: 2,sex:1}
], ['class', 'age','sex']);



const filteredDf = df.filter(row => row.get("class")).select("class", "age", "sex"); */

/* ///////////////////////////// */
const cron = require("node-cron");
cron.schedule("*/1 * * * *", function () {
  getremind();
  console.log("running a task every minute");
});

/* cron.schedule("59 23 * * *", function () {
  console.log("ejecutar cada dia");
  getremindD(timeDay);
});
 */
///CADA MINUTO
function getremind(time) {
  try {
    const getAct = async () => {
      let ListReminder = await Activities.find()
        .lean()
        .populate("paciente_id");
      ListReminder = JSON.stringify(ListReminder);
      ListReminder = JSON.parse(ListReminder);
      let today = new Date();

      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0");
      let yyyy = today.getFullYear();
      /* FECHA DE HOY */
      today = yyyy + "-" + mm + "-" + dd;
      let tomorrowDay = moment(today, "YYYY.MM.DD");

      /* let tomorrowDayA2 = moment(new Date()).toDate(); */

      /* console.log( moment(new Date()).add(1, 'M').toDate().getMonth()) */
      let m = moment(new Date()).add(13, "M").toDate().getMonth();
      console.log("mes", today);
      let tomorrowDayA2 =
        new Date().getFullYear() +
        "-" +
        m +
        "-" +
        new Date().getDate().toString().padStart(2, "0");

      let sTime2 = moment(new Date()).toDate();
      sTime2 =
        sTime2.getHours().toString().padStart(2, "0") +
        ":" +
        sTime2.getMinutes().toString().padStart(2, "0");

      /*  tomorrowDay = tomorrowDay.add(1, 'days').toDate().getDate(); */
      tomorrowDay = tomorrowDay.toDate().getDate();

      /* let cca = moment(today).add(2, 'months') console.log(cca.toDate().getMonth()) */
      let tomorrow = new Date();
      let tomorrowMonth = moment(new Date()).add(1, "M").toDate();
      /* FECHA DE MAÑANA */
      tomorrow =
        tomorrowMonth.getFullYear() +
        "-" +
        tomorrowMonth.getMonth() +
        "-" +
        tomorrowDay;
      /* HORA MAS QUINCE MINUTOS */
      let Remember15 = moment(new Date()).add(15, "m").toDate();
      Remember15 =
        Remember15.getHours().toString().padStart(2, "0") +
        ":" +
        Remember15.getMinutes().toString().padStart(2, "0");
      //ListReminder  = util.inspect(ListReminder, false, null) dos horas
      let Remember2 = moment(new Date()).add(2, "h").toDate();
      Remember2 =
        Remember2.getHours().toString().padStart(2, "0") +
        ":" +
        Remember2.getMinutes().toString().padStart(2, "0");
      /*              
                } else 
                } else if (State.numbertype == 3 && State.Status == false) {
                  let notifications = new Notification({
                    title: `Muy pronto la actividad ${State.Activityname} para ${State.name} ${State.lastname}  `,
                    Content: `Debera de completarse antes del  ${State.DateToComplete} a las ${State.TimeToComplete} Al no tomar una aspirina diaria podrías aumentar tus probabilidades de sufrir un infarto cardiaco en un 65.51%.`,
                    user_id: Medics[i],
                  });
                  notifications.save().then(() => {
                    console.log("new Notification");
                  });
                } else if (State.numbertype == 3 && State.Status == true) {
                  let notifications = new Notification({
                    title: `Bien hecho la ${State.Activityname} para ${State.name} ${State.lastname} fue completada exitosamente `,
                    Content: `Al tomar una aspirina diaria como habito de prevención reduces la probabilidad de sufrir un infarto al corazón en un 65.51%. `,
                    user_id: Medics[i],
                  });
                  notifications.save().then(() => {
                    console.log("new Notification");
                  });
                } else if (State.numbertype == 4 && State.Status == false) {
                  let notifications = new Notification({
                    title: `Muy pronto la actividad ${State.Activityname} para ${State.name} ${State.lastname}  `,
                    Content: `Debera de completarse antes del  ${State.DateToComplete} a las ${State.TimeToComplete} Al no cumplir con el tratamiento indicado por tu médico de forma adecuada aumentas tus posibilidades de desarrollar insuficiencia renal aguda en un 86.11% y de presentar un infarto cardiaco en un 79.16%. `,
                    user_id: Medics[i],
                  });
                  notifications.save().then(() => {
                    console.log("new Notification");
                  });
                } else if (State.numbertype == 4 && State.Status == true) {
                  let notifications = new Notification({
                    title: `Bien hecho la ${State.Activityname} para ${State.name} ${State.lastname} fue completada exitosamente `,
                    Content: `llevar acabo un adecuado control de los niveles de glucosa en la sangre, con el apoyo del tratamiento indicado, reduces en un 86.11% tus probabilidades de desarrollar Insuficiencia renal aguda y 79.16 la probabilidad de sufrir un infarto cardiaco. `,
                    user_id: Medics[i],
                  });
                  notifications.save().then(() => {
                    console.log("new Notification");
                  });
                } else if (State.numbertype == 5 && State.Status == false) {
                  let notifications = new Notification({
                    title: `Muy pronto la actividad ${State.Activityname} para ${State.name} ${State.lastname}  `,
                    Content: `Debera de completarse antes del  ${State.DateToComplete} a las ${State.TimeToComplete} Es importante que revises de forma habitual tus niveles de glucosa en sangre capilar pues un control inadecuado puede desencadenar complicaciones como disminución o perdida de la vista, aparición de ulceras o amputación en pies o piernas, insuficiencia renal aguda e infarto cardiaco. `,
                    user_id: Medics[i],
                  });
                  notifications.save().then(() => {
                    console.log("new Notification");
                  });
                } else if (State.numbertype == 5 && State.Status == true) {
                  let notifications = new Notification({
                    title: `Bien hecho la ${State.Activityname} para ${State.name} ${State.lastname} fue completada exitosamente `,
                    Content: `Al revisar con frecuencia tus niveles de azúcar en la sangre puedes prevenir diferentes complicaciones de la diabetes como:  disminución o pérdida total de la vista, insuficiencia renal aguda, ulceraciones en pies o piernas e infarto cardiaco.  `,
                    user_id: Medics[i],
                  });
                  notifications.save().then(() => {
                    console.log("new Notification");
                  });
                } */
      /* else if (State.numbertype == 6 && State.Status == false) {
                  let notifications = new Notification({
                    title: `Muy pronto la actividad ${State.Activityname} para ${State.name} ${State.lastname}  `,
                    Content: `Debera de completarse antes del  ${State.DateToComplete} a las ${State.TimeToComplete} El que tus niveles de lípidos en la sangre no sean los adecuados puede provocar la necesidad de medicamentos para su control, lo que aumenta 75% tus posibilidades de desarrollar insuficiencia renal aguda. `,
                    user_id: Medics[i],
                  });
                  notifications.save().then(() => {
                    console.log("new Notification");
                  });
                } else if (State.numbertype == 6 && State.Status == true) {
                  let notifications = new Notification({
                    title: `Bien hecho la ${State.Activityname} para ${State.name} ${State.lastname} fue completada exitosamente `,
                    Content: `Mantener tus niveles de lípidos en la sangre evita que requieras para ello el apoyo de medicamentos, disminuyendo así un 75% tus probabilidades de desarrollar insuficiencia renal aguda.`,
                    user_id: Medics[i],
                  });
                  notifications.save().then(() => {
                    console.log("new Notification");
                  });
                } else if (State.numbertype == 7 && State.Status == false) {
                  let notifications = new Notification({
                    title: `Muy pronto la actividad ${State.Activityname} para ${State.name} ${State.lastname}  `,
                    Content: `Debera de completarse antes del  ${State.DateToComplete} a las ${State.TimeToComplete} El consumir bebidas alcohólicas aumenta 83.33% tus posibilidades de desarrollar insuficiencia renal aguda y contribuye al desarrollo de otras complicaciones como disminución o perdida de la vista e infarto cardiaco. `,
                    user_id: Medics[i],
                  });
                  notifications.save().then(() => {
                    console.log("new Notification");
                  });
                } else if (State.numbertype == 7 && State.Status == true) {
                  let notifications = new Notification({
                    title: `Bien hecho la ${State.Activityname} para ${State.name} ${State.lastname} fue completada exitosamente `,
                    Content: `Al evitar el consumo de bebidas alcohólicas disminuyes 83.33% tus posibilidades de desarrollar insuficiencia renal aguda. Además previenes otras complicaciones como disminución o perdida de la vista e infarto cardiaco.  `,
                    user_id: Medics[i],
                  });
                  notifications.save().then(() => {
                    console.log("new Notification");
                  });
                } else if (State.numbertype == 8 && State.Status == false) {
                  console.log("se envio");
                  let notifications = new Notification({
                    title: `Muy pronto la actividad ${State.Activityname} para ${State.name} ${State.lastname}  `,
                    Content: `Debera de completarse antes del  ${State.DateToComplete} a las ${State.TimeToComplete} El fumar aumenta 75% tus probabilidades de desarrollar ulceras en pies o piernas, lo que podría generarte problemas más graves como es la amputación de la extremidad.`,
                    user_id: Medics[i],
                  });
                  notifications.save().then(() => {
                    console.log("new Notification");
                  });
                } else if (State.numbertype == 8 && State.Status == true) {
                  let notifications = new Notification({
                    title: `Bien hecho la ${State.Activityname} para ${State.name} ${State.lastname} fue completada exitosamente `,
                    Content: `Al evitar el consumo de tabaco o dejar de fumar disminuyes 75% tus posibilidades de desarrollar ulceras en pies o piernas. `,
                    user_id: Medics[i],
                  });
                  notifications.save().then(() => {
                    console.log("new Notification");
                  });
                } else 


                } else {
                let notifications = new Notification({
                 title: `Muy pronto la actividad ${State.Activityname} para ${State.name} ${State.lastname}  `,
                 Content: `Debera de completarse antes del  ${State.DateToComplete} a las ${State.TimeToComplete}`,
                 user_id: Medics[i]
               })
                 notifications.save().then(() => {
                   console.log("new Notification")
                 })
                } */
      /*             let mailOptions = {
                              from: process.env.MESSAGEEMAIL,
                              to: info.email, 
                              to:'antonio.rbarrientos@alumnos.udg.mx',
                              subject: `La actividad ${State.Activityname} vence pronto!!! `,
                              text: `La actividad ${State.Activityname} asignada a ${State.name} ${State.lastname} debera completarse pronto antes del ${State.DateToComplete} a las ${State.TimeToComplete}` ,
                          };   */
      /*      transporter.sendMail(mailOptions, function(error, info){ 
                       if (error) { console.log(error);
                         return res.status(302).json({msg:"Email no validado para usarse con esta aplciacion  habilita https://www.google.com/settings/security/lesssecureapps desabilita Disable Captcha temporarily so you can connect the new device/server - https://accounts.google.com/b/0/displayunlockcaptcha"})
                       } else {console.log('Email sent: ' + info.response); }
                   });   */

      const sendNotification = ({ medic, State }) => {
        console.log(medic);
        switch (State.numbertype) {
          case 1:
            if (State.Status == false) {
              let notifications = new Notification({
                title: `Muy pronto la actividad ${State.Activityname} para ${State.name} ${State.lastname}  `,
                Content: `Debera de completarse antes del  ${State.DateToComplete} a las ${State.TimeToComplete} Es importante que revises tus pies y piernas. El no realizarlo de manera habitual aumenta 68.57% tus posibilidades de desarrollar ulceras que pueden convertirse en lesiones graves. `,
                user_id: medic,
              });
              notifications.save().then(() => {
                console.log("new Notification");
              });
            } else if (State.Status == true) {
              let notifications = new Notification({
                title: `Bien hecho la ${State.Activityname} para ${State.name} ${State.lastname} fue completada exitosamente `,
                Content: `Al revisar tus pies o piernas reduces un 68.57% la probabilidad de desarrollar ulceras `,
                user_id: medic,
              });
              notifications.save().then(() => {
                console.log("new Notification");
              });
            }
            break;
          case 2:
            if ( State.Status == false) {
              let notifications = new Notification({
                title: `Muy pronto la actividad ${State.Activityname} para ${State.name} ${State.lastname}  `,
                Content: `Debera de completarse antes del  ${State.DateToComplete} a las ${State.TimeToComplete} Al no seguir el plan alimenticio indicado aumentas 59.34% tus probabilidades de perder la vista, 84.12% tus probabilidades de un evento de coma diabético y 64.28% tus posibilidades de sufrir un infarto cardiaco. Además, podrías desarrollar otras complicaciones como insuficiencia renal aguda e infarto cerebral. `,
                user_id: Medics[i],
              });
              notifications.save().then(() => {
                console.log("new Notification");
              });
            } else if ( State.Status == true) {
              let notifications = new Notification({
                title: `Bien hecho la ${State.Activityname} para ${State.name} ${State.lastname} fue completada exitosamente `,
                Content: `Siguiendo el plan alimenticio indicado disminuyes 59.34% tus probabilidades de pérdida de la vista, un 84.12% tus posibilidades de un evento de coma diabético y 64.28% la probabilidad de un infarto cardiaco. Además, previenes otras complicaciones como insuficiencia renal aguda e infarto cerebral. `,
                user_id: Medics[i],
              });
              notifications.save().then(() => {
                console.log("new Notification");
              });
            }
            break;
          case 3:
            console.log("Bana3 ound.");
            break;
          case 4:
            console.log("Ch400 a pound.");
            break;
          case 5:
            console.log("Che5s are $3.00 a pound.");
            break;
          case 6:
            console.log("M6 are $2.79 a pound.");
            break;
          case 7:
            console.log("M7ayas are $2.79 a pound.");
            break;
          case 8:
            console.log("M8payas are $2.79 a pound.");
            break;
          case 9:
            if (State.Status == false) {
              let notifications = new Notification({
                title: `Muy pronto la actividad ${State.Activityname} para ${State.name} ${State.lastname}  `,
                Content: `Debera de completarse antes del  ${State.DateToComplete} a las ${State.TimeToComplete} El no seguir el tratamiento para el control de tus niveles de tensión arterial de forma adecuada aumenta 69.69% tus posibilidades de sufrir un infarto cerebral.`,
                user_id: medic,
              });
              notifications.save().then(() => {
                console.log("new Notification");
              });
            } else if (State.Status == true) {
              let notifications = new Notification({
                title: `Bien hecho la ${State.Activityname} para ${State.name} ${State.lastname} fue completada exitosamente `,
                Content: `El cumplir de manera adecuada el tratamiento para controlar tus niveles de tensión arterial te ayuda a prevenir un 69.69% la probabilidad de sufrir un infarto cerebral.`,
                user_id: medic,
              });
              notifications.save().then(() => {
                console.log("new Notification");
              });
            }
            break;
          default:
            console.log("fuerra");
        }
      };

      if (ListReminder.length >= 0) {
        for (i = 0; i < ListReminder.length; i++) {
          let info = ListReminder[i].paciente_id;
          let Medics = ListReminder[i].paciente_id.MedicoDeCabecera;
          const State = new Object({
            numbertype: ListReminder[i].numbertype,
            name: info.name,
            lastname: info.lastname,
            email: info.email,
            Activityname: ListReminder[i].Activityname,
            DateToComplete: ListReminder[i].DateToComplete,
            TimeToComplete: ListReminder[i].TimeToComplete,
            Status: ListReminder[i].Status,
          });
        

          if ( ListReminder[i].DateToComplete == today && sTime2 == ListReminder[i].TimeToComplete) {
            Medics.forEach((value, indice) => {
              let medic = value;
              sendNotification({ medic, State });
            });
          }
        }

        /*             console.log("**********************************")
                    console.log("Tiempo 15 MINUTOS ANTES: ",Remember15)
                    console.log("Tiempo comparar dos horas despues pero de la hora de la cita: ",Remember2)
                    console.log("Fecha un dia despues",tomorrow)
                    console.log("**********************************") */
      }
    };

    getAct();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
}
process.on("uncaughtException", function (err) {
  console.log(err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server Activated Correctly"));
