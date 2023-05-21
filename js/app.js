const chatLog = document.getElementById('chat-log'),
    userInput = document.getElementById('user-input'),
    sendButton = document.getElementById('send-button'),
    buttonIcon = document.getElementById('button-icon'),
    info = document.querySelector('.info');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        sendMessage();
    }
});


function sendMessage(){
    const message = userInput.value.trim();

    if(message === ''){
        return;
    } else if (message === 'developer'){
        userInput.value = '';
        appendMessage('user', message);
        setTimeout(() => {
            appendMessage('bot', 'This source code by MSS');
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        }, 2000);
        return;
    }

    appendMessage('user', message);
    userInput.value = '';
    //  PROMPS
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'YOUR_API_KEY',
            'X-RapidAPI-Host': 'chatgpt53.p.rapidapi.com'
        },
        body: `{"messages":[{"role":"user","content":"${message}"}]}`
    };

    //  API
    fetch('https://chatgpt53.p.rapidapi.com/', options)
        .then((response) => response.json())
        .then((response) => {
            appendMessage('bot', response.choices[0].message.content);
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        }).catch((err) => {
            if(err.name === 'TypeError'){
                appendMessage('bot', 'Error: Check your Api Key :(');
                buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
                buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
            }
        });
}


function appendMessage(sender, message){
    info.style.display = "none";

    buttonIcon.classList.remove('fa-solid', 'fa-paper-plane');
    buttonIcon.classList.add('fas', 'fa-spinner', 'fa-pulse');

    const messageElement = document.createElement('div');
    const iconElement = document.createElement('div');
    const chatElement = document.createElement('div');
    const icon = document.createElement('i');

    chatElement.classList.add("chat-box");
    iconElement.classList.add("icon");
    messageElement.classList.add(sender);
    messageElement.innerText = message;

    if(sender === 'user'){
        icon.classList.add('fa-regular', 'fa-user');
        iconElement.setAttribute('id', 'user-icon');
    }else{
        icon.classList.add('fa-solid', 'fa-robot');
        iconElement.setAttribute('id', 'bot-icon');
    }

    iconElement.appendChild(icon);
    chatElement.appendChild(iconElement);
    chatElement.appendChild(messageElement);
    chatLog.appendChild(chatElement);
    chatLog.scrollTo = chatLog.scrollHeight;
}