Flutter Anleitung:

https://www.zeromolecule.com/blog/host-card-emulation-hce-with-android-and-flutter/


Reader Suche

RFID Karten: https://www.conrad.de/de/p/tru-components-tc-9927212-rfid-karte-10-st-2481803.html

# Mit RC522:

Komplettset: https://www.reichelt.de/entwicklerboards-rfid-set-mit-rc522-rfid-modul-debo-rfid-set-p301408.html?CCOUNTRY=445&LANGUAGE=de&trstct=pos_3&nbc=1&&r=1

Set: https://www.conrad.de/de/p/az-delivery-rfid-kit-rc522-mit-reader-chip-und-card-fuer-raspberry-pi-und-co-13-56mhz-850038438.html

# Mit PN532:

Set: https://www.conrad.de/de/p/pn532-nfc-und-rfid-modul-inkl-karte-dongle-842233192.html

 
Vergleich: https://www.seeedstudio.com/blog/2020/05/29/which-is-best-rfid-nfc-mifare-chip-selection-guide-rc522-vs-pn532/

„if you only need the ISO14443A protocol, then RC522 is a very cost-effective option, but if you want to support more protocols such as NFC, you should choose the PN532 solution”






api commands:

led ein/aus:
<code>
curl https://api.particle.io/v1/devices/3e0022000c47353136383631/led -d access_token=76ce7a46ea0e0ca0031d3bd60859082e52b38806 -d "args=on"
</code>
auslesen der Test Variable:
curl https://api.particle.io/v1/devices/3e0022000c47353136383631/test?access_token=76ce7a46ea0e0ca0031d3bd60859082e52b38806
