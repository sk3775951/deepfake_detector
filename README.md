
---
``` text

frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── logo.svg
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   └── Tabs.jsx
│   │   ├── verify/
│   │   │   ├── UploadBox.jsx
│   │   │   ├── VerifyInfoCards.jsx
│   │   │   ├── TrustScoreMeter.jsx
│   │   │   ├── VerificationResults.jsx
│   │   │   └── LayerAnalysis.jsx
│   │   ├── watermark/
│   │   │   └── WatermarkPanel.jsx
│   │   └── about/
│   │       └── SwissCheeseModel.jsx
│   ├── pages/
│   │   └── VeriMedia.jsx
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── mockAnalyzer.js
│   ├── hooks/
│   │   └── useMediaVerification.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── package.json
├── vite.config.js
└── README.md


---
``` text
backend/
├── server.js
├── app.js
├── config/
│   ├── db.js
│   └── ai.config.js
├── models/
│   ├── User.js
│   └── Verification.js
├── routes/
│   ├── auth.routes.js
│   └── verify.routes.js
├── controllers/
│   ├── auth.controller.js
│   └── verify.controller.js
├── middleware/
│   └── auth.middleware.js
├── uploads/
├── .env
└── package.json