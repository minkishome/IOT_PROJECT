#include <WiFiEsp.h>
#include <WiFiEspClient.h>
#include <WiFiEspUdp.h>
#include <PubSubClient.h>
#include "I2Cdev.h"
#include "MPU6050.h"
#if I2CDEV_IMPLEMENTATION == I2CDEV_ARDUINO_WIRE
    #include "Wire.h"
#endif


#ifndef HAVE_HWSERIAL1
#include "SoftwareSerial.h"
SoftwareSerial MySerial(2, 3); // RX, TX
#endif

char ssid[] = "MULTI_GUEST_2";            // your network SSID (name)
char pass[] = "guest1357";        // your network password
const char* mqtt_server="70.12.229.27";
int status = WL_IDLE_STATUS;     // the Wifi radio's status

WiFiEspClient WiFiclient;
PubSubClient client(WiFiclient);

MPU6050 accelgyro(0x68);
int16_t ax, ay, az;
long long beforetime;
long long nowtime;
long long step4time[4]={300};
int top=0;
int steptime;
double sum4steptime;
long long beforepublish;
int Tmax=20000;
int Tmin=15000;
int steps;
double P_n=20000,P_n1=20000;
double M_n=15000,M_n1=15000;
double Energy;
double K;
bool flag=true;
char msg[50];
String packet;
#define OUTPUT_READABLE_ACCELGYRO


void setupWifi(){
    MySerial.begin(9600);
    WiFi.init(&MySerial);
      if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    // don't continue
    while (true);
  }

  // attempt to connect to WiFi network
  while ( status != WL_CONNECTED) {
    Serial.print("Attempting to connect to WPA SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network
    status = WiFi.begin(ssid, pass);
  }
  Serial.println(WiFi.localIP());
  Serial.println("You're connected to the network");
}

//print any message received for subscribed topic
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i=0;i<length;i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect, just a name to identify the client
    if (client.connect("arduinoClient")) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish("command","hello world");
      // ... and resubscribe
      client.subscribe("presence");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {
    // join I2C bus (I2Cdev library doesn't do this automatically)
    #if I2CDEV_IMPLEMENTATION == I2CDEV_ARDUINO_WIRE
        Wire.begin();
    #elif I2CDEV_IMPLEMENTATION == I2CDEV_BUILTIN_FASTWIRE
        Fastwire::setup(400, true);
    #endif

    Serial.begin(9600);

    setupWifi();
    client.setServer(mqtt_server,1883);
    client.setCallback(callback);
    // initialize device
    Serial.println("Initializing I2C devices...");
    accelgyro.initialize();
  
    // verify connection
    Serial.println("Testing device connections...");
    Serial.println(accelgyro.testConnection() ? "MPU6050 connection successful" : "MPU6050 connection failed");
    char temptemp[1];
    client.publish("이제 시작",temptemp);

    beforepublish=millis();
}

void mqtt_publish(int stepnum){
    if(!client.connected()){
      reconnect();
    }
    packet = String(stepnum);
    //문자열과 숫자를 합친다.
    packet.toCharArray(msg, 50); 
    //mqtt publishing이 char형으로만 보낼 수 있기때문에 toCharArray로 변환한다.
    Serial.print("Publish message: ");
    Serial.println(msg);
    client.publish("Calibration", msg);

}

void loop() {

    accelgyro.getAcceleration(&ax, &ay, &az);
    Energy=sqrt( 1.0*ax*ax+1.0*ay*ay+1.0*az*az);
    nowtime=millis();
    Serial.print(Energy);
    Serial.print('\t');
    if(Energy>=Tmax&&flag){
        steps++;
        flag=false;
        sum4steptime=sum4steptime-step4time[top];
        steptime=nowtime-(top==0?step4time[3]:step4time[top-1]);
        step4time[top++]=steptime;
        sum4steptime+=steptime;
        if(steptime>=1.8*sum4steptime/4){
            steps++;
            step4time[top-1]=steptime/2;
        }
        if(top==4)
            top=0;
        P_n1=P_n;
        P_n=Energy;
        
        beforetime=nowtime;
        K=min(P_n1,P_n);
        Tmin=max(15000,(M_n+M_n1)/2+((K-(M_n+M_n1)/2)*0.3));
        Tmax=max(20000,Tmin+(sqrt(abs(K-Tmin))*3.4));
    }
    if(Energy>P_n)
        P_n=Energy;
    if(Energy<Tmin&&!flag){
        M_n1=M_n;
        M_n=Energy;
        flag=true;
    }
    if(Energy<M_n)
        M_n=Energy;
    
    if(nowtime-beforepublish>=1000){
      mqtt_publish(steps);
      beforepublish=nowtime;
    }
    
    Serial.println(steps);
/*
    #ifdef OUTPUT_READABLE_ACCELGYRO
        Serial.print("a/g:\t");
        Serial.print(ax); Serial.print("\t");
        Serial.print(ay); Serial.print("\t");
        Serial.print(az); Serial.print("\t");
        Serial.println(Energy);
        delay(1000);
    #endif
*/
}
