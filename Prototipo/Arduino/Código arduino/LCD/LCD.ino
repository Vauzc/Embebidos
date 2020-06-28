#include  <Wire.h>
#include  <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x3f, 16, 2);


int screenWidth = 16;
int screenHeight = 16;
int stringStart, stringStop = 0;
int scrollCursor = screenWidth;


void setup() {
  Serial.begin(9600);
  lcd.init();
  lcd.backlight();
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Reserva de mesas"); // Mensaje a despegar
}

void loop() {
  String a = Serial.readStringUntil('\n');
  String detec1 = getValue(a, '\t', 0);
  String detec2 = getValue(a, '\t', 1);
  if (detec2 == "/TIUN/mesas/lcd/") {
    String men1 = getValue(detec1, ',', 0);
    String men2 = getValue(detec1, ',', 1);
    String men3 = getValue(detec1, ',', 2) + ' ' + ' ';
    String men4 = getValue(detec1, ',', 3) + ' ';
    String men11 = getValue(men1, ':', 0);
    String men12 = getValue(men1, ':', 1) + ':' + getValue(men1, ':', 2) + ':' + getValue(men1, ':', 3);
    if (men1 != "Esperando confirmacion de reserva con TIUN" && detec1 != men1 ) {
      if(getValue(men1, ':', 1)=="null"){
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print(men11);
      lcd.setCursor(0, 1);
      lcd.print(men12);
      delay(3000);
      }
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print(men2);
      delay(6000);
      lcd.clear();
      for (int i = 0; i < 48; i++) {
        lcd.setCursor(scrollCursor, 0);
        lcd.print(men3.substring(stringStart, stringStop));
        lcd.setCursor(scrollCursor, 1);
        lcd.print(men4.substring(stringStart, stringStop));
        delay(350);
        if (stringStart == 0 && scrollCursor > 0) {
          scrollCursor--;
          stringStop++;
        } else if (stringStart == stringStop) {
          stringStart = stringStop = 0;
          scrollCursor = screenWidth;
        } else if (stringStop == men4.length() && scrollCursor == 0 ) {
          stringStart++;
        } else {
          stringStart++;
          stringStop++;
        }
      }
      lcd.clear();
    } else if (detec1 == men1) {
      String men1 = getValue(detec1, ':', 0);

      if (men1 == "Mesa ocupada hasta") {
        String men2 = getValue(detec1, ':', 1) + ':' + getValue(detec1, ':', 2);
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("Mesa ocupada");
        lcd.setCursor(0, 1);
        lcd.print(" hasta " + men2);
        delay(3000);
      }
    } else if (men1 == "Esperando confirmacion de reserva con TIUN") {
      String men4 = "Esperando";
      String men5 = "    confirmacion";
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print(men4);
      lcd.setCursor(0, 1);
      lcd.print(men5);
      delay(3000);

    }
  }
  

}



/////Funciones/////////////////////////////////////////////
///////////////////////////////////////////////////////////


String getValue(String data, char separator, int index)
{
  int found = 0;
  int strIndex[] = {0, -1};
  int maxIndex = data.length() - 1;

  for (int i = 0; i <= maxIndex && found <= index; i++) {
    if (data.charAt(i) == separator || i == maxIndex) {
      found++;
      strIndex[0] = strIndex[1] + 1;
      strIndex[1] = (i == maxIndex) ? i + 1 : i;
    }
  }

  return found > index ? data.substring(strIndex[0], strIndex[1]) : "";
}
