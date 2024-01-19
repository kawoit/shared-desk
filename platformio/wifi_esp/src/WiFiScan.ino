/*
 *  This sketch demonstrates how to scan WiFi networks.
 *  The API is almost the same as with the WiFi Shield library,
 *  the most obvious difference being the different file you need to include:
 */
#include <Arduino.h>
#include <SoftwareSerial.h>
#include <PN532_SWHSU.h>
#include <PN532.h>

#include "ESP8266WiFi.h"
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

String serverName = "<SERVERURL AND PORT>";
#define desk_id 5

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

void setup()
{
  Serial.begin(9600);

  // Set WiFi to station mode and disconnect from an AP if it was previously connected
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(100);

  WiFi.begin("iot_hotspot", "12345678");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(100);
    Serial.print(".");
  }
  Serial.println(WiFi.localIP());

  testSerial.begin(BAUD_RATE, EspSoftwareSerial::SWSERIAL_8N1, D7, D8, false, 95, 11);
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

  Serial.println("--------------\nSetup done");
}

String tagToString(byte id[4])
{
  String tagId = "";
  for (byte i = 0; i < 4; i++)
  {
    if (i < 3)
      tagId += String(id[i]);
    else
      tagId += String(id[i]);
  }
  return tagId;
}


void send_http_request(String serverPath)
{
  WiFiClient client;
  HTTPClient http;
  http.begin(client, serverPath.c_str());
  int httpResponseCode = http.GET();
  if (httpResponseCode > 0)
  {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    String payload = http.getString();
    Serial.println(payload);
  }
  else
  {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  http.end();
}

void send_in_use_to_server(String card_id)
{
  if (WiFi.status() == WL_CONNECTED)
  {
    WiFiClient client;
    HTTPClient http;

    String serverPath = serverName + "set_in_use?desk_id=" + desk_id + "&card_id=" + card_id + "";
    send_http_request(serverPath);
  }
}

void send_free_to_server()
{
  if (WiFi.status() == WL_CONNECTED)
  {
    String serverPath = serverName + "set_free?desk_id=" + desk_id + "";
    send_http_request(serverPath);
  }
  else
  {
    Serial.println("WiFi Disconnected");
  }
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

    send_in_use_to_server(tagId);
    delay(1000); // 1 second halt
  }
  else
  {
    // PN532 probably timed out waiting for a card
    Serial.println("Timed out! Waiting for a card...");
    send_free_to_server();
  }
}

void loop()
{
  readNFC();
}
