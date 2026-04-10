# AI Job Automation Backend

An AI-powered backend system that automates job application workflows, including resume parsing, job description extraction, AI-based analysis, resume generation, and email sending with attachments. The system is designed using Node.js, BullMQ queues, Redis, and AI services to handle scalable background processing.

---

## 🚀 Features

* 📄 Resume PDF parsing and text extraction
* 🧠 AI-powered job description analysis
* 📊 AI-generated career report based on Resume + Job Description (includes interview questions + preparation plan)
* ✉️ Automated email generation for HR outreach
* 📎 Attach resume PDF in email
* 🔁 Queue-based background processing (BullMQ)
* ⚡ Retry handling for failed jobs
* 📊 Structured report generation based on job match
* 🧩 Modular worker architecture (scalable design)

---

## 🏗️ Architecture Overview

```
Client → API Server → Redis Queue (BullMQ) → Workers → AI Services → Email Service
```

### Flow:

1. User submits resume + job description
2. System also triggers AI report generation (interview questions + preparation roadmap)
3. Job is added to queue
4. Job is added to queue
5. Worker picks job from queue
6. System extracts resume content
7. AI analyzes job match + generates email
8. Email is sent to recruiter with resume PDF
9. Report is stored/generated

---

## 🧰 Tech Stack

* **Backend:** Node.js, Express.js
* **Queue System:** BullMQ
* **Database/Cache:** Redis
* **AI Integration:** Google GenAI / OpenAI (custom service layer)
* **PDF Processing:** pdf-parse / puppeteer (as needed)
* **Email Service:** Nodemailer (or SMTP provider)
* **Runtime:** Docker (optional for deployment)

---

## 📁 Project Structure

```
backend/
│
├── src/
│   ├── config/          # Redis, DB config
│   ├── workers/         # BullMQ workers
│   ├── queues/          # Queue definitions
│   ├── services/        # AI, email, PDF services
│   ├── controllers/     # API controllers
│   ├── routes/          # Express routes
│   ├── utils/           # Helper functions
│   └── app.js           # Entry point
│
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone <repo-url>
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create `.env` file:

````env
PORT=5000

# Database
MONGO_URL=your_mongodb_connection_string

# Auth
JWT_SECRET=your_jwt_secret

# Redis
REDIS_USERNAME=your_redis_username
REDIS_PASSWORD=your_redis_password
REDIS_HOST=your_redis_host
REDIS_PORT=6379

# Email Service
EMAIL_USER=your_email
EMAIL_PASS=your_email_password

# AI Service
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
```env
PORT=5000
REDIS_URL=redis://localhost:6379
GOOGLE_GENAI_API_KEY=your_key
SMTP_HOST=your_smtp_host
SMTP_USER=your_email
SMTP_PASS=your_password
````

### 4. Start Redis

Make sure Redis is running locally or via Docker:

```bash
docker run -d -p 6379:6379 redis
```

### 5. Run Server

```bash
npm run dev
```

---

## 🔄 Queue Workflow (Important)

* Each job goes through BullMQ queue
* If a job fails, it is retried automatically
* Workers ensure isolated execution per job
* Avoids blocking main API thread

---

## ⚠️ Known Considerations

* AI API calls should be optimized to avoid duplicate processing
* Retry logic must prevent repeated AI cost spikes
* Large PDFs may require streaming optimization
* Rate limiting is recommended for email sending

---

## 🧠 Future Improvements

* 🔥 Bulk job application system (50+ jobs automation)
* 📊 Dashboard for tracking applications
* 🤖 Smarter AI scoring system for resume-job match
* 📬 Email templates customization
* 🧾 Database persistence for applied jobs

---

## 👨‍💻 Author

Built by a full-stack developer exploring AI automation in job applications.

---

## 📌 License

MIT License (or specify your own)
