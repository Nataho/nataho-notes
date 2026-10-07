const targetUrl = "https://hashinata.tadpole-cliff.ts.net/notes";
const healthCheckUrl = "https://hashinata.tadpole-cliff.ts.net/notes/"; // Or a specific lightweight file/image

document.getElementById('connected-link').href = targetUrl;
document.getElementById('fallback-link').href = targetUrl;

const loader = document.getElementById('loader');
const connectedMsg = document.getElementById('connected-msg');
const fallbackMsg = document.getElementById('fallback-msg');
const offlineMsg = document.getElementById('offline-msg');
const countdownEl = document.getElementById('countdown');
const statusText = document.getElementById('status-text');

// Test if Apache is truly responding by trying to load a resource
function checkApache() {
    const img = new Image();
    let resolved = false;

    // Set a 3-second timeout for the check
    const timer = setTimeout(() => {
        if (!resolved) {
            resolved = true;
            showOffline();
        }
    }, 3000);

    // If Apache is running, a valid response (or even a favicon/page load attempt) triggers onload or errors out cleanly
    // Alternatively, use a fetch with a mode that catches gateway errors, or check via an image probe:
    img.onload = () => {
        if (!resolved) {
            resolved = true;
            clearTimeout(timer);
            showConnected();
        }
    };

    img.onerror = () => {
        // Tailscale 502 page or offline laptop will trigger this
        if (!resolved) {
            resolved = true;
            clearTimeout(timer);
            showOffline();
        }
    };

    // Try loading the favicon or root of your notes app
    img.src = targetUrl + "/atatchments/assets/ping.png?t=" + Date.now();
}

function showConnected() {
    loader.classList.add('hidden');
    connectedMsg.classList.remove('hidden');

    let timeLeft = 3;
    countdownEl.textContent = timeLeft;

    const intervalId = setInterval(() => {
        timeLeft--;
        countdownEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(intervalId);
            window.location.href = targetUrl;
        }
    }, 1000);
}

function showOffline() {
    loader.classList.add('hidden');
    offlineMsg.classList.remove('hidden');
}

// Run the check on page load
checkApache();