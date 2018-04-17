//Author: Michael Goberling
//Date: 4/12/18
//Content: Graphical Display development

// Program includes and libraries 

#include <Arduino.h>
#include <Adafruit_GFX.h>    
#include <SPI.h>
#include <Adafruit_ILI9341.h>
#include "TouchScreen.h"
#include <Fonts/FreeSans12pt7b.h>
#include "ChRt.h"

static THD_WORKING_AREA(waTh_touch_event, 100);
static THD_WORKING_AREA(waTh_touch_check, 100);
static THD_WORKING_AREA(waTh_adc_sample, 100);
static THD_WORKING_AREA(waTh_system_monitor, 64);

#define adc_pin_bat A0
#define adc_pin_flex A6

// These are the four touchscreen analog pins
#define YP A2  // must be an analog pin, use "An" notation!
#define XM A3  // must be an analog pin, use "An" notation!
#define YM 5   // can be a digital pin
#define XP 4   // can be a digital pin

#define scheme_green        0x9E66
#define scheme_olive_green  0x6C64
#define scheme_orange       0xED40
#define scheme_brown        0xFD40
#define scheme_black        0x0841
#define scheme_white        0xEF7D

// This is calibration data for the raw touch data to the screen coordinates
#define TS_MINX 150
#define TS_MINY 120
#define TS_MAXX 920
#define TS_MAXY 940

#define MINPRESSURE 3
#define MAXPRESSURE 1000

// The display uses hardware SPI, plus #9 & #10
#define screen_CS 10
#define screen_DC 9
Adafruit_ILI9341 screen = Adafruit_ILI9341(screen_CS, screen_DC);

// For better pressure precision, we need to know the resistance
// between X+ and X- Use any multimeter to read it
// For the one we're using, its 300 ohms across the X plate
TouchScreen ts = TouchScreen(XP, YP, XM, YM, 300);

// Struct to take in x, y, z, and touch flag for touchscreen
struct touch_data {
  uint16_t x;
  uint16_t y;
  uint16_t z;
  bool touch_flag;

  float temp_sample;
  float angle;
  float last_angle;
};

static THD_FUNCTION(touch_event, arg)
{
  touch_data *thisData = (touch_data*)arg;
  
  while(1)
  {
    TSPoint p = ts.getPoint();
      
    if(p.z < MINPRESSURE || p.z > MAXPRESSURE)
    {
      chThdSleepMilliseconds(100);
    }
    else
    {
      thisData->touch_flag = true;
      thisData->x = map(p.x, TS_MINX, TS_MAXX, 0, screen.width());
      thisData->y = map(p.y, TS_MINY, TS_MAXY, 0, screen.height());
      thisData->z = p.z;
    }
  }
}


static THD_FUNCTION(touch_check, arg)
{
  
  touch_data *thisData = (touch_data*)arg;
  
  while(1)
  { 
    if(!thisData->touch_flag)
    {
      chThdSleepMilliseconds(100);
    }
    else
    {
      thisData->touch_flag = false;
      
      if(thisData->x > 40 && thisData->x < 140 && thisData->y > 4 && thisData->y < 80)
      {

        Serial.print(":");
        Serial.print((unsigned int)156*thisData->angle);
        Serial.print("y");

        screen.fillRoundRect(75, 160, 100, 60, 10, scheme_orange);
        
        screen.setTextColor(scheme_black);
        screen.setTextSize(2);
        screen.setCursor(75, 200);
        screen.print((unsigned int)(156*thisData->angle));
      }
    }
  }
}

static THD_FUNCTION(adc_sample, arg)
{
  touch_data *thisData = (touch_data*)arg;
  
  while(1)
  {
    
    thisData->temp_sample = analogRead(adc_pin_flex);
    thisData->temp_sample *= 3.3;
    thisData->angle = thisData->temp_sample/1024;

    if(!(thisData->angle == thisData->last_angle))
    {
        screen.fillRoundRect(75, 30, 100, 60, 10, scheme_orange);
        
        screen.setTextColor(scheme_black);
        screen.setTextSize(2);
        screen.setCursor(75, 80);
        screen.print((unsigned int)(156*thisData->angle));
        thisData->last_angle = thisData->angle;
    }
    chThdSleepMilliseconds(300);
  }
}

