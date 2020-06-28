#include <WiFi.h>
#include <PubSubClient.h>
#include "DHTesp.h"
#include <stdlib.h>
#include <SPI.h>
#include <MFRC522.h>
#include <base64.h>
#include <Ethernet.h>

#define RST_PIN         22          // Configurable, see typical pin layout above
#define SS_PIN          21         // Configurable, see typical pin layout above

MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance

 
const char* ssid = "Casa Castesblanco";
const char* password =  "TUTANCHIK7799_";
const char* mqttServer = "aulal.org";
const int mqttPort = 1883;
const char* mqttUser = "mqtt";
const char* mqttPassword = "mqtt";
 
WiFiClient espClient;
PubSubClient client(espClient);


void setup_wifi() {
  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}



void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i=0;i<length;i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
  if(String(topic)=="/TIUN/mesas/esp/"){
    String input= String ((char *)payload);
    char *s;
    char *mesa;
    char *estado;
    char *reserva;
    char *fin_res;
    char *hor_act;
    s = strtok((char *)payload, ",");
    mesa=s;
    s = strtok(NULL, ",");
    estado=s;
    s = strtok(NULL, ",");
    reserva=s;
    s = strtok(NULL, ",");
    fin_res=s;
    s = strtok(NULL, ",");
    hor_act=s;
    String out_n= String(mesa);
    out_n.concat(",");
    String out_lcd;
    String est_out;
    if(String(estado)=="null"){
      char *act=hor_act;
      char *res=reserva;
      act = strtok(act, ":");
      res = strtok(res, ":");
      int act_2 =atoi(act);
      int res_2 = atoi(res);
      if(res_2 > act_2){
        est_out="2";
        char *hor=hor_act;
        String dis_1="Proxima reserva a las: ";
        dis_1.concat(String(reserva));
        dis_1.concat(":00:00");
        String dis_2="Mesa libre";
        hor = strtok(hor, ":");
        String dis_3="Pasa tu TIUN por el lector";
        String dis_4="Reserva hasta las: ";
        dis_4.concat(hor);
        dis_4.concat(":59:59");
        dis_1.concat(",");
        dis_1.concat(dis_2);
        dis_1.concat(",");
        dis_1.concat(dis_3);
        dis_1.concat(",");
        dis_1.concat(dis_4);
        // dis_1.concat(",");
        out_lcd=dis_1;
      }else{
        est_out="3";
        String res_1="Esperando confirmacion de reserva con TIUN";
        String res_2="Pasa tu TIUN por el lector";
        res_1.concat(",");
        res_1.concat(res_2);
        out_lcd=res_1;
      }
      
    }else if(String(estado)=="0"){
      char *hor=hor_act;
      String dis_1="Proxima reserva a las: ";
      dis_1.concat(String(reserva));
      String dis_2="Mesa libre";
      hor = strtok(hor, ":");
      String dis_3="Pasa tu TIUN por el lector";
      String dis_4="Reserva hasta las: ";
      dis_4.concat(hor);
      dis_4.concat(":59:59");
      dis_1.concat(",");
      dis_1.concat(dis_2);
      dis_1.concat(",");
      dis_1.concat(dis_3);
      dis_1.concat(",");
      dis_1.concat(dis_4);
      // dis_1.concat(",");
      out_lcd=dis_1;
      est_out=estado;
    }else if(String(estado)=="1"){
      String ocu_1="Mesa ocupada hasta: ";
      ocu_1.concat(fin_res);
      out_lcd=ocu_1;
      est_out=estado;
    }else{
      out_lcd="Error";
    }
    char output_lcd[100];
    out_lcd.toCharArray(output_lcd,100);
    out_n.concat(est_out);
    char output_n[50];
    out_n.toCharArray(output_n,50);
    if(String(mesa)=="2"){                                                                           //mesa
      client.publish("/TIUN/mesas/lcd/",output_lcd);
    }
    client.publish("/TIUN/mesas/nexys/",output_n);
    Serial.println(output_lcd);
    Serial.println(output_n);
  }
}



