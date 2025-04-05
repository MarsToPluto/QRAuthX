### 📘 `README.md`

```markdown
# 🔐 QRAuthX

**Scan. Verify. Secure.**  
A secure and modern authentication system inspired by WhatsApp Web. Built with **Node.js**, **Express**, **MongoDB (Mongoose)**, and **Speakeasy** for TOTP authentication.

---

## 🔍 Overview

**QRAuthX** allows users to:

- 📷 Log in via QR codes
- 🔐 Verify with 6-digit TOTP codes (Google Authenticator, Authy, etc.)
- 🧠 Recover access using 11-word recovery phrases
- ⚙️ Easily integrate into SaaS tools, internal dashboards, or wallets

It’s lightweight, extendable, and production-ready with secure cryptographic practices.

---

## 🚀 Tech Stack

- **Backend:** Node.js + Express
- **Database:** MongoDB (via Mongoose)
- **2FA:** Speakeasy (TOTP)
- **QR Generation:** qrcode
- **Recovery Phrases:** bip39
- **Sessions:** cookie-session

---

## 🧑‍💻 Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/QRAuthX.git
   cd QRAuthX
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start MongoDB** (Make sure it's running locally or use Atlas)

4. **Run the server**
   ```bash
   node server.js
   ```

5. **Visit in browser**
   ```
   http://localhost:3000/login
   ```

---

## 📸 Screenshots

Coming soon...

---

## 🧠 Recovery Phrase

We use `bip39` to generate secure 11-word phrases. These are shown **only once** on QR setup. Losing them will require admin-side recovery or account reset.

---

## ✅ To-Do

- [ ] Add WebSocket-based real-time QR status
- [ ] Integrate frontend (React/Vue)
- [ ] Device binding with fingerprinting
- [ ] JWT support for APIs

---

## 📄 License

MIT License

---

## 🧪 Developed by

Pluto 👨‍💻  
https://github.com/MarsToPluto  
```

---

### 🔹 Short GitHub Description:

> Secure QR-based login system with 2FA and 11-word recovery phrases. Built using Node.js, Express, MongoDB, and TOTP. Inspired by WhatsApp Web login flow.