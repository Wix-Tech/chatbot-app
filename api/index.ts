import { VercelRequest, VercelResponse } from '@vercel/node';
import ChatController from '../src/controllers/chatController';
const chatController = new ChatController();

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method === 'POST') {
        const userMessage = req.body.message;
        if (!userMessage) {
            return res.status(400).json({ error: 'Message is required' });
        }
        // Await the response here:
        const response = await chatController.handleUserMessage(userMessage, true);
        return res.json({ response });
    }

    // Serve the HTML UI for GET /
    if (req.method === 'GET') {
        return res.send(`
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
                #chat {
                    min-height: 200px;
                    max-height: 70vh;
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
            <div id="loader-screen" style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:#343541;display:flex;align-items:center;justify-content:center;z-index:1000;">
                <div style="color:#fff;font-size:2rem;">Loading...</div>
            </div>
            <div id="container">
                <div style="text-align:center;">
                    <img src="https://files.catbox.moe/gw4etg.jpeg" 
                        style="height:48px;width:48px;margin-bottom:4px;border-radius:50%;object-fit:cover;vertical-align:middle;box-shadow:0 2px 8px #2223;" 
                        alt="WolfieWTF Logo">
                    <h2 style="display:inline-block;vertical-align:middle;margin-left:10px;margin-bottom:0;">WolfieWTF Chatbot</h2>
                </div>
                <div id="input-area">
                    <input id="msg" placeholder="Type a message..." onkeydown="if(event.key==='Enter')send()" autocomplete="off" />
                    <button onclick="send()">Send</button>
                </div>
            </div>
            <script>
    function send() {
        const msgInput = document.getElementById('msg');
        const sendBtn = document.querySelector('button');
        const chat = document.getElementById('chat');
        const msg = msgInput.value;
        if (!msg.trim()) return;
        appendMessage('user', msg, false);
        msgInput.value = '';
        msgInput.disabled = true;
        sendBtn.disabled = true;

        // Show loading indicator
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'bubble bot';
        loadingDiv.id = 'loading';
        loadingDiv.innerText = 'WolfieWTF is typing...';
        chat.appendChild(loadingDiv);
        chat.scrollTop = chat.scrollHeight;

        fetch('/api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: msg })
        })
        .then(res => res.json())
        .then(data => {
            // Add a 30-second delay for the bot's response
            setTimeout(() => {
                // Remove loading indicator
                const loading = document.getElementById('loading');
                if (loading) loading.remove();

                // Append the bot's response
                appendMessage('bot', data.response, true);

                // Re-enable input and send button after response
                msgInput.disabled = false;
                sendBtn.disabled = false;
            }, 3000); // 30-second delay
        });
    }

    function appendMessage(sender, text, scroll = false) {
        const chat = document.getElementById('chat');
        const div = document.createElement('div');
        div.className = 'bubble ' + sender;
        div.innerHTML = (sender === 'user' ? '<b>You:</b> ' : '<b>WolfieWTF:</b> ') + text;
        chat.appendChild(div);
        if (scroll) {
            chat.scrollTop = chat.scrollHeight;
        }
    }
        window.onload = function() {
            setTimeout(() => {
                document.getElementById('loader-screen').style.display = 'none';
            }, 2000); // 2-second delay
};</script>
        </body>
        </html>
        `);
    }

    res.status(404).send('Not found');
}
