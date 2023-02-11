let text = "I am The Other Jawaad";
let i = 0;
let btn = false;
let speed = 150;
let cursor = true;
let title = document.getElementById("text");
let buttonDiv = document.getElementById("chatButton");

function typeWriter() {
    if (i < text.length) {
        title.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    } else {
        if (!btn) {
            buttonDiv.innerHTML =
                `
            <a href="/chat.html"><button>Chat</button></a>
            `
            btn = true;

        }
        setTimeout(erase, speed);
    }
}

function erase() {
    if (i >= 0) {
        let str = text.substring(0, i);
        title.innerHTML = str;
        i--;
        setTimeout(erase, speed);
    } else {
        i = 0;
        typeWriter();
    }
}

typeWriter();