static THD_FUNCTION(system_monitor, arg)
{
  touch_data *thisData = (touch_data*)arg;
  
  while(1)
  {

    /*
    screen.setTextColor(scheme_black);
    screen.setTextSize(1);
    screen.setCursor(220, 160);
    screen.print(analogRead(adc_pin_bat));
    */
    
    
    screen.fillCircle(screen.width() - 300, screen.height() - 230, 5, scheme_orange);
    chThdSleepMilliseconds(50);
    screen.fillCircle(screen.width() - 300, screen.height() - 230, 5, scheme_green);
    chThdSleepMilliseconds(300);
    screen.fillCircle(screen.width() - 300, screen.height() - 230, 5, scheme_orange);
    chThdSleepMilliseconds(50);
    screen.fillCircle(screen.width() - 300, screen.height() - 230, 5, scheme_green);
    chThdSleepMilliseconds(1000);
  }
}

void setup( ) 
{
  
  Serial.begin(9600);
  //Serial.println(F("SGS Firmware Version 0.3"));

  // Standard layout for touchscreen
  screen.begin();
  screen.setRotation(3);
  screen.setFont(&FreeSans12pt7b);
  //Serial.println("Touchscreen enabled");
  

  /*
  screen.fillScreen( scheme_black );

  screen.setCursor(20, 25);
  screen.setTextColor(scheme_white);
  screen.setTextSize(1);
  screen.print("SGS");

  screen.setCursor(20, 50);
  screen.print("Rev. 0.3");

  screen.setCursor(20, 75);
  screen.print("Funded by Trenton Evans");

  screen.setCursor(20, 100);
  
  for(int i = 3; i > 0; i--)
  {
    screen.setCursor(20, 125);
    screen.print("Starting in... ");
    screen.setCursor(150, 125);
    screen.print(i);
    delay(1000);
    screen.fillRect(125, 100, 50, 50, scheme_black);
  }
  */
  
  screen.fillScreen( scheme_white );
  screen.fillRect( 0, 0, 42, screen.height(), scheme_olive_green );
  screen.fillRect( 0, 0, screen.width()/8, screen.height(), scheme_green );

  screen.fillRoundRect(60, 30, 120, 75, 10, scheme_black);
  screen.fillRoundRect(60, 150, 120, 75, 10, scheme_black);
  screen.fillRoundRect(60, 30, 120, 70, 10, scheme_orange);
  screen.fillRoundRect(60, 150, 120, 70, 10, scheme_orange);

  screen.fillRoundRect(200, 30, 100, 75, 10, scheme_black);
  screen.fillRoundRect(200, 30, 100, 70, 10, scheme_green);


  screen.setCursor(75, 80);
  screen.setTextColor(scheme_black);
  screen.setTextSize(2);
  screen.print("----");

  screen.setCursor(75, 200);
  screen.print("----");

  screen.setCursor(210, 70);
  screen.setTextSize(1);
  screen.print("Submit");

  pinMode(A0, INPUT);
  
  chBegin(chSetup);

  //program shouldnt return to here, but incase
  while(1);
}


void chSetup()
{
  touch_data set1;
  
  set1.x = 0;
  set1.y = 0;
  set1.z = 0;
  set1.temp_sample = 0;
  set1.angle = 0;
  set1.last_angle = 0;
  set1.touch_flag = false;

  //Serial.println("Spawning threads... ");
  
  chThdCreateStatic(waTh_touch_event, sizeof(waTh_touch_event), NORMALPRIO, touch_event, (void*)&set1);
  
  chThdCreateStatic(waTh_touch_check, sizeof(waTh_touch_check), NORMALPRIO, touch_check, (void*)&set1);

  chThdCreateStatic(waTh_adc_sample, sizeof(waTh_adc_sample), NORMALPRIO, adc_sample, (void*)&set1);

  chThdCreateStatic(waTh_system_monitor, sizeof(waTh_system_monitor), NORMALPRIO - 1, system_monitor, (void*)&set1);

  while(1){
    chThdSleep(1000);
  }
}

void loop() {/* Not used */}

