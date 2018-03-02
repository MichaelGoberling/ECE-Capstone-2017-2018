//Author: Michael Goberling
//Date: 2/12/18
//Content: Graphical Display development

#include <Adafruit_GFX.h>    // Core graphics library
#include <SPI.h>
#include <Adafruit_ILI9341.h>
#include "TouchScreen.h"

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

//struct to take in x y and z of taps
struct touchtype {
  
  uint16_t x;
  uint16_t y;
  uint16_t z;
  
};

touchtype touch = { 0, 0, 0 };
bool touch_flag = false;

void setup( void ) 
{
  Serial.begin(9600);
  Serial.println(F("SGS Firmware Version 0.2"));
  screen.begin();
  Serial.println("Touchscreen enabled");
  init_screen();
}

void loop() 
{
  touch_event();
  check_touch();
}

void init_screen( void )
{
  screen.fillScreen( ILI9341_WHITE );
  screen.fillRect( 0, 0, screen.width()/8, screen.height(), ILI9341_CYAN );
  screen.fillRect(screen.width()/8, screen.height()/2 - 2, screen.width() - screen.width()/8, 2 ,ILI9341_BLACK); 
}

void touch_event() 
{
  TSPoint p = ts.getPoint();
  
  if(p.z < MINPRESSURE || p.z > MAXPRESSURE)
  {
    return;
  }

  touch_flag = true;
  touch.x = map(p.x, TS_MINX, TS_MAXX, 0, screen.width());
  touch.y = map(p.y, TS_MINY, TS_MAXY, 0, screen.height());
  touch.z = p.z;
  
}

void check_touch()
{
  if(!touch_flag)
  {
    return;
  }

  touch_flag = false;
  
  if((touch.y > screen.height() / 2) && (touch.x > screen.width()/8))
  {
    Serial.println("Left side touched.");
  }
  else if((touch.y < screen.height() / 2) && (touch.x > screen.width()/8))
  {
    Serial.println("Right side touched.");
  }
  else
  {
    Serial.println("That's the status bar.");
  }
  
}

