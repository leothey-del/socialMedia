# Social Media App

Welcome to the Social Media App! This project is a modern, full-stack social platform where users can create posts, view a feed, and interact with content in a clean, responsive interface.

## Features
- User authentication (login/logout)
- Create, view, and interact with posts
- Responsive, mobile-friendly design
- Protected routes for authenticated users
- Modern UI/UX with React and Tailwind CSS

## Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm or yarn

### Installation
1. Clone this repository:
   ```sh
   git clone <your-repo-url>
   cd socialMedia
   ```
2. Install dependencies for both frontend and backend:
   ```sh
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

### Running the App
1. Start the backend services:
   ```sh
   cd backend/auth-service
   npm start
   # In a new terminal:
   cd ../posts-service
   npm start
   # In a new terminal:
   cd ../../gateway
   npm start
   ```
2. Start the frontend:
   ```sh
   cd frontend
   npm run dev
   ```
3. Open your browser and go to `http://localhost:5173` (or the port shown in your terminal).

## Folder Structure
- `frontend/` — React app (UI, routes, components)
- `backend/` — Node.js/Express microservices (auth, posts, gateway)

## Customization
Feel free to update styles, add new features, or change the branding to fit your needs. The code is organized for easy extension and maintenance.

## License
This project is open source and free to use for learning or as a starter for your own social platform.

---

Enjoy building and customizing your social media app!
