const express = require('express');
const QRCode = require('qrcode');
const speakeasy = require('speakeasy');
const bip39 = require('bip39');
const session = require('cookie-session');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  name: 'session',
  keys: ['very-secret-key'],
  maxAge: 24 * 60 * 60 * 1000
}));

// Connect MongoDB
mongoose.connect('mongodb://localhost:27017/qr-login');

// Home
app.get('/', async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const user = await User.findOne({ userId: req.session.userId });
  if (!user) return res.redirect('/login');

  res.send(`<h2>Logged in as: ${user.userId} ✅</h2>`);
});

// QR Login
app.get('/login', async (req, res) => {
  const userId = `user-${Date.now()}`;
  const secret = speakeasy.generateSecret({ name: `QRLogin (${userId})` });
  const recovery = await bip39.generateMnemonic(128); // 11-word phrase

  await User.create({
    userId,
    totpSecret: secret.base32,
    recoveryPhrase: recovery
  });

  const otpauth = secret.otpauth_url;
  const qrDataUrl = await QRCode.toDataURL(otpauth);

  req.session.userId = userId;

  res.send(`
    <h2>Scan with Authenticator</h2>
    <img src="${qrDataUrl}" />
    <form method="POST" action="/verify">
      <input type="text" name="token" placeholder="Enter 6-digit code" />
      <button>Verify</button>
    </form>
    <p><strong>Backup this recovery phrase (only shown once):</strong></p>
    <pre>${recovery}</pre>
  `);
});

// Verify TOTP
app.post('/verify', async (req, res) => {
  const { token } = req.body;
  const user = await User.findOne({ userId: req.session.userId });
  if (!user) return res.status(400).send('User not found.');

  const verified = speakeasy.totp.verify({
    secret: user.totpSecret,
    encoding: 'base32',
    token
  });

  if (verified) {
    return res.redirect('/');
  } else {
    return res.status(401).send('Invalid code.');
  }
});

// Recovery Route
app.post('/recover', async (req, res) => {
  const { phrase } = req.body;
  const user = await User.findOne({ recoveryPhrase: phrase.trim() });

  if (!user) return res.status(404).send('Recovery failed.');

  req.session.userId = user.userId;
  return res.send('✅ Logged in via recovery phrase.');
});

// Logout
app.get('/logout', (req, res) => {
  req.session = null;
  res.send('Logged out.');
});

app.listen(3000, () => {
  console.log('🔥 Server running at http://localhost:3000');
});
