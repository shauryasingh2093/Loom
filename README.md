# Loom 

Loom is an interactive, prototype application designed to help users visualize and untangle their stress through "threads". Users can track their tensions across mind, body, and environment, and release them via a unique, calming digital journaling/scribbling experience.

### Features
*   **Thread Visualization:** Visual scales that represent your current state of tension.
*   **Journaling/Scribbling:** A canvas feature to draw and express what words cannot hold.
*   **State Persistence:** Stores stress and journaling data locally to remember your progress on return.

### Prototype Links
* **Interactive Figma Site:** [View the prototype design here](https://trim-dude-63805125.figma.site)
* **Original Figma Design:** [Figma Workspace](https://www.figma.com/design/YKkaFutn8frlMYJOXLXMOy/Figbuild_hackathon_loom)

---

## 🛠 Tech Stack

This project was built focusing on the frontend experience. 

### Core Technologies
*   **Framework:** React 18 (with React-Router v7)
*   **Build Tool:** Vite v6
*   **Language:** TypeScript
*   **Styling:** TailwindCSS v4 with Emotion & clsx

### State & Local Storage
*   Variables around tension, completed threads, and user scribbles are persisted using the browser's native `localStorage`. There is no cloud backend, meaning all data is safe and local to the device running the app.

### UI & Animations
*   **Animation Framework:** Motion (Framer Motion)
*   **Components:** Radix UI Primitives (Accordion, Dialog, Tabs, etc.)
*   **Icons:** Lucide React & Material UI Icons
*   **Charts/Visualizations:** Recharts
*   **Other:** Embla Carousel React, React-Resizable-Panels, Sonner (for Toasts)

---

## 🚀 Running the code locally

1. Clone this repository (or unzip the code bundle) and navigate into the folder:
   ```bash
   cd Loom-main
   ```

2. Install all dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the `localhost` URL provided in your terminal to view the application in your browser.
