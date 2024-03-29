// import bot from "./assets/bot.png";
// import user from "./assets/user.svg";

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

function loader(element) {
  element.textContent = '';

  loadInterval = setInterval(() => {
    element.textContent += '.';

    if (element.textContent === '....')
      element.textContent = '';

  }, 300)
}

function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
      chatContainer.scrollHeight(30);
      // chatContainer.scrollTop = chatContainer.scrollHeight;
    } else {
      clearInterval(interval);
    }
  }, 20)
}

function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexString = randomNumber.toString(16);

  return `id-${timestamp}-${hexString}`;
}

function chatStripe(isAI, value, uniqueId) {
  return (
    `
      <div class="${isAI ? "wrapperAi" : "wrapper"}">
        <div class="chat">
          <div class="profile">
            <img 
              src="${isAI ? "./assets/bot.png" : "./assets/user.svg"}"
              alt="${isAI ? 'Bot' : 'User'}"
            />
          </div>
          <div class="message" id=${uniqueId}>${value}</div>
        </div>
      </div>
    `
  )
}

const handleSubmit = async (event) => {
  event.preventDefault();
  const data = new FormData(form);

  //User's chat section
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

  form.reset();

  //The other Jawaad's chat section
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);

  // Fetch data from server and type bot's response

  const response = await fetch('https://the-other-jawaad.onrender.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: data.get('prompt')
    })
  });

  clearInterval(loadInterval);
  messageDiv.innerHTML = '';

  if (response.ok) {
    const data = await response.json();
    const parseData = data.bot.trim();

    typeText(messageDiv, parseData);
  } else {
    const err = await response.text();

    messageDiv.innerHTML = "Something went wrong";

    alert(err);
  }
}

form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup", (event) => {
  if (event.keyCode === 13 && !event.shiftKey) {
    handleSubmit(event);
  }
})
