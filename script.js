const targetUrl = "https://hashinata.tadpole-cliff.ts.net/notes";

document.getElementById('connected-link').href = targetUrl;
document.getElementById('fallback-link').href = targetUrl;

const loader = document.getElementById('loader');
const connectedMsg = document.getElementById('connected-msg');
const fallbackMsg = document.getElementById('fallback-msg');
const countdownEl = document.getElementById('countdown');

// Simulate finding server and starting countdown
setTimeout(() => {
    loader.classList.add('hidden');
    connectedMsg.classList.remove('hidden');

    let timeLeft = 3;
    countdownEl.textContent = timeLeft;

    const intervalId = setInterval(() => {
        timeLeft--;
        countdownEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(intervalId);
            // Redirect to the server when countdown finishes
            window.location.href = targetUrl;
        }
    }, 1000);
}, 1000);

// Safety net fallback if redirect is blocked
setTimeout(() => {
    loader.classList.add('hidden');
    connectedMsg.classList.add('hidden');
    fallbackMsg.classList.remove('hidden');
}, 6000);