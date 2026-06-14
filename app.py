from flask import Flask, render_template, request, jsonify
from datetime import datetime
import subprocess

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/command", methods=["POST"])
def command():

    data = request.get_json()
    text = data["command"].lower()

    response = "Sorry, I didn't understand."

    action = None
    url = ""

    if "hello" in text:
        response = "Hello! How can I help you today?"

    elif "time" in text:
        response = datetime.now().strftime(
            "Current time is %I:%M %p"
        )

    elif "date" in text:
        response = datetime.now().strftime(
            "Today is %d %B %Y"
        )

    elif "open google" in text:
        response = "Opening Google"
        action = "url"
        url = "https://www.google.com"

    elif "open youtube" in text:
        response = "Opening YouTube"
        action = "url"
        url = "https://www.youtube.com"

    elif "open github" in text:
        response = "Opening GitHub"
        action = "url"
        url = "https://github.com"

    elif "open chatgpt" in text:
        response = "Opening ChatGPT"
        action = "url"
        url = "https://chatgpt.com"

    elif "open notepad" in text:
        try:
            subprocess.Popen(["notepad.exe"])
            response = "Opening Notepad"
        except:
            response = "Notepad can only be opened on Windows."

    else:
        response = f"Searching Google for {text}"
        action = "search"
        url = text

    return jsonify({
        "response": response,
        "action": action,
        "url": url
    })

if __name__ == "__main__":
    app.run(debug=True)