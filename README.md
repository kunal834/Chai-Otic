
# ☕ Chai-Otic – Support Creators, One Cup at a Time

**Chai-Otic** is a full-stack platform that allows creators to receive support from their fans through small one-time payments – inspired by platforms like BuyMeACoffee and Patreon.

Built using the **MERN Stack (MongoDB, Express, React, Node.js)** and integrated with **Razorpay**, Chai-Otic enables a seamless and secure way for supporters to "buy a chai" for their favorite creators.

---

## 🚀 Features

- 👤 Creator profile page with custom message
- 💳 Razorpay integration for real-time payments
- 🛡️ Authentication with NextAuth (GitHub)
- 🗃️ MongoDB for storing users and payments
- 📊 Payment history and analytics (basic)
- 🎨 Responsive UI using Tailwind CSS
- 📨 Email notifications for payments (optional)

---

## 🔧 Tech Stack

| Tech        | Purpose                    |
|-------------|----------------------------|
| **Next.js** | Frontend & Backend (API)   |
| **MongoDB** | Database                   |
| **Razorpay**| Payment Gateway            |
| **NextAuth**| Authentication             |
| **Tailwind**| Styling                    |


--

## 📦 Installation (Development)

```bash
# Clone the repository
git clone https://github.com/your-username/chai-otic.git

# Change directory
cd chai-otic

# Install dependencies
npm install

# Add environment variables in `.env.local`
🛠️ Environment Variables
env
Copy
Edit
MONGODB_URI=your_mongo_connection_string
NEXTAUTH_SECRET=your_auth_secret
NEXTAUTH_URL=http://localhost:3000
GITHUB_ID=your_github_oauth_id
GITHUB_SECRET=your_github_oauth_secret
EMAIL_SERVER_USER=your_email_user
EMAIL_SERVER_PASSWORD=your_email_password
EMAIL_SERVER_HOST=your_email_host
EMAIL_FROM=your_email
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
▶️ Run Locally
bash
Copy
Edit
npm run dev
📁 Folder Structure (Next.js App)
pgsql
Copy
Edit
.
├── app/
│   ├── api/
│   ├── components/
│   ├── models/
│   ├── pages/
│   └── styles/
├── public/
├── utils/
├── .env.local
├── package.json
└── README.md
