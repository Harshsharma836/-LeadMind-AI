

# 🧠 LeadMind AI

### 🚀 Overview

LeadMind AI is a backend service that scores leads using rule-based logic + AI reasoning (Groq API). Upload offers and CSV leads → get smart intent predictions (High / Medium / Low) with reasoning.
---

### ⚙️ Setup

Create `.env` file:

```
PORT=8000
GROQ_API_KEY=your_groq_api_key_here
```

Run:

```bash
npm start
```

---

---

### 📤 APIs

**POST /api/offer**
Create offer

```json
{
  "name": "AI Outreach Automation",
  "value_props": ["24/7 outreach", "6x more meetings"],
  "ideal_use_cases": ["B2B SaaS mid-market"]
}
```

**POST /api/leads/upload**
Upload CSV with strict columns:
`name,role,company,industry,location,linkedin_bio`

**POST /api/score/offer/:offerId**
Score leads for a specific offer
Example: `/api/score/offer/13`

**GET /api/score/scores**
Get all scored leads

**GET /api/score/export**
Get all scores in CSV

---

### 🧮 Scoring Logic

* **Rule Layer (50 pts)** → role, industry, data completeness
* **AI Layer (50 pts)** → intent classification (High=50, Medium=30, Low=10)
* **Final Score = rule_score + ai_points**

---

### 🧠 AI Key

Get key: [Groq Console](https://console.groq.com/dashboard/metrics)

---

### 📬 Postman Collection

[View Collection](https://planetary-firefly-68128.postman.co/workspace/ReactNode-Sandbox~f0fb762f-6a16-475c-9fa3-136a687c5fa0/collection/30161518-dab7ee28-f04f-4e25-b0ef-d105b4765683?action=share&creator=30161518)


### Deployed Link : https://leadmind-ai.onrender.com/
---

### Postman Screenshots 

<img width="1368" height="912" alt="Screenshot 2025-10-30 145710" src="https://github.com/user-attachments/assets/68ace354-bdbb-4b21-953a-1be4b9babf92" />

<img width="1382" height="868" alt="Screenshot 2025-10-30 145728" src="https://github.com/user-attachments/assets/b9e54c6f-829f-4562-ae90-3e1de08fd34f" />

<img width="1391" height="871" alt="Screenshot 2025-10-30 145753" src="https://github.com/user-attachments/assets/d05e2597-e13f-4520-9738-96c50d959a3d" />

<img width="1375" height="882" alt="Screenshot 2025-10-30 145828" src="https://github.com/user-attachments/assets/d8cfe528-749e-4929-aff8-c6830543df87" />

---

### 👨‍💻 Author

**Harsh Sharma**
[LinkedIn](https://www.linkedin.com/in/harshsharma3/) • [GitHub](https://github.com/Harshsharma836)

---
