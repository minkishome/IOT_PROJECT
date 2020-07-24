int ch4_din=9;
int ch4_ain=A1;
int ch4_value=0;


void setup() {
  pinMode(ch4_din,INPUT);
  pinMode(ch4_ain,INPUT);
  Serial.begin(9600);

}

void loop() {
  ch4_value=analogRead(ch4_ain);
  ch4_din=digitalRead(ch4_din);
  Serial.println(ch4_din);
  Serial.println(ch4_value);
  delay(1000);
}
