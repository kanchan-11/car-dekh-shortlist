# Car Shortlist Copilot (Indian Market Decision Assistant)

**Car Shortlist Copilot** is a full-stack decision-support web application designed to help confused car buyers transition from "I don't know what to buy" to "I'm confident about my shortlist." 

Instead of a generic car listing catalog, the app acts as a structured decision assistant:
1. It measures the user's current purchase confidence.
2. Guides them through a multi-step preference wizard (budget, body style, seating capacity, fuel, transmission, must-have features).
3. Lets them weigh their personal priorities (Price vs. Running Costs vs. Safety vs. Technology vs. Owner Reviews).
4. Runs a backend Multi-Criteria Decision Analysis (MCDA) to score and rank options.
5. Displays custom-generated explanations for the compatibility score and highlights winner parameters in side-by-side comparisons.

---

## 🚀 Running the Project in Under 2 Minutes

### Method A: Docker Compose (Easiest - Zero Installation)
If you have Docker and Docker Compose installed:
1. Open your terminal in the project root directory.
2. Build and launch the containers:
   ```bash
   docker compose up --build
   ```
   *Note: The `--build` flag compiles the custom backend JRE and frontend Nginx containers with the latest source code.*
3. The backend container compiles the Spring Boot code, and the frontend container compiles the Vite static files and serves them via Nginx on port `5173`.
4. Open the application at [http://localhost:5173](http://localhost:5173).
5. **Stopping the App**: To stop and clean up containers, run:
   ```bash
   docker compose down
   ```

---

### Method B: Local Startup Scripts
#### Prerequisites
- **Java 17 Development Kit (JDK)**
- **Maven** (for compiling backend)
- **Node.js** (v18+ recommended)
- **PowerShell / Cmd** (Windows OS environment)

#### Quick Start (Automatic)
The project comes with automated startup scripts in the root directory:
- **Option A (Double-Click Batch File)**: Double-click `run.bat` to launch both the backend (port 8080) and frontend (port 5173) in separate console windows.
- **Option B (PowerShell Script)**: Open PowerShell as Administrator, navigate to the root directory, and run:
  ```powershell
  ./run.ps1
  ```

#### Manual Start (If needed)
1. **Backend**:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
2. **Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

### Access URLs
- **Frontend Web App**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:8080/api/cars](http://localhost:8080/api/cars)
- **H2 In-Memory Console**: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)  
  *Connection details:* JDBC URL: `jdbc:h2:mem:cardb` | Username: `sa` | Password: (empty)

---

## 🛠️ Tech Stack & Design Choices

- **Backend**: **Spring Boot 3.3.0** REST API + **Spring Data JPA**. Standard repository-service-controller pattern for enterprise readiness, validation, and structured logic.
- **Frontend**: **React 18 + TypeScript + Vite**. TypeScript ensures typed interfaces (`Car`, `RecommendationRequest`, `RecommendationResponse`) to prevent UI errors when data is received from the backend.
- **Database**: **H2 In-Memory Database**. Chosen for the interview MVP to eliminate database installation barriers. The H2 instance seeds data on startup.
- **Styling**: **Vanilla CSS**. Follows modern design rules using a deep slate background (`#0a0e1a`), neon purple/indigo borders, frosted glass effects (`backdrop-filter`), flex/grid layouts, and custom animations. No external UI libraries or Tailwind CSS were used.

---

## 📊 Seed Dataset & Data Sources (Indian Market Focus)

The database is seeded on startup with **15 popular Indian passenger vehicles** spanning Hatchbacks, Sedans, SUVs, and MUVs across Petrol, Diesel, CNG, and Electric options.

The dataset parameters are compiled and synthesized from the following industry sources:
1. **Pricing & Technical Specifications**: Sourced from **CarDekho.com** and **CarWale.com** (representing ex-showroom prices in Lakhs INR, engine displacements in cc, power outputs in Bhp, and transmission configurations).
2. **Safety Ratings**: Sourced from **Global NCAP (New Car Assessment Programme)** and **Bharat NCAP** test results archives (representing adult crash safety star ratings from 1 to 5).
3. **ARAI Fuel Economy (Mileage)**: Sourced from ARAI-certified manufacturer claims published by **Autocar India** (ICE vehicles in kmpl, Electric range in km per full charge).
4. **User Sentiment & Reviews**: Synthesized rating scores (1.0 to 5.0) and review counts compiled by aggregating owner feedback patterns from major Indian forums like **Team-BHP** and CarDekho user reviews.

---

## 🧠 AI-Assisted vs. Manual Development Balance

### What the AI Handled
- **Boilerplate Setup**: Scaffolding Vite project configurations, generating Spring Boot DTO objects, and mapping entity models.
- **Data Entry**: Compiling the detailed seed dataset mapping all 15 cars, specifications, Unsplash image links, and feature lists.
- **CSS Layout Base**: Writing baseline CSS declarations for flex grids, custom range inputs, and circular progress gauges.

### What was Done Manually
- **Multi-Criteria Ranking Algorithm**: Formulating the math for normalizing price vs mileage (which differs for EVs) to compute consistent weighted percentages.
- **Fallback Filtering Logic**: Adding safety catches on the backend so that if a user sets filters too strictly, cars that fail a filter are penalized but still shown, ensuring the user gets "Next Best Alternative" suggestions rather than an empty page.
- **TypeScript Type Safety**: Aligning the REST JSON objects with TypeScript interfaces (`types/index.ts`) to avoid runtime crashes.
- **Advantage Highlighter**: Designing the frontend logic that scans the shortlist side-by-side and automatically highlights which car is the cheapest, has the best safety, has the best mileage, or has the most features.

---

## ✂️ Product Scope: What Was Built & Cut

### What was Built (The Core MVP)
- **Interactive Confidence Slider**: Gauges user starting frustration.
- **Dynamic Feature Fetching**: The wizard queries the backend for all distinct available must-have features so it remains data-driven.
- **Backend MCDA Engine**: Calculates weighted compatibility.
- **Dynamic Explanations**: Generates custom matching bullet points on the backend (e.g. telling you how much money you save or highlights family safety NCAP scores).
- **Side-by-Side Comparison**: Lists specifications of saved cars and highlights category winners in green.
- **Full Catalog Catalog**: Searchable/filterable index of all cars as a quick fallback.

### What was Cut (For Scoping)
- **User Authentication / Saved Profiles**: Bypassed using a local H2 schema. Saving works instantly in the current browser session.
- **Location-Based On-Road Pricing**: Regional RTO taxes and insurance calculations were cut to keep ex-showroom price numbers standardized.
- **Dealer Contact Integration**: Avoided dummy forms; focused entirely on the buyer's evaluation experience.

---

## 🚀 With 4 More Hours, I Would Add:

1. **Total Cost of Ownership (TCO) Calculator**:
   - Integrate depreciation curves, regional road tax, insurance estimates, and annual maintenance averages to show a 5-year running cost comparison chart (visualized in Chart.js).
2. **AI Chat Assistant (Gemini/Claude Integration)**:
   - Add a chat drawer where users can ask conversational questions about their shortlist (e.g., *"Is the Verna DCT or Creta Automatic better for bumper-to-bumper Bangalore traffic?"*), querying the seeded specs and forum discussions using RAG.
3. **Dynamic Variant Exploder**:
   - Instead of listing a single model variant, map all sub-variants (XE, XM, XT, XZ) and help users identify if moving up a variant is worth their money.
4. **Persisted Shortlist Sharing**:
   - Add Supabase backend integration to generate unique shareable URL links for shortlists so buyers can share their list with family/friends for input.
