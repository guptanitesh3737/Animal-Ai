# Judge Q&A Preparation

### 1. Why this solution over existing camera traps?
Traditional camera traps are "passive record-and-collect" devices. Data is often retrieved weeks later. WildGuard AI is "active-inference," meaning it processes data the moment it's captured and acts on it in real-time.

### 2. How scalable is the AI model?
By using Gemini 1.5 Flash via a cloud-based API, we eliminate the need for expensive GPU hardware in the forest. Sensors only need a minimal data connection to upload image compression, making it globally scalable with the existing cellular infrastructure.

### 3. How do you prevent False Positives during the alert phase?
Our system uses a multi-tier verification. Highly confident detections trigger "soft alerts," while lower confidence ones are flagged for immediate human-warden verification in the dashboard before a global siren is triggered.

### 4. How does the eSewa integration ensure fairness?
Claims are timestamped and geolocated with the AI detection event. This create a verifiable "Conservation Ledger" that prevents fraudulent claims while ensuring that the right relief reaches the right farmer instantly.

### 5. What happens during low connectivity?
The system is built on a "Local-First" architecture. Critical siren triggers can be handled by localized edge-nodes, while full data sync to the central dashboard and eSewa payouts occurs as soon as the mesh network restores a gateway connection.
