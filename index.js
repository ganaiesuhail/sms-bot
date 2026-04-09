const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

const token = process.env.BOT_TOKEN;
const url = process.env.RENDER_EXTERNAL_URL;

const bot = new TelegramBot(token, { webHook: true });
bot.setWebHook(`${url}/bot${token}`);

const app = express();
app.use(express.json());

// 🚀 START COMMAND (HIGH CONVERSION)
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId,
`👋 Welcome to Core Testing Platform

Yahan aap ek simple system access kar sakte hain jahan:
• Dashboard explore kar sakte hain  
• Activity track kar sakte hain  
• Guided interface use kar sakte hain  

⚡ Fast onboarding + easy access

👇 Continue karne ke liye button use karein`,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "🚀 Continue", callback_data: "continue" }],
          [{ text: "📊 How it works", callback_data: "how" }]
        ]
      }
    }
  );
});

// 🔘 BUTTON HANDLER
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;

  // 👉 CONTINUE FLOW
  if (query.data === "continue") {
    bot.sendMessage(chatId,
`⚡ Step 1: Access Setup

Aapko system access ke liye next step follow karna hoga.

👉 Neeche button click karein aur platform open karein`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "🌐 Open Platform", url: "https://your-link.com" }],
            [{ text: "➡️ Next Step", callback_data: "step2" }]
          ]
        }
      }
    );
  }

  // 👉 STEP 2
  if (query.data === "step2") {
    bot.sendMessage(chatId,
`📊 Step 2: Complete Setup

• Platform open karein  
• Dashboard explore karein  
• Basic setup complete karein  

✅ Ready hone ke baad next continue karein`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "✅ Done", callback_data: "done" }]
          ]
        }
      }
    );
  }

  // 👉 FINAL STEP
  if (query.data === "done") {
    bot.sendMessage(chatId,
`🎉 Setup Complete!

Ab aap system fully access kar sakte hain.

📌 Tip:
Regular activity maintain karein for better experience.

🚀 You're all set!`);
  }

  // 👉 HOW IT WORKS
  if (query.data === "how") {
    bot.sendMessage(chatId,
`📊 How it works:

1. Start → Continue  
2. Platform access  
3. Dashboard use  
4. Activity track  

💡 Simple aur beginner friendly system`);
  }

  bot.answerCallbackQuery(query.id);
});

// 🌐 WEBHOOK ROUTE
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// HEALTH CHECK
app.get("/", (req, res) => {
  res.send("Bot is live 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
