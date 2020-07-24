#include <WiFiEsp.h>
#include <WiFiEspClient.h>
#include <WiFiEspUdp.h>
#include <PubSubClient.h>
#include "I2Cdev.h"
#include "MPU6050.h"
#if I2CDEV_IMPLEMENTATION == I2CDEV_ARDUINO_WIRE
#include "Wire.h"
#endif
#include <Adafruit_MLX90614.h>
#include "DHT.h"
#ifndef HAVE_HWSERIAL1
#include "SoftwareSerial.h"
SoftwareSerial MySerial(2, 3); // RX, TX
#endif

#define DHTPIN 5 //DHT11을 D5번핀에 연결한다.
#define DHTTYPE DHT11

char ssid[] = "MULTI_GUEST_2"; // your network SSID (name)
char pass[] = "guest1357";     // your network password
const char *mqtt_server = "70.12.229.27";
int status = WL_IDLE_STATUS; // the Wifi radio's status

WiFiEspClient WiFiclient;
PubSubClient client(WiFiclient);

MPU6050 accelgyro(0x68);
DHT dht(DHTPIN, DHTTYPE);

int16_t ax, ay, az;
long beforetime;
long nowtime;
long step4time[4] = {300};
int top = 0;
int steptime;
double sum4steptime;
long beforepublish = -100000;
int Tmax = 20000;
int Tmin = 15000;
int steps;
double P_n = 20000, P_n1 = 20000;
double M_n = 15000, M_n1 = 15000;
double Energy;
double K;
bool flag = true;
char msg[100];
String packet;
#define OUTPUT_READABLE_ACCELGYRO

int cntnum = 0;
float Humi = 0, Temp = 0;

int gas_sensor = A1;
float R0 = 11.820; //Sensor Resistance in fresh air from previous code
float m = -0.318;
float b = 1.133;
float sensor_volt; //Define variable for sensor voltage
float RS_gas;      //Define variable for sensor resistance
float ratio;       //Define variable for ratio
float sensorValue;
double ppm_log;
double ppm;

//비접촉 온도센서
Adafruit_MLX90614 mlx = Adafruit_MLX90614(0X5A);
float objectTemp;

//심박센서
//int pulsePin = 0;  // Pulse Sensor purple wire connected to analog pin 0
//int blinkPin = 13; // pin to blink led at each beat
//int fadePin = 5;   // pin to do fancy classy fading blink at each beat
//int fadeRate = 0;  // used to fade LED on with PWM on fadePin

// Volatile Variables, used in the interrupt service routine!
//volatile int BPM;               // int that holds raw Analog in 0. updated every 2mS
//volatile int Signal;            // holds the incoming raw data
//volatile int IBI = 600;         // int that holds the time interval between beats! Must be seeded!
//volatile boolean Pulse = false; // "True" when User's live heartbeat is detected. "False" when not a "live beat".
//volatile boolean QS = false;    // becomes true when Arduoino finds a beat.

void setupWifi()
{
    MySerial.begin(9600);
    WiFi.init(&MySerial);
    if (WiFi.status() == WL_NO_SHIELD)
    {
        Serial.println("WiFi shield not present");
        // don't continue
        while (true)
            ;
    }

    // attempt to connect to WiFi network
    while (status != WL_CONNECTED)
    {
        Serial.print("Attempting to connect to WPA SSID: ");
        Serial.println(ssid);
        // Connect to WPA/WPA2 network
        status = WiFi.begin(ssid, pass);
    }
    Serial.println(WiFi.localIP());
    Serial.println("You're connected to the network");
}

//print any message received for subscribed topic
void callback(char *topic, byte *payload, unsigned int length)
{
    Serial.print("Message arrived [");
    Serial.print(topic);
    Serial.print("] ");
    for (int i = 0; i < length; i++)
    {
        Serial.print((char)payload[i]);
    }
    Serial.println();
}

