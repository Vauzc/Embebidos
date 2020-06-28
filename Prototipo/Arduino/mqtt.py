import paho.mqtt.client as mqtt #instalar paho-mqtt -> install pip paho-mqtt en terminal
import time
import serial                   #instalar pyserial -> install pip pyserial en terminal
#from termcolor import colored # importa colores en terminal
from threading import Thread #para tareas simultaneas


cliente = mqtt.Client() #instancia del cliente mqtt
ser=serial.Serial('/COM5',baudrate=9600,timeout=1) #sustituir /dev/ttyACM0 por puerto arduino


def ante_conexion_exitosa(client, userdata, falgs, rc): #funcion ejecutada por libreria mqtt cuando se conecta
    if rc==0:
        print("conexion exitosa")
    else:
        print ("error de conexión")

def ante_llegada_mensaje(client, userdata, msg): #funcion ejecutada por libreria mqtt cuando llegan mensajes
    lectura=msg.payload.decode("utf-8")          #utf para limpiar caracteres herrados
    topico=msg.topic
    print(lectura + topico)                               #imprime lectura
    ser.write(bytes(lectura,'utf-8')+b'\t'+bytes(topico,'utf-8')+b'\n')      #envia por serial a arduino


cliente.on_connect = ante_conexion_exitosa #indica funcion a ejecutar al conectarse
cliente.on_message = ante_llegada_mensaje #indica funcion a ejecutar al llegar mensaje
cliente.username_pw_set("mqtt","mqtt")  #(usuario,contraseña)
cliente.connect("aulal.org",1883,60)    #(servidor,puerto,keepalive)

cliente.loop_start()                        #inicio de cliente
cliente.subscribe("/TIUN/mesas/#")                #se suscribe a un topic para lectura

while 1:                                    #siempre recibiendo datos
    time.sleep(20)
cliente.loop_stop()
cliente.disconnect()