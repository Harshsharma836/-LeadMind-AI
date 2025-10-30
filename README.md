

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

### 👨‍💻 Author

**Harsh Sharma**
[LinkedIn](https://www.linkedin.com/in/harshsharma3/) • [GitHub](https://github.com/Harshsharma836)

---
