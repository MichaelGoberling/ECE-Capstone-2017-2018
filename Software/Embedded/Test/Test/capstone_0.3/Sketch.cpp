/*Begining of Auto generated code by Atmel studio */
#include <Arduino.h>

/*End of auto generated code by Atmel studio */

//Author: Michael Goberling
//Date: 2/12/18
//Content: Graphical Display development

// Program includes and libraries 
#include <Adafruit_GFX.h>    
#include <SPI.h>
#include <Adafruit_ILI9341.h>
#include "TouchScreen.h"
#include "ChRt.h"

//Beginning of Auto generated function prototypes by Atmel Studio
static THD_FUNCTION(touch_event, arg );
static THD_FUNCTION(check_touch, arg );
static THD_FUNCTION(heartbeat, arg );
void chSetup();
//End of Auto generated function prototypes by Atmel Studio

static THD_WORKING_AREA(waTh_touch_event, 100);
static THD_WORKING_AREA(waTh_check_touch, 100);
static THD_WORKING_AREA(waTh_heartbeat, 64);

// These are the four touchscreen analog pins
#define YP A2  // must be an analog pin, use "An" notation!
#define XM A3  // must be an analog pin, use "An" notation!
#define YM 5   // can be a digital pin
#define XP 4   // can be a digital pin

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
};

// Struct to hold angle data
struct angle_data {
  uint16_t angle;
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

static THD_FUNCTION(check_touch, arg)
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
      
      if((thisData->y > screen.height() / 8) && (thisData->x > screen.width()/2))
      {
        Serial.println("Top side touched.");
      }
      else if((thisData->y < screen.height() / 8) && (thisData->x > screen.width()/2))
      {
        Serial.println("Bottom side touched.");
      }
      else
      {
        Serial.println("That's the status bar.");
      }
    }
  }
}

static THD_FUNCTION(heartbeat, arg)
{
  pinMode(LED_BUILTIN, OUTPUT);
  while(1)
  {
    screen.fillCircle(screen.width() - 300, screen.height() - 230, 5, ILI9341_BLACK);
    chThdSleepMilliseconds(50);
    screen.fillCircle(screen.width() - 300, screen.height() - 230, 5, ILI9341_CYAN);
    chThdSleepMilliseconds(300);
    screen.fillCircle(screen.width() - 300, screen.height() - 230, 5, ILI9341_BLACK);
    chThdSleepMilliseconds(50);
    screen.fillCircle(screen.width() - 300, screen.height() - 230, 5, ILI9341_CYAN);
    chThdSleepMilliseconds(1000);
  }
}

void setup( ) 
{
  Serial.begin(9600);
  Serial.println(F("SGS Firmware Version 0.2"));
  
  // Standard layout for touchscreen
  screen.begin();
  screen.setRotation(3);
  Serial.println("Touchscreen enabled");
  screen.fillScreen( ILI9341_WHITE );
  screen.fillRect( 0, 0, screen.width()/8, screen.height(), ILI9341_CYAN );
  screen.fillRect(screen.width()/8, screen.height()/2 - 2, screen.width() - screen.width()/8, 2 ,ILI9341_BLACK); 
  screen.drawCircle(screen.width() - 300, screen.height() - 230, 6, ILI9341_BLACK);
  
  screen.setCursor(screen.width()/3, 6*screen.height()/ 8);
  screen.setTextColor(ILI9341_BLACK);
  screen.setTextSize(2);
  screen.print("Settings");

  screen.setCursor(screen.width()/3, screen.height()/4);
  screen.setTextColor(ILI9341_BLACK);
  screen.setTextSize(2);
  screen.print("Start!");
  
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
  set1.touch_flag = false;

  chThdCreateStatic(waTh_touch_event, sizeof(waTh_touch_event), NORMALPRIO, touch_event, (void*)&set1);
  
  chThdCreateStatic(waTh_check_touch, sizeof(waTh_check_touch), NORMALPRIO, check_touch, (void*)&set1);

  chThdCreateStatic(waTh_heartbeat, sizeof(waTh_heartbeat), NORMALPRIO - 1, heartbeat, NULL);

  while(1){
    chThdSleep(1000);
  }
}

void loop() {/* Not used */}

