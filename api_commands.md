api commands:

led ein/aus:

curl https://api.particle.io/v1/devices/3e0022000c47353136383631/led -d access_token=76ce7a46ea0e0ca0031d3bd60859082e52b38806 -d "args=on"

curl https://api.particle.io/v1/devices/3e0022000c47353136383631/led?access_token=76ce7a46ea0e0ca0031d3bd60859082e52b38806&args=on #GEHT NICHT!
