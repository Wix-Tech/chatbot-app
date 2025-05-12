import express, { Request, Response } from 'express';
import ChatController from './controllers/chatController';

const app = express();
const chatController = new ChatController();

app.use(express.json());

app.post('/chat', (req: Request, res: Response) => {
    const userMessage = req.body.message;
    if (!userMessage) {
        return res.status(400).json({ error: 'Message is required' });
    }
    // Get bot response
    const response = chatController.handleUserMessage(userMessage, true);
    res.json({ response });
});

// ...existing code...

app.get('/', (_req: Request, res: Response) => {
    res.send(`
        <html>
        <head>
            <title>Wolfie Chatbot</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style>
                body {
                    font-family: 'Segoe UI', Arial, sans-serif;
                    background: #343541;
                    margin: 0;
                    padding: 0;
                    height: 100vh;
                }
                #container {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    max-width: 600px;
                    margin: 0 auto;
                }
                #chat {
                    flex: 1;
                    overflow-y: auto;
                    padding: 16px;
                    background: #444654;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .bubble {
                    max-width: 90vw;
                    padding: 12px 18px;
                    border-radius: 16px;
                    margin-bottom: 4px;
                    font-size: 1rem;
                    line-height: 1.5;
                    word-break: break-word;
                    box-sizing: border-box;
                }
                .user {
                    align-self: flex-end;
                    background: #0078d7;
                    color: #fff;
                    border-bottom-right-radius: 4px;
                }
                .bot {
                    align-self: flex-start;
                    background: #ececf1;
                    color: #222;
                    border-bottom-left-radius: 4px;
                }
                #input-area {
                    display: flex;
                    padding: 12px;
                    background: #343541;
                    border-top: 1px solid #222;
                }
                #msg {
                    flex: 1;
                    padding: 12px;
                    border-radius: 8px;
                    border: none;
                    font-size: 1rem;
                    margin-right: 12px;
                    background: #40414f;
                    color: #fff;
                }
                #msg:focus {
                    outline: 2px solid #0078d7;
                }
                button {
                    padding: 12px 24px;
                    border-radius: 8px;
                    border: none;
                    background: #0078d7;
                    color: #fff;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                button:hover {
                    background: #005fa3;
                }
                h2 {
                    color: #ececf1;
                    text-align: center;
                    margin: 0;
                    padding: 15px 0 15px 0;
                }
                @media (max-width: 600px) {
                    #container {
                        max-width: 100vw;
                    }
                    #chat {
                        padding: 8px;
                    }
                    #input-area {
                        padding: 8px;
                    }
                    .bubble {
                        font-size: 0.95rem;
                        padding: 10px 12px;
                    }
                }
            </style>
        </head>
        <body>
            <div id="container">
                <h2>WolfieWTF Chatbot</h2>
                <div id="chat"></div>
                <div id="input-area">
                    <input id="msg" placeholder="Type a message..." onkeydown="if(event.key==='Enter')send()" autocomplete="off" />
                    <button onclick="send()">Send</button>
                </div>
            </div>
            <script>
                function send() {
                    const msgInput = document.getElementById('msg');
                    const msg = msgInput.value;
                    if (!msg.trim()) return;
                    appendMessage('user', msg);
                    msgInput.value = '';
                    fetch('/chat', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ message: msg })
                    })
                    .then(res => res.json())
                    .then(data => {
                        appendMessage('bot', data.response);
                    });
                }
                function appendMessage(sender, text) {
                    const chat = document.getElementById('chat');
                    const div = document.createElement('div');
                    div.className = 'bubble ' + sender;
                    div.innerHTML = (sender === 'user' ? '<b>You:</b> ' : '<b>WolfieWTF:</b> ') + text;
                    chat.appendChild(div);
                    chat.scrollTop = chat.scrollHeight;
                }
            </script>
        </body>
        </html>
    `);
});
// ...existing code...

app.listen(3000, () => {
    console.log('Chatbot web server running at http://localhost:3000');
});