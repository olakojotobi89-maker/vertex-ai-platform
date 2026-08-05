const chatThread = document.getElementById('chatThread');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const voiceBtn = document.getElementById('voiceBtn');
const attachBtn = document.getElementById('attachBtn');
const newChatButton = document.querySelector('.new-chat');

const synth = window.speechSynthesis;
let recognition;
let listening = false;
let lastSimulatedResponse = 'Great idea! Here’s a quick starter strategy for your business.';

const createMessage = (text, isUser = false) => {
  const message = document.createElement('div');
  message.className = `ai-message ${isUser ? 'user' : 'agent'}`;
  message.innerHTML = `
    <div class="avatar"><img src="logo.png" alt="${isUser ? 'You' : 'Vertex AI'}"></div>
    <div class="bubble">
      <h4>${isUser ? 'You' : 'Vertex AI'}</h4>
      <p>${text}</p>
    </div>
  `;
  return message;
};

const createTypingIndicator = () => {
  const typing = document.createElement('div');
  typing.className = 'typing-indicator';
  typing.setAttribute('aria-live', 'off');
  typing.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span><span>Vertex AI is typing…</span>';
  return typing;
};

const scrollChatToBottom = () => {
  requestAnimationFrame(() => {
    if (chatThread) {
      chatThread.scrollTop = chatThread.scrollHeight;
    }
  });
};

const simulateAiReply = (userText) => {
  const typing = createTypingIndicator();
  chatThread.appendChild(typing);
  scrollChatToBottom();

  setTimeout(() => {
    typing.remove();
    const responseText = userText
      ? `I heard: "${userText}". ${lastSimulatedResponse}`
      : `I’m here to help. Please type a question or tap the microphone to speak to Vertex AI.`;
    const reply = createMessage(responseText, false);
    chatThread.appendChild(reply);
    scrollChatToBottom();
    speakText(responseText);
  }, 1200);
};

const sendMessage = () => {
  const text = chatInput.value.trim();
  if (!text) return;
  const userMessage = createMessage(text, true);
  chatThread.appendChild(userMessage);
  chatInput.value = '';
  scrollChatToBottom();
  simulateAiReply(text);
};

const speakText = (text) => {
  if (!synth || !text) return;
  if (synth.speaking) synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 1;
  synth.speak(utterance);
};

const toggleVoiceRecognition = async () => {
  if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
    alert('Voice input is not supported in this browser yet.');
    return;
  }

  if (!recognition) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.addEventListener('result', (event) => {
      const transcript = event.results[0][0].transcript;
      chatInput.value = transcript;
      sendMessage();
    });

    recognition.addEventListener('end', () => {
      listening = false;
      voiceBtn.classList.remove('active');
      voiceBtn.setAttribute('aria-label', 'Voice input');
    });

    recognition.addEventListener('error', () => {
      listening = false;
      voiceBtn.classList.remove('active');
      voiceBtn.setAttribute('aria-label', 'Voice input');
    });
  }

  if (listening) {
    recognition.stop();
    listening = false;
    voiceBtn.classList.remove('active');
  } else {
    recognition.start();
    listening = true;
    voiceBtn.classList.add('active');
    voiceBtn.setAttribute('aria-label', 'Listening');
  }
};

const resetChatSession = () => {
  chatThread.innerHTML = '';
  const initialMessage = createMessage('Hello 👋 I’m your AI Business Strategist. Tell me your business idea and I’ll help you build it.', false);
  chatThread.appendChild(initialMessage);
  chatInput.value = '';
  scrollChatToBottom();
};

if (sendBtn && chatInput) {
  sendBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  });
}

if (voiceBtn) {
  voiceBtn.addEventListener('click', toggleVoiceRecognition);
}

if (attachBtn) {
  attachBtn.addEventListener('click', () => {
    alert('Attachment support is coming soon.');
  });
}

if (newChatButton) {
  newChatButton.addEventListener('click', resetChatSession);
}

window.addEventListener('load', () => {
  resetChatSession();
  scrollChatToBottom();
});