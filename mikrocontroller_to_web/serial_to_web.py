import time, re, requests
import hashlib
import serial

SERVERURL = "http://127.0.0.1:5000"

desk_id = 5
ser = serial.Serial('/dev/ttyACM0', 9600, timeout=10)


def find_id(data_str):
    card_id = re.search(r'tagId is : (\d+.\d+.\d+.\d+)', data_str)
    if card_id:
        return card_id.group(1)
    return None

def hash_id(id):
    return hashlib.md5(id.encode('utf-8')).hexdigest()

def read_serial(ser):
    # while True:
        if (ser.inWaiting() > 0):
            return ser.read(ser.inWaiting()).decode('ascii')
        
def send_data(url, data):
    try:
        r = requests.get(url, params=data)
        print(f"response:{r.status_code}")
    except Exception as e:
         print(f"error: {e}")
        
def send_to_web(card_id):
    if card_id:
        url = f'{SERVERURL}/set_in_use'
        data = {'desk_id': desk_id, 'card_id': card_id}
        print("belegt")
    else:
        url = f'{SERVERURL}//set_free'
        data = {'desk_id': desk_id}
        print("frei")
    send_data(url, data)
            

if __name__ == "__main__":
    old_raw_data = None
    timer = 0
    while True:
        id = None
        raw_data = read_serial(ser)
        if raw_data and raw_data != old_raw_data or raw_data and timer > 10:
            old_raw_data = raw_data
            id = find_id(raw_data)
            if id:
                timer = 0
                send_to_web(hash_id(id))
            else:
                timer = 0
                send_to_web(None)
        timer += 1
        time.sleep(1)
