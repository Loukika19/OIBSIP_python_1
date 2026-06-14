const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.lang = "en-US";
recognition.continuous = false;
recognition.interimResults = false;

const startBtn = document.getElementById("start-btn");
const output = document.getElementById("output");

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}

startBtn.addEventListener("click", () => {
    recognition.start();
});

recognition.onstart = () => {
    output.innerHTML = "🎤 Listening...";
};

recognition.onend = () => {
    output.innerHTML += "<br>⏹️ Stopped Listening";
};

recognition.onerror = (event) => {
    output.innerHTML = "Error: " + event.error;
};

recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase().trim();

    output.innerHTML = "You said: " + command;

    if (command.includes("hello")) {
        speak("Hello! How can I help you?");
    }

    else if (command.includes("open google")) {
        speak("Opening Google");
        window.open("https://www.google.com", "_blank");
    }

    else if (command.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://www.youtube.com", "_blank");
    }

    else if (command.includes("time")) {
        const now = new Date();
        const time = now.toLocaleTimeString();
        speak("The current time is " + time);
    }

    else {
        speak("Sorry, I did not understand that command.");
    }
};