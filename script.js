const btn = document.getElementById("listenBtn");
const output = document.getElementById("output");

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = "en-US";

function speak(text){

    const speech =
    new SpeechSynthesisUtterance(text);

    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}

btn.addEventListener("click", () => {

    output.innerHTML = "Listening...";
    recognition.start();
});

recognition.onresult = async (event) => {

    const command =
    event.results[0][0].transcript;

    output.innerHTML =
    "You said: " + command;

    const res = await fetch("/command", {

        method: "POST",

        headers: {
            "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
            command: command
        })
    });

    const data = await res.json();

    output.innerHTML =
    data.response;

    speak(data.response);

    if(data.action === "url"){
        window.open(data.url, "_blank");
    }

    if(data.action === "search"){
        window.open(
        "https://www.google.com/search?q="
        + encodeURIComponent(data.url),
        "_blank");
    }
};

recognition.onerror = () => {

    output.innerHTML =
    "Voice recognition error.";
};