import sys
import pandas as pd
from pandas.core.frame import DataFrame
import pymongo
from pymongo.common import SERVER_SELECTION_TIMEOUT
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import re
from collections import Counter
#from sklearn import metrics
#from sklearn import linear_model
from pymongo import MongoClient
from bson.objectid import ObjectId
client = MongoClient("mongodb+srv://antonio:12345@cluster0.1kyo9.mongodb.net/Modular?retryWrites=true")
db=client.Modular
actividaesList = db["actividades"]
pacientesList = db["pacientes"]
pacienteNotify = db["notificaciones"]

""" OBTENENR INFO PACIENTE """
objInstance = ObjectId(sys.argv[1])
pacienteInfo= pacientesList.find_one({"_id":objInstance}) 

""" print(pacienteInfo.keys()) """
""" print(pacienteInfo.values()) """

altura = int(pacienteInfo.get('altura'))
peso = int(pacienteInfo.get('peso'))
edad = int( pacienteInfo.get('edad'))
Imc = peso/altura
encargado = ObjectId(pacienteInfo.get('Encargado_id'))


owner = sys.argv[1]
HemoglobinaGlucosilada = int(sys.argv[2])

print(owner)
print(HemoglobinaGlucosilada)
print (altura) 
print (peso) 
print(edad) 
print(Imc)   
Microalbuminuria = int(sys.argv[3])
NivelCoresterol = int(sys.argv[4])
NivelTrigliseridos = int(sys.argv[5])
Electrocadriograma = int(sys.argv[6])
Cuerpodano =str(sys.argv[7])
OtrasEnfermedades =str(sys.argv[8])
FactorRiesgo=str(sys.argv[9])
EstadoMental=str(sys.argv[10])
EstatusDental=str(sys.argv[11]) 

if (Imc >= 32 ):
    sobrepeso = 1 
else:
    sobrepeso = 0 

if (NivelCoresterol >= 160 ):
    NivelCoresterol =1
else:
    NivelCoresterol =0

if( NivelTrigliseridos >= 160):
    NivelTrigliseridos = 1
else: 
    NivelTrigliseridos = 0

if(Electrocadriograma >= 100):
    Electrocadriograma = 1
else: 
    Electrocadriograma= 0

fooA = re.search(".*ansiedad$", EstadoMental)
fooB = re.search(".*miedos$", EstadoMental)
fooC = re.search(".*angustia$", EstadoMental)
fooD = re.search(".*preocupacion$", EstadoMental)
fooE = re.search(".*ira$", EstadoMental)
fooF = re.search(".*frustracion$", EstadoMental)
fooG = re.search(".*enojo$", EstadoMental)
fooH = re.search(".*depresion$", EstadoMental)

if( fooA or fooB or fooC or fooD or fooE or fooF or fooG or fooH) :  
    Ansiedad = 1
else: 
    Ansiedad = 0

if (HemoglobinaGlucosilada >= 6):
    GlicosiladaAlta = 1
else:
    GlicosiladaAlta = 0

if(Microalbuminuria >= 200):
    MicroalbuminuriaAlta = 1
else:
    MicroalbuminuriaAlta=0 
     
    
url = 'https://drive.google.com/file/d/1mHtcG9EgL0AWjoRpGoxuMsvkQGgYC0tb/view?usp=sharing'
path = 'https://drive.google.com/uc?export=download&id='+url.split('/')[-2]
datos = pd.read_csv(path)
dataframe = pd.DataFrame(datos)
print(datos) 
X = (dataframe[["sobrepeso","colesterol","Presion","Ansiedad","Glicosilada","Micro","dental"]])
y= (dataframe["Resultado"])
X_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.25,random_state=0)
model = LogisticRegression()
model.fit(X_train,y_train)
#EEJEMPLOs
datanew = {
    'sobrepeso': [sobrepeso],
    'colesterol':[ NivelCoresterol],
    'Presion': [Electrocadriograma],
    'Ansiedad': [Ansiedad],
    'Glicosilada': [ GlicosiladaAlta],
    'Micro': [MicroalbuminuriaAlta],
    'dental': [1]
}
df2 = pd.DataFrame(datanew,columns=[ 
    'sobrepeso',
    'colesterol',
    'Presion',
    'Ansiedad',
    'Glicosilada',
    'Micro',
    'dental' ])
""" df = df2.reset_index()
print(df)   """
prediccion = model.predict(df2)
#print(df2)
#print(prediccion)
if prediccion == 1: 
    print('Tienes Posibilidad de tener un infarto')
    allbad = {"user_id":encargado,"title":"Todo va super mal :C, te he recomendado algunas actividades","Content":"Es importante que acudas con el medico, la enfermedad puede empeorar","Status":"false"}
    x =pacienteNotify.insert_one(allbad).inserted_id 

    if(sobrepeso == 1):
        BadACT = {"Activityname":"Bajar de peso","Content":"Comer mas saludable y hacer ejercicio","DateToComplete":"2021-12-12","TimeToComplete":"12:23","Status":"false","paciente_id":objInstance}
        actividaesList.insert_one(BadACT).inserted_id
    if(NivelCoresterol == 1):
        BadACT = {"Activityname":"Acudir al medico y al nutriologo","Content":"Comer mas saludable y hacer ejercicio","DateToComplete":"2021-12-12","TimeToComplete":"12:23","Status":"false","paciente_id":objInstance}
        actividaesList.insert_one(BadACT).inserted_id
    if(GlicosiladaAlta == 1):
        BadACT = {"Activityname":"Ir medico tienes mayor riesgo de desarrollar complicaciones a largo plazo tales como enfermedad ocular, enfermedad de los riñones o daño a los nervios.","Content":"Comer mas saludable, ir al medico y hacer ejercicio","DateToComplete":"2021-12-12","TimeToComplete":"12:23","Status":"false","paciente_id":objInstance}
        actividaesList.insert_one(BadACT).inserted_id
    if(Electrocadriograma== 1):
        BadACT = {"Activityname":"Podrias bajar el sodio a tu dieta","Content":"Puedes limitar el alcohol, el fumar, cafeina etc","DateToComplete":"2021-12-12","TimeToComplete":"12:23","Status":"false","paciente_id":objInstance}
        actividaesList.insert_one(BadACT).inserted_id
    if(Ansiedad== 1):
        BadACT = {"Activityname":"Tienes sintomas de depresion","Content":"Ve al Psicologo","DateToComplete":"2021-12-12","TimeToComplete":"12:23","Status":"false","paciente_id":objInstance}
        actividaesList.insert_one(BadACT).inserted_id 
    if(MicroalbuminuriaAlta ==1):
        BadACT = {"Activityname":"Sintomas de insuficiencia renal","Content":"Acude al medico lo mas rapido posible","DateToComplete":"2021-11-12","TimeToComplete":"12:23","Status":"false","paciente_id":objInstance}
        actividaesList.insert_one(BadACT).inserted_id 

else :
    print('Vas bien sigue asi') 
    allgood = {"user_id":encargado,"title":"Todo va super Bien","Content":"Continua asi vas mejorando","Status":"false"}
    x =pacienteNotify.insert_one(allgood).inserted_id 
    

    

##print('Correindo FIANL' + sys.argv[1] + '!')
""" print("sobrepeso",sobrepeso)
print("NivelCoresterol",NivelCoresterol)
print("GlicosiladaAlta",GlicosiladaAlta)
print("Electrocadriograma",Electrocadriograma)
print("Ansiedad",Ansiedad)
print("GlicosiladaAlta",GlicosiladaAlta)
print("MicroalbuminuriaAlta",MicroalbuminuriaAlta) """


