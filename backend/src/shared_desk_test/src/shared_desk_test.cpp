
// -----------------------------------
// Controlling LEDs over the Internet
// -----------------------------------

// First, let's create our "shorthand" for the pins
// Same as in the Blink an LED example:
// led1 is D0, led2 is D7
#include "Particle.h"
int led1 = D0;
int led2 = D7;
int anwesend_button = D1;

bool test = false;
bool present = false;
unsigned long time_present = 0;
unsigned long since_start = 0;
// Last time, we only needed to declare pins in the setup function.
// This time, we are also going to register our Particle function

void setup()
{

   // Here's the pin configuration, same as last time
   pinMode(led1, OUTPUT);
   pinMode(led2, OUTPUT);
   pinMode(anwesend_button, INPUT);

   int ledToggle(String command);

   // We are also going to declare a Particle.function so that we can turn the LED on and off from the cloud.
   Particle.function("led",ledToggle);
   Particle.variable("test", test);
   Particle.variable("Present", present);
   Particle.variable("Time Present", time_present);
   // This is saying that when we ask the cloud for the function "led", it will employ the function ledToggle() from this app.

   // For good measure, let's also make sure both LEDs are off when we start:
   digitalWrite(led1, LOW);
  // digitalWrite(led2, LOW);
  

}


// Last time, we wanted to continously blink the LED on and off
// Since we're waiting for input through the cloud this time,
// we don't actually need to put anything in the loop

void loop()
{
   // Nothing to do here
   digitalWrite(led1, LOW);
   if (digitalRead(anwesend_button)){
       present = true;
       digitalWrite(led1, HIGH);
        since_start = millis();
   }
   else {
       present = false;
   }
   time_present = millis()-since_start;
}

// We're going to have a super cool function now that gets called when a matching API request is sent
// This is the ledToggle function we registered to the "led" Particle.function earlier.


int ledToggle(String command) {
    /* Particle.functions always take a string as an argument and return an integer.
    Since we can pass a string, it means that we can give the program commands on how the function should be used.
    In this case, telling the function "on" will turn the LED on and telling it "off" will turn the LED off.
    Then, the function returns a value to us to let us know what happened.
    In this case, it will return 1 for the LEDs turning on, 0 for the LEDs turning off,
    and -1 if we received a totally bogus command that didn't do anything to the LEDs.
    */

    if (command=="on") {
        test = true;
        digitalWrite(led2,HIGH);
      //  digitalWrite(led2,HIGH);
        return 1;
    }
    else if (command=="off") {
        test = false;
        digitalWrite(led2,LOW);
       // digitalWrite(led2,LOW);
        return 0;
    }
    else {
        return -1;
    }
}