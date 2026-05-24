#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function loadLocalEnv() {
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    return;
  }

  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) {
      continue;
    }

    const separatorIndex = trimmed.indexOf('=');
    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^['"]|['"]$/g, '');

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

async function main() {
  loadLocalEnv();

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const message = process.argv.slice(2).join(' ').trim()
    || 'MAS MVP: progress update from local development.';

  if (!token || !chatId) {
    console.log('Telegram progress skipped: TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are not set.');
    console.log(`Message: ${message}`);
    return;
  }

  if (typeof fetch !== 'function') {
    console.error('Telegram progress failed: this Node.js version does not provide global fetch.');
    process.exitCode = 1;
    return;
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error(`Telegram progress failed: ${response.status} ${response.statusText}`);
    console.error(body);
    process.exitCode = 1;
    return;
  }

  console.log('Telegram progress sent.');
}

main().catch((error) => {
  console.error('Telegram progress failed:', error);
  process.exitCode = 1;
});
