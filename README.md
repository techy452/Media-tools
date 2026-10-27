# Media Converter Starter (कानूनी/अधिकृत मीडिया के लिए)

यह शुरुआती scaffold है, पूरी production वेबसाइट नहीं। इसे मोबाइल से GitHub पर upload करके किसी cloud development/deployment service में आगे बढ़ाया जा सकता है।

## अभी क्या काम करता है
- मोबाइल-फ्रेंडली फ्रंटएंड
- URL इनपुट और backend health check
- FastAPI backend
- सुरक्षित शुरुआती validation (केवल http/https URL)
- Docker setup

## क्या अभी शामिल नहीं है
- YouTube/Instagram/Facebook से डाउनलोड निकालने वाला connector
- login/admin analytics/payment/ads
- production queue, autoscaling, antivirus scanning, abuse prevention
- एक लाख दैनिक users के लिए load-tested infrastructure

किसी प्लेटफॉर्म के नियमों या access controls को bypass करने के लिए इस scaffold को इस्तेमाल न करें। केवल ऐसे मीडिया पर processing जोड़ें जिसे डाउनलोड/कन्वर्ट करने का अधिकार हो या जिसकी अनुमति हो।

## मोबाइल से अगला कदम
1. ZIP को extract करें या GitHub repository में files upload करें।
2. Backend को ऐसे Python host पर deploy करें जो Docker/FastAPI support करता हो।
3. Frontend को static hosting/Next-compatible hosting पर deploy करें।
4. Frontend में `API_BASE_URL` को deployed backend URL से बदलें।
5. Production से पहले rate limits, file-size limits, authentication/admin security, monitoring और load testing जोड़ें।

## Local run (यदि बाद में computer/cloud shell उपलब्ध हो)
Backend:
    cd backend
    pip install -r requirements.txt
    uvicorn app.main:app --host 0.0.0.0 --port 8000

Frontend:
    cd frontend
    npm install
    npm run dev

यह starter जानबूझकर remote media download नहीं करता; पहले architecture और UI सुरक्षित तरीके से स्थापित करता है।
