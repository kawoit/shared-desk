#include <Arduino.h>
#include <SoftwareSerial.h>
#include <PN532_SWHSU.h>
#include <PN532.h>

// WiFi credentials.
const char* WIFI_SSID = "realme_RMX1931_co_apaxkh";
const char* WIFI_PASS = "paulistdumm";

#define D8 (15)
#define D7 (13)

#define BAUD_RATE 57600

#undef SWAPSERIAL

#ifndef SWAPSERIAL
auto &usbSerial = Serial;
EspSoftwareSerial::UART testSerial;
#endif

PN532_SWHSU pn532swhsu(testSerial);
PN532 nfc(pn532swhsu);
String tagId = "None", dispTag = "None";
byte nuidPICC[4];

void setup(void)
{
#ifndef SWAPSERIAL
  usbSerial.begin(115200);
  testSerial.begin(BAUD_RATE, EspSoftwareSerial::SWSERIAL_8N1, D7, D8, false, 95, 11);
#endif
  Serial.begin(9600);
  nfc.begin();
  uint32_t versiondata = nfc.getFirmwareVersion();
  if (!versiondata)
  {
    Serial.print("Didn't Find PN53x Module");
    while (1)
      ; // Halt
  }
  // Got valid data, print it out!
  Serial.print("Found chip PN5");
  Serial.println((versiondata >> 24) & 0xFF, HEX);
  Serial.print("Firmware ver. ");
  Serial.print((versiondata >> 16) & 0xFF, DEC);
  Serial.print('.');
  Serial.println((versiondata >> 8) & 0xFF, DEC);
  nfc.SAMConfig();
}

String tagToString(byte id[4])
{
  String tagId = "";
  for (byte i = 0; i < 4; i++)
  {
    if (i < 3)
      tagId += String(id[i]) + ".";
    else
      tagId += String(id[i]);
  }
  return tagId;
}

void readNFC()
{
  boolean success;
  uint8_t uid[] = {0, 0, 0, 0, 0, 0, 0}; // Buffer to store the returned UID
  uint8_t uidLength;                     // Length of the UID (4 or 7 bytes depending on ISO14443A card type)
  success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, &uid[0], &uidLength);
  if (success)
  {
    Serial.print("UID Length: ");
    Serial.print(uidLength, DEC);
    Serial.println(" bytes");
    Serial.print("UID Value: ");
    for (uint8_t i = 0; i < uidLength; i++)
    {
      nuidPICC[i] = uid[i];
      Serial.print(" ");
      Serial.print(uid[i], DEC);
    }
    Serial.println();
    tagId = tagToString(nuidPICC);
    dispTag = tagId;
    Serial.print(F("tagId is : "));
    Serial.println(tagId);
    Serial.println("");
    delay(1000); // 1 second halt
  }
  else
  {
    // PN532 probably timed out waiting for a card
    Serial.println("Timed out! Waiting for a card...");
  }
}

void loop()
{
  readNFC();
}
