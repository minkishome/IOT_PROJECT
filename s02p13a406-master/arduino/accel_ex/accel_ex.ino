#include<Wire.h>

const int MPU=0x69;  //MPU 6050 의 I2C 기본 주소
int64_t AcX,AcY,AcZ,E;
int16_t Tmp;
void print_int64_t(int64_t num) {

  char rev[128]; 
  char *p = rev+1;

  while (num > 0) {
    *p++ = '0' + ( num % 10);
    num/= 10;
  }
  p--;
  /*Print the number which is now in reverse*/
  while (p > rev) {
    Serial.print(*p--);
  }
}
void setup(){
  Wire.begin();      //Wire 라이브러리 초기화
  Wire.beginTransmission(MPU); //MPU로 데이터 전송 시작
  Wire.write(0x6B);  // PWR_MGMT_1 register
  Wire.write(0);     //MPU-6050 시작 모드로
  Wire.endTransmission(true); 
  Serial.begin(9600);
}

void loop(){
  Wire.beginTransmission(MPU);    //데이터 전송시작
  Wire.write(0x3B);               // register 0x3B (ACCEL_XOUT_H), 큐에 데이터 기록
  Wire.endTransmission(false);    //연결유지
  Wire.requestFrom(MPU,14,true);  //MPU에 데이터 요청
  //데이터 한 바이트 씩 읽어서 반환
  AcX=Wire.read()<<8|Wire.read();  // 0x3B (ACCEL_XOUT_H) & 0x3C (ACCEL_XOUT_L)    
  AcY=Wire.read()<<8|Wire.read();  // 0x3D (ACCEL_YOUT_H) & 0x3E (ACCEL_YOUT_L)
  AcZ=Wire.read()<<8|Wire.read();  // 0x3F (ACCEL_ZOUT_H) & 0x40 (ACCEL_ZOUT_L)
  Tmp=Wire.read()<<8|Wire.read();  // 0x41 (TEMP_OUT_H) & 0x42 (TEMP_OUT_L)
  E=(AcX*AcX+AcY*AcY+AcZ*AcZ);
  
  //시리얼 모니터에 출력
  Serial.print("AcX = "); print_int64_t(AcX);
  Serial.print(" | AcY = "); print_int64_t(AcY);
  Serial.print(" | AcZ = "); print_int64_t(AcZ);
  Serial.print(" | Tmp = "); Serial.print(Tmp/340.00+36.53);  
  Serial.print(" | Energy = "); print_int64_t(E); 
  Serial.println(); 
  delay(333);
}
