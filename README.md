# Shared Desk Application

This is a shared desk application developed as a university project. The application is built using Flask and NodeMCU with NFC reader.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation of Server Software

### 1. Clone the repository
### 2. Navigate to the directory /server
### 3. Install dependencies
```pip3 install -r requirements.txt```

### 4. Run server
```./startserver.sh```

### 5. Open Browser
[http://127.0.0.1:5000](http://127.0.0.1:5000)
Check, if webui shows up


## Installation of microcontroller

### 1. Open directory
```cd /client/nodemcu/src```

### 2. Setup configuration
``` WiFiScan.ino, lines 17 to 20 ```

### 3. Connect nodemcu to PN532
More details in Media dir


## License
Licenced under GNU GPLv3