void reconnect()
{
    // Loop until we're reconnected
    while (!client.connected())
    {
        Serial.print("Attempting MQTT connection...");
        // Attempt to connect, just a name to identify the client
        if (client.connect("arduinoClient"))
        {
            Serial.println("connected");
            // Once connected, publish an announcement...
            client.publish("command", "hello world");
            // ... and resubscribe
            client.subscribe("presence");
        }
        else
        {
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
// join I2C bus (I2Cdev library doesn't do this automatically)
#if I2CDEV_IMPLEMENTATION == I2CDEV_ARDUINO_WIRE
    Wire.begin();
#elif I2CDEV_IMPLEMENTATION == I2CDEV_BUILTIN_FASTWIRE
    Fastwire::setup(400, true);
#endif

    Serial.begin(9600);

    setupWifi();
    client.setServer(mqtt_server, 1883);
    client.setCallback(callback);

    dht.begin();
    pinMode(gas_sensor, INPUT);

    //pinMode(blinkPin, OUTPUT); // pin that will blink to your heartbeat!
    //pinMode(fadePin, OUTPUT);  // pin that will fade to your heartbeat!
    //interruptSetup();          // sets up to read Pulse Sensor signal every 2mS
    mlx.begin();

    // initialize device
    Serial.println("Initializing I2C devices...");
    accelgyro.initialize();

    // verify connection
    Serial.println("Testing device connections...");
    Serial.println(accelgyro.testConnection() ? "MPU6050 connection successful" : "MPU6050 connection failed");

    beforepublish = millis();
}

void mqtt_publish(float Humi, float Temp, double ch4, double objectTemp, int stepnum)
{
    if (!client.connected())
    {
        reconnect();
    }
    client.loop();

     //packet = String(Humi) + " " + String(Temp) + " " + String(ch4) + " " + String(objectTemp) + " " + String(stepnum);
    packet=String(Humi) + " " + String(Temp) + " " + String(ch4);
    //문자열과 숫자를 합친다.
    packet.toCharArray(msg, 100);
    //mqtt publishing이 char형으로만 보낼 수 있기때문에 toCharArray로 변환한다.
    Serial.print("Publish message: ");
    Serial.println(msg);
    client.publish("barn", msg);
    packet=String(objectTemp)+" "+String(stepnum);
    packet.toCharArray(msg,100);
    client.publish("cow",msg);

}

void loop()
{
    nowtime = millis();
 
    accelgyro.getAcceleration(&ax, &ay, &az);
    Energy = sqrt(1.0 * ax * ax + 1.0 * ay * ay + 1.0 * az * az);
    if (nowtime-beforetime>=250&&Energy >= Tmax && flag)
    {
        steps++;
        flag = false;
        sum4steptime = sum4steptime - step4time[top];
        steptime = nowtime - (top == 0 ? step4time[3] : step4time[top - 1]);
        step4time[top++] = steptime;
        sum4steptime += steptime;
        if (steptime >= 1.8 * sum4steptime / 4)
        {
            steps++;
            step4time[top - 1] = steptime / 2;
        }
        if (top == 4)
            top = 0;
        P_n1 = P_n;
        P_n = Energy;
        //Serial.print(steps);Serial.print('\t');
        //Serial.print(nowtime);Serial.print('\t');
        //Serial.print(ax);Serial.print('\t');
        //Serial.print(ay);Serial.print('\t');
        //Serial.print(az);Serial.print('\t');
        //Serial.println(Energy);
        beforetime = nowtime;
        K = min(P_n1, P_n);
        Tmin = max(15000, (M_n + M_n1) / 2 + ((K - (M_n + M_n1) / 2) * 0.3));
        Tmax = max(20000, Tmin + (sqrt(abs(K - Tmin)) * 3.4));
    }
    if (Energy > P_n){
        P_n = Energy;
        beforetime = nowtime;
    }
    if (Energy < Tmin && !flag)
    {
        M_n1 = M_n;
        M_n = Energy;
        flag = true;
    }
    if (Energy < M_n)
        M_n = Energy;

    if (nowtime - beforepublish >= 60000)
    {
        cntnum++;
        beforepublish = nowtime;
        Humi += dht.readHumidity();
        Temp += dht.readTemperature();
        sensorValue = analogRead(gas_sensor);
        sensor_volt = sensorValue * (5.0 / 1023.0);   //Convert analog values to voltage
        RS_gas = ((5.0 * 10.0) / sensor_volt) - 10.0; //Get value of RS in a gas
        ratio = RS_gas / R0;                          // Get ratio RS_gas/RS_air
        ppm_log = (log10(ratio) - b) / m;            //Get ppm value in linear scale according to the the ratio value
        ppm += pow(10, ppm_log);
        //Serial.print(Humi);Serial.print("\t");
        //Serial.println(Temp);

        objectTemp += mlx.readObjectTempC();
        Serial.print(Humi/cntnum);Serial.print('\t');
        Serial.print(Temp/cntnum);Serial.print('\t');
        Serial.println(nowtime);
        //Serial.println(BPM);

        if (cntnum == 5)
        {
            cntnum = 0;

            


            mqtt_publish(Humi / 5, Temp / 5, ppm/5, objectTemp / 5, steps);
            Humi = 0;
            Temp = 0;
            ppm = 0;
            objectTemp = 0;
        }
    }

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
