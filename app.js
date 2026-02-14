const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Premium CI/CD App</title>
            <style>
                :root {
                    --primary: #6366f1;
                    --bg: #0f172a;
                    --card: #1e293b;
                    --text: #f8fafc;
                }
                body {
                    margin: 0;
                    font-family: 'Inter', system-ui, sans-serif;
                    background-color: var(--bg);
                    color: var(--text);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    overflow: hidden;
                }
                .container {
                    background: var(--card);
                    padding: 3rem;
                    border-radius: 20px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    text-align: center;
                    border: 1px solid rgba(255,255,255,0.1);
                    backdrop-filter: blur(10px);
                    animation: fadeIn 0.8s ease-out;
                }
                h1 {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                    background: linear-gradient(to right, #818cf8, #c084fc);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                p {
                    color: #94a3b8;
                    font-size: 1.2rem;
                }
                .badge {
                    display: inline-block;
                    padding: 0.5rem 1rem;
                    background: rgba(99, 102, 241, 0.2);
                    color: var(--primary);
                    border-radius: 99px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    margin-bottom: 2rem;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="badge">Amazon Linux 2023 Optimized</div>
                <h1>CI/CD is Live!</h1>
                <p>Built with Jenkins, Docker, and AWS</p>
            </div>
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
