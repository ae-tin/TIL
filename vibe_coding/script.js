
const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

// 명언 배열
const quotes = [
    '성공은 준비와 기회의 만남이다. - 세네카',
    '포기하지 마라. 오늘의 어려움은 내일의 힘이 된다. - 익명',
    '가장 어두운 밤도 끝나고 해는 뜬다. - 빅토르 위고',
    '행동은 모든 성공의 기초이다. - 파블로 피카소',
    '실패는 성공의 어머니이다. - 토마스 에디슨',
    '작은 성취가 큰 변화를 만든다. - 익명',
    '자신을 믿어라. 모든 것은 마음에서 시작된다. - 익명'
];

// 대화 내역을 저장하는 배열
const messages = [
    { role: 'system', content: 'You are a helpful assistant.' }
];

// 랜덤 명언 반환 함수
function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

// 첫 시작 시 웰컴 메시지 출력
window.addEventListener('DOMContentLoaded', () => {
    const welcome = getRandomQuote();
    appendMessage(welcome, 'bot');
    messages.push({ role: 'assistant', content: welcome });

    // 다크모드/라이트모드 토글 버튼 기능 추가
    const modeToggle = document.getElementById('mode-toggle');
    modeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            modeToggle.textContent = '☀️ 라이트모드';
        } else {
            modeToggle.textContent = '🌙 다크모드';
        }
    });
});

function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.textContent = text;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function fetchGPTReply() {
    const '; // 
    const endpoint = 'https://api.openai.com/v1/chat/completions';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer `
    };
    const body = {
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 100
    };
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        });
        const data = await response.json();
        if (data.choices && data.choices[0] && data.choices[0].message) {
            return data.choices[0].message.content.trim();
        } else {
            return '챗봇 응답을 가져올 수 없습니다.';
        }
    } catch (err) {
        return '오류가 발생했습니다.';
    }
}

chatForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const userText = chatInput.value.trim();
    if (!userText) return;
    appendMessage(userText, 'user');
    messages.push({ role: 'user', content: userText });
    chatInput.value = '';
    appendMessage('답변 생성 중...', 'bot');
    const reply = await fetchGPTReply();
    // 마지막 bot 메시지(로딩)를 제거 후 실제 답변 추가
    const botMsgs = chatWindow.querySelectorAll('.message.bot');
    if (botMsgs.length) chatWindow.removeChild(botMsgs[botMsgs.length - 1]);
    appendMessage(reply, 'bot');
    messages.push({ role: 'assistant', content: reply });
});