void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("IOT-ESP32", mqttUser, mqttPassword )) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      // client.publish("outTopic","hello world");
      // ... and resubscribe
      client.subscribe("/TIUN/mesas/esp/");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup()
{
  Serial.begin(115200);

  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);

  setup_wifi();
  // Allow the hardware to sort itself out
  delay(1500);
  SPI.begin();                                                  // Init SPI bus
  mfrc522.PCD_Init();                                              // Init MFRC522 card
  Serial.println(F("Read personal data on a MIFARE PICC:"));    //shows in serial that it is ready to read
}

void loop()
{
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  MFRC522::MIFARE_Key key;
  for (byte i = 0; i < 6; i++) key.keyByte[i] = 0xFF;

  //some variables we need
  byte block;
  byte len;
  MFRC522::StatusCode status;

  //-------------------------------------------

  // Look for new cards
  if ( ! mfrc522.PICC_IsNewCardPresent()) {
    return;
  }

  // Select one of the cards
  if ( ! mfrc522.PICC_ReadCardSerial()) {
    return;
  }

  Serial.println(F("**Card Detected:**"));

  //-------------------------------------------

  mfrc522.PICC_DumpDetailsToSerial(&(mfrc522.uid)); //dump some details about the card

  //mfrc522.PICC_DumpToSerial(&(mfrc522.uid));      //uncomment this to see all blocks in hex

  //-------------------------------------------

  Serial.print(F("Name: "));

  byte buffer1[18];

  block = 4;
  len = 18;

  //------------------------------------------- GET FIRST NAME
  status = mfrc522.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, 4, &key, &(mfrc522.uid)); //line 834 of MFRC522.cpp file
  if (status != MFRC522::STATUS_OK) {
    Serial.print(F("Authentication failed: "));
    Serial.println(mfrc522.GetStatusCodeName(status));
    return;
  }

  status = mfrc522.MIFARE_Read(block, buffer1, &len);
  if (status != MFRC522::STATUS_OK) {
    Serial.print(F("Reading failed: "));
    Serial.println(mfrc522.GetStatusCodeName(status));
    return;
  }

  //PRINT FIRST NAME
  for (uint8_t i = 0; i < 16; i++)
  {
    if (buffer1[i] != 32)
    {
      Serial.write(buffer1[i]);     
    }
  }
  Serial.print("");

  //---------------------------------------- GET LAST NAME

  byte buffer2[18];
  block = 2;

  status = mfrc522.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, 1, &key, &(mfrc522.uid)); //line 834
  if (status != MFRC522::STATUS_OK) {
    Serial.print(F("Authentication failed: "));
    Serial.println(mfrc522.GetStatusCodeName(status));
    return;
  }

  status = mfrc522.MIFARE_Read(block, buffer2, &len);
  if (status != MFRC522::STATUS_OK) {
    Serial.print(F("Reading failed: "));
    Serial.println(mfrc522.GetStatusCodeName(status));
    return;
  }

  //PRINT LAST NAME
  for (uint8_t i = 0; i < 16; i++) {
    Serial.write(buffer2[i]);
  }
  String myString= String ((char *)buffer2);
  String inicio ="[{\"nombre\":\"";
  String coma ="\",\"mesa\":2}]";                                                                           //mesa
  inicio.concat(myString);
  inicio.concat(coma);
  char out[50];
  inicio.toCharArray(out,50);

  //----------------------------------------

  Serial.println(F("\n**End Reading**\n"));

  delay(1000); //change value if you want to read cards faster

  mfrc522.PICC_HaltA();
  mfrc522.PCD_StopCrypto1();
  Serial.println(out);
  client.publish("/TIUN/mesas/reservas/", out); 
  client.endPublish();
}


