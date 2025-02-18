from flask import Flask, jsonify
from flask_cors import CORS
import subprocess

app = Flask(_name_)
CORS(app)

@app.route("/wifi-networks")
def wifi_networks():
    try:
        result = subprocess.run(["netsh", "wlan", "show", "network", "mode=bssid"], capture_output=True, text=True)
        networks = []
        current_ssid = None
        
        for line in result.stdout.split("\n"):
            # Procura pela linha com o SSID
            if "SSID" in line:
                ssid = line.split(":")[1].strip()
                
                # Verifica se o SSID é um valor válido, ou seja, não é um número hexadecimal
                if len(ssid) > 0 and not all(c in "0123456789abcdefABCDEF" for c in ssid):  
                    current_ssid = ssid
                    networks.append(current_ssid)

        return jsonify(networks)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if _name_ == "_main_":
    app.run(debug=True)
