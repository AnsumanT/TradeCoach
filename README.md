# 🚀 TradeCoach

TradeCoach is an AI-powered trading coach that helps traders analyze their trading history, identify behavioral patterns, and improve decision-making.

Unlike traditional trading journals, TradeCoach automatically imports trading history from exchanges and provides AI-driven insights into performance, risk management, and trading psychology.

---

## ✨ Features

- 🔐 Secure authentication with Delta Exchange API
- 📈 Import historical trading data
- 💰 View wallet balances
- 📊 Trading analytics (Coming Soon)
- 🤖 AI-powered trading coach (Coming Soon)
- 📉 Performance metrics and reports (Coming Soon)

---

## 🛠 Tech Stack

### Backend

- Python
- FastAPI
- HTTPX
- Pydantic
- Uvicorn

### AI

- OpenAI API _(planned)_

### Database

- SQLite _(development)_
- PostgreSQL _(planned)_

---

## 📂 Project Structure

```
TradeCoach
│
├── backend
│   ├── app
│   ├── integrations
│   ├── routers
│   ├── config
│   └── main.py
│
└── frontend (Coming Soon)
```

---

## ⚙️ Setup

### Clone the repository

```bash
git clone <repository-url>
cd TradeCoach
```

### Create virtual environment

```bash
cd backend

python -m venv .venv
```

### Activate

Windows

```bash
.venv\Scripts\activate
```

Mac/Linux

```bash
source .venv/bin/activate
```

### Install dependencies

```bash
pip install -r requirements.txt
```

### Create environment variables

Create a file named:

```
backend/.env
```

using

```
backend/.env.example
```

---

## ▶️ Run

```bash
uvicorn app.main:app --reload
```

Swagger UI

```
http://127.0.0.1:8000/docs
```

---

## 📅 Roadmap

- [x] Delta Exchange Authentication
- [x] Wallet Balance Integration
- [x] Order History Integration
- [ ] Automatic Trade Import
- [ ] Database Storage
- [ ] Trading Analytics
- [ ] AI Trade Coach
- [ ] Trading Journal
- [ ] Multi Exchange Support
- [ ] Portfolio Dashboard

---

## 📄 License

MIT License
