import bot from "./assets/bot.png";
import user from "./assets/user.svg";

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
      <div class="wrapper ${isAI && 'ai'}">
        <div class="chat">
          <div class="profile"
            <img 
              src="${isAI ? bot : user}"
              alt="${isAI ? 'Bot' : 'User'}"
            />
          </div>
          <div class="message" id=${uniqueId}>${value}>
          </div>
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
}
