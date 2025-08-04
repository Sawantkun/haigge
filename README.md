# Haigge.com

A modern React + Vite single-page application (SPA) with Firebase authentication, Firestore data storage, and real-time features. Built for seamless user experience and scalable e-commerce functionality.

## Features

- **Firebase Authentication**: Email/password signup, login, logout, password reset
- **User Profiles**: Stored in Firestore, editable, real-time sync
- **Cart**: Add, update, remove items; real-time updates
- **Wishlist**: Add/remove items, persistent per user
- **Orders**: Create and view order history
- **SPA Routing**: Client-side navigation with React Router
- **Toast Notifications**: User feedback for actions
- **Responsive UI**: Built with Tailwind CSS
- **Vercel Hosting**: SPA routing fixed via `vercel.json`

## Tech Stack

- React
- Vite
- Firebase (Auth, Firestore, Storage)
- Tailwind CSS
- React Toastify
- Vercel (for deployment)

## Getting Started

1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/haigge.git
   cd haigge/Frontend
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure Firebase**
   - Create a `.env` file in `Frontend/`:
     ```env
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     ```

4. **Run locally**
   ```sh
   npm run dev
   ```
   Visit [http://localhost:5173](http://localhost:5173)

5. **Deploy to Vercel**
   - Make sure `vercel.json` is present in the project root:
     ```json
     {
       "rewrites": [
         { "source": "/(.*)", "destination": "/" }
       ]
     }
     ```
   - Push to your GitHub repo and connect to Vercel for automatic deployment.

## Project Structure

```
Frontend/
  ├── src/
  │   ├── components/
  │   ├── hooks/
  │   ├── pages/
  │   ├── services/
  │   ├── assets/
  │   ├── main.jsx
  │   ├── App.jsx
  │   └── index.css
  ├── public/
  ├── firebase.js
  ├── .env
  ├── package.json
  ├── vite.config.js
  ├── vercel.json
  └── README.md
```

## Customization
- Update Firebase rules for security.
- Extend Firestore models for more features.
- Style with Tailwind CSS for a unique look.

## License
MIT

---

**Haigge.com** — Curated for the way you live.
