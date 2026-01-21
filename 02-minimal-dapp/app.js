const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const ABI = ["function name() view returns (string)"];

const connectBtn = document.getElementById("connectBtn");
const readBtn = document.getElementById("readBtn");
const disconnectBtn = document.getElementById("disconnectBtn");

const statusEl = document.getElementById("status");
const statusDot = document.getElementById("statusDot");
const statusPill = document.getElementById("statusPill");

const accountEl = document.getElementById("account");
const chainIdEl = document.getElementById("chainId");
const contractAddressEl = document.getElementById("contractAddress");
const readResultEl = document.getElementById("readResult");

const copyAccountBtn = document.getElementById("copyAccountBtn");
const copyContractBtn = document.getElementById("copyContractBtn");

const toast = document.getElementById("toast");

let provider = null;

function showToast(text) {
    toast.textContent = text;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 900);
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast("Copied ✅");
    } catch {
        showToast("Copy failed");
    }
}

function setStatus(text, type = "warn") {
    statusEl.textContent = text;
    statusDot.classList.remove("ok", "bad");
    if (type === "ok") statusDot.classList.add("ok");
    if (type === "bad") statusDot.classList.add("bad");
}

function resetUI() {
    provider = null;
    accountEl.textContent = "-";
    chainIdEl.textContent = "-";
    readResultEl.textContent = "-";
    readBtn.disabled = true;
    setStatus("Not connected", "warn");
}

async function connectWallet() {
    if (!window.ethereum) {
        setStatus("MetaMask not found", "bad");
        return;
    }

    try {
        setStatus("Connecting...", "warn");

        provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);

        const signer = await provider.getSigner();
        const account = await signer.getAddress();
        const network = await provider.getNetwork();

        accountEl.textContent = account;
        chainIdEl.textContent = network.chainId.toString();

        // Enable read button only when connected
        readBtn.disabled = false;

        // Helpful status
        if (network.chainId.toString() === "31337") {
            setStatus("Connected (Hardhat Local)", "ok");
        } else {
            setStatus("Connected (wrong network)", "bad");
        }
    } catch (err) {
        console.error(err);
        setStatus("Connection failed / rejected", "bad");
    }
}

async function readFromContract() {
    try {
        if (!provider) {
            setStatus("Connect wallet first", "bad");
            return;
        }

        setStatus("Reading contract...", "warn");

        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
        const value = await contract.name();

        readResultEl.textContent = value;

        const network = await provider.getNetwork();
        if (network.chainId.toString() === "31337") {
            setStatus("Read success", "ok");
        } else {
            setStatus("Read success (but wrong network?)", "warn");
        }
    } catch (err) {
        console.error(err);
        setStatus("Read failed (check address / ABI / network)", "bad");
    }
}

contractAddressEl.textContent = CONTRACT_ADDRESS;

connectBtn.addEventListener("click", connectWallet);
readBtn.addEventListener("click", readFromContract);
disconnectBtn.addEventListener("click", resetUI);

copyAccountBtn.addEventListener("click", () => {
    const val = accountEl.textContent.trim();
    if (val && val !== "-") copyToClipboard(val);
    else showToast("No account yet");
});

copyContractBtn.addEventListener("click", () => {
    copyToClipboard(CONTRACT_ADDRESS);
});

if (window.ethereum) {
    window.ethereum.on?.("accountsChanged", () => {
        // Keep it simple: reset and ask user to connect again
        resetUI();
        showToast("Account changed");
    });

    window.ethereum.on?.("chainChanged", () => {
        resetUI();
        showToast("Network changed");
    });
}

resetUI();