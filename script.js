const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const captureBtn = document.getElementById("captureBtn");

const logList = document.getElementById("logList");
const videoPlayer = document.getElementById("videoPlayer");
startBtn.classList.add("bright-btn");

stopBtn.classList.add("dim-btn");
captureBtn.classList.add("dim-btn");

let stream;
let logcount=0;
function addLog(message) {
    if(logcount >= 6) {
        logList.removeChild(logList.firstChild);
        logcount--;
    }
const logItem = document.createElement("li");


logItem.textContent = message;

logList.appendChild(logItem);
logcount++;

}

startBtn.addEventListener("click", async () => {
    if (stream && stream.active) { addLog("Camera is running"); return; }
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });

        videoPlayer.srcObject = stream;

        startBtn.classList.remove("bright-btn");
        startBtn.classList.add("dim-btn");

        stopBtn.classList.remove("dim-btn");
        stopBtn.classList.add("bright-btn");

        captureBtn.classList.remove("dim-btn");
        captureBtn.classList.add("bright-btn");

        addLog("Button [Start] Clicked");
    } catch (error) {
        console.error(error);
        addLog("Camera Access Denied");
    }
});

stopBtn.addEventListener("click", () => {
    if (!stream || !stream.active) { addLog("Camera is off."); return; }

    if (stream) {
        stream.getTracks().forEach(track => track.stop());

        videoPlayer.srcObject = null;

        startBtn.classList.remove("dim-btn");
        startBtn.classList.add("bright-btn");

        stopBtn.classList.remove("bright-btn");
        stopBtn.classList.add("dim-btn");

        captureBtn.classList.remove("bright-btn");
        captureBtn.classList.add("dim-btn");

        addLog("Button [Stop] Clicked");

    }
});
captureBtn.addEventListener("click", () => {
    if (!stream || !stream.active) {
        addLog("Camera is not running");
        return;
    }

    const flash = document.getElementById("flash");

    flash.classList.add("flash-animation");

    setTimeout(() => {
        flash.classList.remove("flash-animation");
    }, 300);

    addLog("Button [Capture] Clicked");
});
function updateClock() {

    const now = new Date();

    const time =
        now.toLocaleTimeString();

    document.getElementById("clock")
        .textContent = time;
}

updateClock();

setInterval(updateClock, 1000);
