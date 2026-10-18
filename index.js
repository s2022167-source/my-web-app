const express = require('express');
const Unblocker = require('unblocker');

const app = express();
const unblocker = Unblocker({ prefix: '/proxy/' });

app.use(unblocker);

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <meta charset="UTF-8">
      <title>Web Tool</title>
      <style>
        body { font-family: sans-serif; text-align: center; padding-top: 50px; background: #f4f4f9; }
        input { width: 320px; padding: 10px; font-size: 16px; border: 1px solid #ccc; border-radius: 4px; }
        button { padding: 10px 20px; font-size: 16px; background: #0070f3; color: white; border: none; border-radius: 4px; cursor: pointer; }
      </style>
    </head>
    <body>
      <h2>Web Access Tool</h2>
      <form onsubmit="event.preventDefault(); go();">
        <input type="text" id="targetUrl" placeholder="https://example.com">
        <button type="submit">移動</button>
      </form>
      <script>
        function go() {
          const url = document.getElementById('targetUrl').value;
          if (!url) return alert('URLを入力してください');
          let target = url;
          if (!target.startsWith('http://') && !target.startsWith('https://')) {
            target = 'https://' + target;
          }
          window.location.href = '/proxy/' + target;
        }
      </script>
    </body>
    </html>
  `);
});

module.exports = app;
