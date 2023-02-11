let text = "I am The Other Jawaad";
let i = 0;
let speed = 150;
let cursor = true;

function typeWriter() {
    if (i < text.length) {
        document.getElementById("text").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    } else {
        setTimeout(erase, speed);
    }
}

function erase() {
    if (i >= 0) {
        let str = text.substring(0, i);
        document.getElementById("text").innerHTML = str;
        i--;
        setTimeout(erase, speed);
    } else {
        i = 0;
        typeWriter();
    }
}

typeWriter();