let step = 1;
const steps = [
    "Abra as configurações do Windows.",
    "Clique em 'Rede e Internet'.",
    "Selecione 'Wi-Fi' e escolha uma rede disponível.",
    "Digite a senha e clique em conectar."
];

function startTutorial() {
    document.getElementById('home').classList.add('hidden');
    document.getElementById('tutorial').classList.remove('hidden');
}

function nextStep() {
    if (step < steps.length) {
        step++;
        updateStep();
    }
}

function prevStep() {
    if (step > 1) {
        step--;
        updateStep();
    }
}

function updateStep() {
    document.getElementById('stepNumber').textContent = step;
    document.getElementById('stepText').textContent = steps[step - 1];
}

function checkConnection() {
    if (navigator.onLine) {
        document.getElementById('connectionStatus').textContent = "✅ Você está conectado à internet.";
        testLatency();
    } else {
        document.getElementById('connectionStatus').textContent = "❌ Sem conexão com a internet.";
    }
}

function testLatency() {
    const start = Date.now();
    fetch('https://www.google.com', { mode: 'no-cors' }).then(() => {
        const latency = Date.now() - start;
        document.getElementById('latencyStatus').textContent = 📡 Latência: ${latency} ms;
    }).catch(() => {
        document.getElementById('latencyStatus').textContent = "⚠ Não foi possível medir a latência.";
    });
}

function scanNetworks() {
    fetch("http://127.0.0.1:5000/wifi-networks")
        .then(response => response.json())
        .then(networks => {
            let networkList = document.getElementById("networkList");
            networkList.innerHTML = "";

            if (networks.length > 0) {
                networks.forEach(network => {
                    let listItem = document.createElement("li");
                    listItem.textContent = network;
                    networkList.appendChild(listItem);
                });
            } else {
                networkList.innerHTML = "<li>Nenhuma rede encontrada.</li>";
            }
        })
        .catch(error => {
            console.error("Erro ao buscar redes Wi-Fi:", error);
            document.getElementById("networkList").innerHTML = "<li>Erro ao obter redes.</li>";
        });
}
