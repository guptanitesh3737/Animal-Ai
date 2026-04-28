# WildGuard AI: Intelligent Wildlife Conflict Mitigation System

**Winner Submission for eSewa x WWF Hackathon 2026**

## 🎯 Overview
WildGuard AI is a comprehensive AI-powered wildlife detection and real-time early warning system designed to mitigate human-wildlife conflict accurately and sustainably. By combining edge AI vision, geospatial intelligence, and eco-fintech integration with eSewa, we provide a 360-degree solution for conservationists and communities.

## 🚀 Key Features
- **Neural Detection Engine**: Real-time species identification using Gemini 1.5 Flash Vision.
- **Geospatial Risk Mapping**: Visualizing animal corridors and high-risk zones.
- **Early Warning System (EWS)**: Autonomous SMS blasts and siren triggers.
- **eSewa Eco-Fintech**: Instant compensation payouts for crop damage and conservation rewards.

## 🛠 Tech Stack
- **Frontend**: React 18, Tailwind CSS, Framer Motion, Recharts.
- **Backend**: Node.js (Express), Gemini API.
- **Maps**: Leaflet.js.
- **AI/ML**: Google Gemini (Vision Model).

## 📦 Getting Started

### Prerequisites
- Node.js installed.
- Gemini API Key (set in environment).

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure
- `/src/components/views`: Core dashboard modules.
- `/src/services`: AI and API integrations.
- `/server.ts`: Express backend handling geospatial stats.
- `/submission`: Hackathon-specific deck, scripts, and summaries.
