const Paciente = require("../Models/PacienteSchema");
const User = require("../Models/UserSchema");
const Expediente = require("../Models/ExpedienteSchema");
/* Encargado_id:req.user.id */
const Notifications = require("../Models/NotificacionesSchema");
const Activities = require('../Models/ActividadesSchema');


const controller = {
    GetPaciente: async (req, res, next) => {
        await Paciente.find({ $or: [{ Encargado_id: req.user.id }, { MedicoDeCabecera: req.user.id }] }).lean().then(paciente => {
            res.json(paciente)
        }).catch(next)
    },
    NewPaciente: async (req, res, next) => {
        const { name, lastname, tel, email, peso, sexo, edad, diabetesTipo, IncioEnfermedad, images, altura } = req.body
        const existeEmail = await Paciente.findOne({ email })
        const existeTel = await Paciente.findOne({ tel })

        if (existeEmail || existeTel) return res.status(302).json({ msg: "Este Usuario ya esta Registrado, con Email o Telefono iguales, Buscalo en la seccion." })

        if (!name || !lastname || !tel || !email || !peso || !sexo || !edad || !diabetesTipo || !IncioEnfermedad || !images || !altura) return res.status(302).json({ msg: "Completa todos los campos." })

        const newPaciente = new Paciente({
            name, lastname, tel, peso, sexo, edad, diabetesTipo, email, altura, images, IncioEnfermedad, Encargado_id: req.user.id, Expediente: {

                Leucocitos: '',
                Eritrocitos: '',
                Hemoglobina: '',
                Hematocrito: '',
                Volumencorpuscularmedio: '',
                HemoglobinaGlucosilada: '',
                Hemoglobinacorpuscularmedia: '',
                Concentracionmediadehemoglobinacorpuscular: '',
                Anchodedistribuciondeeritrocitos: '',
                Plaquetas: '',
                Neutrofilos: '',
                Linfocitos: '',
                Monocitos: '',
                Eosinofilos: '',
                Basofilos: '',
                HemoglobinaglucosiladaHbA1c: '',
                BiometriahematicacompletaBHC: '',
                Gravedadespecifica: '',
                ReaccionPH: '',
                Esterasaleucocitaria: '',
                Nitritos: '',
                Proteinas: '',
                Glucosa: '',
                EritrocitosHb: '',
                Bilirubinas: '',
                Urobilinogeno: '',
                Cetonas: '',
                acidourico: '',
                Creatinina: '',
                NitrogenoureicoBUN: '',
                Urea: '',
                ColesterolHDL: '',
                ColesterolLDL: '',
                Trigliceridos: '',
                Colesteroltotal: '',


            }, Regimen: { Dieta: '', Ejercicios: '' }
        })
        newPaciente.MedicoDeCabecera.push(req.user.id)
        await newPaciente.save().then(() => {
            res.json({ msg: "Nuevo paciente" })
        }).catch(next)

    },
    DeletePaciente: async (req, res, next) => {
        const patient = await Paciente.findById(req.params.id).select('Encargado_id');

        if (patient.Encargado_id == req.user.id) {
            await Paciente.findByIdAndDelete(req.params.id).then(async () => {
                /*  res.json({msg:"Eliminado"}) */
                await Activities.deleteMany({ paciente_id: req.params.id }).then(() => {
                    res.json({ msg: "Eliminado" })
                }).catch(next)
            }).catch(next)


        } else {
            Paciente.findByIdAndUpdate(
                { _id: req.params.id },
                { $pull: { MedicoDeCabecera: req.user.id } })
                .then(() => {
                    res.json({ msg: "Eliminado" })
                }).catch(next)
        }
    },
    UpdatePaciente: async (req, res, next) => {
        const { name, lastname, tel, email, peso, sexo, edad, diabetesTipo, IncioEnfermedad, images, altura } = req.body;
        if (!name || !lastname || !tel || !email || !peso || !sexo || !edad || !diabetesTipo || !IncioEnfermedad || !images || !altura) return res.status(302).json({ msg: "Completa todos los campos." })

        /* const existeEmail = await Paciente.findOne({email},{_id:req.body._id})
        const existeTel= await Paciente.findOne({tel},{_id:req.body._id}) */

        /*   if (existeEmail || existeTel) return res.status(302).json({msg:"Un paciente ya registro este email o tel."}) */
        await Paciente.findByIdAndUpdate({ _id: req.params.id }, {
            name, lastname, tel, email, peso, sexo, edad, diabetesTipo, IncioEnfermedad, images, altura
        }).then(() => {
            res.json({ msg: `usuario ${name} actualizado` })
        }).catch(next)


    },
    /* DATOS DEL ECXPEDIETN ASI ARRIAB */

    /* GET ALL INFORMATION */
    getExpediente: async (req, res, next) => {
        const infoPaciente = await Paciente.find({ _id: req.params.id }).lean()
        if (!infoPaciente) return res.status(302).json({ msg: "No Existe este paciente." })
        await Paciente.find({ _id: req.params.id }).lean().populate([{ path: 'allExpedientes', model: 'expediente' }, { path: 'allRegimen', model: 'regimen' }]).then(result => {
            res.json(result)
        }).catch(next)
    },
    NewHistorial: async (req, res, next) => {
        /* PYTHON ANALISIS */
        const fields = req.body;
        const owner = req.params.id;
        /* 
        var training = require('../server');
        training.RegresionLogistica({fields,owner})  */

        /* PYTHON ANALISIS */
        const dataExpediente = await Paciente.findById({ _id: req.params.id })

        const newExpediente = new Expediente({

            Leucocitos: req.body.Leucocitos,
            Eritrocitos: req.body.Eritrocitos,
            Hemoglobina: req.body.Hemoglobina,
            Hematocrito: req.body.Hematocrito,
            Volumencorpuscularmedio: req.body.Volumencorpuscularmedio,
            HemoglobinaGlucosilada: req.body.HemoglobinaGlucosilada,
            Hemoglobinacorpuscularmedia: req.body.Hemoglobinacorpuscularmedia,
            Concentracionmediadehemoglobinacorpuscular: req.body.Concentracionmediadehemoglobinacorpuscular,
            Anchodedistribuciondeeritrocitos: req.body.Anchodedistribuciondeeritrocitos,
            Plaquetas: req.body.Plaquetas,
            Neutrofilos: req.body.Neutrofilos,
            Linfocitos: req.body.Linfocitos,
            Monocitos: req.body.Monocitos,
            Eosinofilos: req.body.Eosinofilos,
            Basofilos: req.body.Basofilos,
            HemoglobinaglucosiladaHbA1c: req.body.HemoglobinaglucosiladaHbA1c,
            BiometriahematicacompletaBHC: req.body.BiometriahematicacompletaBHC,
            Gravedadespecifica: req.body.Gravedadespecifica,
            ReaccionPH: req.body.ReaccionPH,
            Esterasaleucocitaria: req.body.Esterasaleucocitaria,
            Nitritos: req.body.Nitritos,
            Proteinas: req.body.Proteinas,
            Glucosa: req.body.Glucosa,
            EritrocitosHb: req.body.EritrocitosHb,
            Bilirubinas: req.body.Bilirubinas,
            Urobilinogeno: req.body.Urobilinogeno,
            Cetonas: req.body.Cetonas,
            acidourico: req.body.acidourico,
            Creatinina: req.body.Creatinina,
            NitrogenoureicoBUN: req.body.NitrogenoureicoBUN,
            Urea: req.body.Urea,
            ColesterolHDL: req.body.ColesterolHDL,
            ColesterolLDL: req.body.ColesterolLDL,
            Trigliceridos: req.body.Trigliceridos,
            Colesteroltotal: req.body.Colesteroltotal,
            Dieta: req.body.Dieta,
            Ejercicios: req.body.Ejercicios,
            StatusViejoExpediente: true,
            //INFORMACION DEL REGIMEN ALIMENTICIO
        })
        dataExpediente.allExpedientes.push(newExpediente)
        dataExpediente.save().then(async () => {
            newExpediente.save();
            await Paciente.findByIdAndUpdate({ _id: req.params.id }, {
                Expediente: {
                    Leucocitos: '', Eritrocitos: '',
                    Hemoglobina: '',
                    Hematocrito: '',
                    Volumencorpuscularmedio: '',
                    HemoglobinaGlucosilada: '',
                    Hemoglobinacorpuscularmedia: '',
                    Concentracionmediadehemoglobinacorpuscular: '',
                    Anchodedistribuciondeeritrocitos: '',
                    Plaquetas: '',
                    Neutrofilos: '',
                    Linfocitos: '',
                    Monocitos: '',
                    Eosinofilos: '',
                    Basofilos: '',
                    HemoglobinaglucosiladaHbA1c: '',
                    BiometriahematicacompletaBHC: '',
                    Gravedadespecifica: '',
                    ReaccionPH: '',
                    Esterasaleucocitaria: '',
                    Nitritos: '',
                    Proteinas: '',
                    Glucosa: '',
                    EritrocitosHb: '',
                    Bilirubinas: '',
                    Urobilinogeno: '',
                    Cetonas: '',
                    acidourico: '',
                    Creatinina: '',
                    NitrogenoureicoBUN: '',
                    Urea: '',
                    ColesterolHDL: '',
                    ColesterolLDL: '',
                    Trigliceridos: '',
                    Colesteroltotal: '',
                },
                Regimen: {
                    Dieta: '', Ejercicios: ''
                }
            })
            return res.json("El expediente se guardo correctamente en en Historial")
        })

        /*        Medico Diabetólogo/Endocrinólogo  
        Medico oftalmólogo
        Angiólogo
        Cardiólogo
        Odontólogo
        Nutriólogo  */
        var Activityname = ''
        var Content = ''
        var DateToComplete = ''
        var TimeToComplete = ''
        var numbertype = 0

        Activityname = 'Revisar pies'
        Content = 'Revisa tus pies y piernas en búsqueda de lesiones o alteraciones en la piel'
        DateToComplete = '01/03/2021'
        TimeToComplete = '00:00'
        numbertype = 1

        let newActivitiy1 = new Activities({
            Activityname: Activityname,
            Content: Content,
            DateToComplete: DateToComplete,
            TimeToComplete: TimeToComplete,
            numbertype: numbertype,
            paciente_id: req.params.id
        })
        await newActivitiy1.save()


        Activityname = 'Ir con el nutriologo'
        Content = 'Seguir el plan alimenticio indicado por el especialista'
        DateToComplete = '01/03/2021'
        TimeToComplete = '00:00'
        numbertype = 2

        let newActivitiy2= new Activities({
            Activityname: Activityname,
            Content: Content,
            DateToComplete: DateToComplete,
            TimeToComplete: TimeToComplete,
            numbertype: numbertype,
            paciente_id: req.params.id
        })
        await newActivitiy2.save()


        Activityname = 'Control de aspirina'
        Content = 'Tomar una aspirina diaria'
        DateToComplete = '01/03/2021'
        TimeToComplete = '00:00'
        numbertype = 3

        let newActivitiy3 = new Activities({
            Activityname: Activityname,
            Content: Content,
            DateToComplete: DateToComplete,
            TimeToComplete: TimeToComplete,
            numbertype: numbertype,
            paciente_id: req.params.id
        })
        await newActivitiy3.save()

        Activityname = 'Control de glucosa'
        Content = 'Llevar a cabo un control adecuado de los niveles de glucosa en la sangre. (Tratamiento indicado por el especialista mediante medicamento o insulina)'
        DateToComplete = '01/03/2021'
        TimeToComplete = '00:00'
        numbertype = 4

        let newActivitiy4 = new Activities({
            Activityname: Activityname,
            Content: Content,
            DateToComplete: DateToComplete,
            TimeToComplete: TimeToComplete,
            numbertype: numbertype,
            paciente_id: req.params.id
        })
        await newActivitiy4.save()

        Activityname = 'Analisis de glucosa en sagre capilar'
        Content = 'Llevar a cabo un control adecuado de los niveles de glucosa en la sangre. (Control mediante análisis habitual de glucosa en sangre capilar)'
        DateToComplete = '01/03/2021'
        TimeToComplete = '00:00'
        numbertype = 5

        let newActivitiy5 = new Activities({
            Activityname: Activityname,
            Content: Content,
            DateToComplete: DateToComplete,
            TimeToComplete: TimeToComplete,
            numbertype: numbertype,
            paciente_id: req.params.id
        })
        await newActivitiy5.save()

        Activityname = 'Control de lipidos'
        Content = 'Evitar el consumo de grasas para controlar los niveles de lípidos en la sangre de forma natural'
        DateToComplete = '01/03/2021'
        TimeToComplete = '00:00'
        numbertype = 6

        let newActivitiy6 = new Activities({
            Activityname: Activityname,
            Content: Content,
            DateToComplete: DateToComplete,
            TimeToComplete: TimeToComplete,
            numbertype: numbertype,
            paciente_id: req.params.id
        })
        await newActivitiy6.save()

        Activityname = 'Control de alcohol'
        Content = 'Evitar el consumo de alcohol'
        DateToComplete = '01/03/2021'
        TimeToComplete = '00:00'
        numbertype = 7

       let  newActivitiy7 = new Activities({
            Activityname: Activityname,
            Content: Content,
            DateToComplete: DateToComplete,
            TimeToComplete: TimeToComplete,
            numbertype: numbertype,
            paciente_id: req.params.id
        })
        await newActivitiy7.save()

        Activityname = 'Control de tabaco'
        Content = 'Evitar el consumo de tabaco'
        DateToComplete = '01/03/2021'
        TimeToComplete = '00:00'
        numbertype = 8

        let newActivitiy8 = new Activities({
            Activityname: Activityname,
            Content: Content,
            DateToComplete: DateToComplete,
            TimeToComplete: TimeToComplete,
            numbertype: numbertype,
            paciente_id: req.params.id
        })
        await newActivitiy8.save()

        Activityname = 'Control de tension arterial'
        Content = 'Seguir el tratamiento para el control de los niveles de tensión arterial con medicamentos (Para pacientes hipertensos)'
        DateToComplete = '01/03/2021'
        TimeToComplete = '00:00'
        numbertype = 9

      let newActivitiy9 = new Activities({
            Activityname: Activityname,
            Content: Content,
            DateToComplete: DateToComplete,
            TimeToComplete: TimeToComplete,
            numbertype: numbertype,
            paciente_id: req.params.id
        })
        await newActivitiy9.save()



        


        let newNoti = new Notifications({
            title: `Nuevas Actividades Generadas  `,
            Content: `Se han agregado nuevas actividades al paciente ${dataExpediente.name}`,
            user_id: req.user.id,
        })
        newNoti.save().then(() => {
            console.log("new Notification")
        })

    },

    /* CREATE REGIMEN */
    createRegimen: async (req, res, next) => {
        const { Dieta, Ejercicios } = req.body;
        const newRegimen = {
            Dieta, Ejercicios, paciente_id: req.params.id
        };
        await Paciente.findByIdAndUpdate({ _id: req.params.id }, {
            Regimen: newRegimen
        }).catch(next)
        return res.json({ msg: "Regimen Creado Exitosamente" })


    },


    /* Actaual EXPEDIENTE */
    CreateExpediente: async (req, res, next) => {
        const { Leucocitos, Eritrocitos,
            Hemoglobina,
            Hematocrito,
            Volumencorpuscularmedio,
            HemoglobinaGlucosilada,
            Hemoglobinacorpuscularmedia,
            Concentracionmediadehemoglobinacorpuscular,
            Anchodedistribuciondeeritrocitos,
            Plaquetas,
            Neutrofilos,
            Linfocitos,
            Monocitos,
            Eosinofilos,
            Basofilos,
            HemoglobinaglucosiladaHbA1c,
            BiometriahematicacompletaBHC,
            Gravedadespecifica,
            ReaccionPH,
            Esterasaleucocitaria,
            Nitritos,
            Proteinas,
            Glucosa,
            EritrocitosHb,
            Bilirubinas,
            Urobilinogeno,
            Cetonas,
            acidourico,
            Creatinina,
            NitrogenoureicoBUN,
            Urea,
            ColesterolHDL,
            ColesterolLDL,
            Trigliceridos,
            Colesteroltotal,
            Dieta,
            Ejercicios } = req.body;

        const newExpediente = new Expediente({
            Leucocitos, Eritrocitos,
            Hemoglobina,
            Hematocrito,
            Volumencorpuscularmedio,
            HemoglobinaGlucosilada,
            Hemoglobinacorpuscularmedia,
            Concentracionmediadehemoglobinacorpuscular,
            Anchodedistribuciondeeritrocitos,
            Plaquetas,
            Neutrofilos,
            Linfocitos,
            Monocitos,
            Eosinofilos,
            Basofilos,
            HemoglobinaglucosiladaHbA1c,
            BiometriahematicacompletaBHC,
            Gravedadespecifica,
            ReaccionPH,
            Esterasaleucocitaria,
            Nitritos,
            Proteinas,
            Glucosa,
            EritrocitosHb,
            Bilirubinas,
            Urobilinogeno,
            Cetonas,
            acidourico,
            Creatinina,
            NitrogenoureicoBUN,
            Urea,
            ColesterolHDL,
            ColesterolLDL,
            Trigliceridos,
            Colesteroltotal,
            Dieta,
            Ejercicios,
            paciente_id: req.params.id
        });
        await Paciente.findByIdAndUpdate({ _id: req.params.id }, {
            Expediente: newExpediente
        }).catch(next)
        return res.json({ msg: "Expediente Creado Exitosamente" })
    },
    DeleteExpediente: async (req, res, next) => {
        await Expediente.findByIdAndRemove({ _id: req.params.id }).then(() => {
            res.json({ msg: "Expediente Elminado" })
        }).catch(next)
    },
    /* Agregar PACIENTE */
    addCopy: async (req, res, next) => {
        const { pacienteAdd } = req.body
        const alreadyCopy = await Paciente.find({ Encargado_id: req.user.id, _id: pacienteAdd })
        const paciente = await Paciente.findById({ _id: pacienteAdd })
        const alreadyMedic = await Paciente.find({ _id: pacienteAdd, MedicoDeCabecera: req.user.id })
        if (alreadyCopy.length === 0 && alreadyMedic.length === 0) {
            paciente.MedicoDeCabecera.push(req.user.id)
            paciente.save()
            res.json({ msg: "Paciente Agregado Exitosamente" })
        } else {
            return res.status(302).json({ msg: "Este Paciente ya ha sido Agregado" })
        }
    },
    /* Agergar expediente */
    /* Notification */
    getNotificacion: async (req, res, next) => {
        const allNotification = await Notifications.find({ user_id: req.user.id }).lean()
        res.json({
            data: allNotification,
            sizeNoti: allNotification.length
        })

    },
    deleteNotifications: async (req, res, next) => {
        await Notifications.findByIdAndRemove({ _id: req.params.id }).then(() => {
            res.json({ msg: "Notificacion Elminado" })
        }).catch(next)
    }

}
module.exports = controller

