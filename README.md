# FlixStream - MERN Stack Movie Streaming Website

A full-featured movie streaming platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js) using the TMDB API.

## Features

- **Browse Movies**: Trending, Popular, Top Rated, Upcoming, Now Playing
- **Search**: Live search suggestions with debouncing
- **Movie Details**: Full movie info including cast, crew, trailer, ratings, runtime
- **Genres**: Browse by genre with sorting options
- **Authentication**: Register, Login, Forgot/Reset Password
- **User Features**: Favorites, Wishlist, Profile management
- **Admin Panel**: Dashboard with analytics, user management
- **Theme**: Dark/Light mode with localStorage persistence
- **Responsive**: Works on desktop, tablet, and mobile
- **Performance**: Lazy loading, code splitting, pagination

## Tech Stack

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication + bcrypt
- Helmet, CORS, Morgan, Rate Limiter
- Express Validator, Nodemailer

### Frontend
- React 18 + Vite
- React Router v6
- Axios with interceptors
- React Hook Form + Yup (form validation)
- Recharts (analytics charts)
- React Icons
- Context API for state management

## Prerequisites

- Node.js >= 18
- MongoDB (local or Atlas)
- TMDB API key (free - [get one here](https://www.themoviedb.org/settings/api))

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repo-url>
cd movie-streaming
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/movie-streaming
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7
TMDB_API_KEY=your_tmdb_api_key_here
TMDB_BASE_URL=https://api.themoviedb.org/3
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd client
npm install
```

### 4. Run the Application

**Start the backend:**
```bash
cd server
npm run dev
```

**Start the frontend (in a new terminal):**
```bash
cd client
npm run dev
```

The app will be available at `http://localhost:5173`

### 5. Create Admin User

Send a POST request to `/api/auth/register` with:
```json
{
  "name": "Admin",
  "username": "admin",
  "email": "admin@example.com",
  "password": "password123"
}
```

Then update the user's role to `admin` in MongoDB:
```bash
mongosh movie-streaming
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } })
```

## Project Structure

```
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── api/           # Axios instance & API calls
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React contexts (Auth, Theme)
│   │   ├── pages/         # Page components
│   │   │   ├── admin/     # Admin panel pages
│   │   │   ├── auth/      # Authentication pages
│   │   │   └── user/      # User account pages
│   │   ├── styles/        # Global CSS
│   │   └── utils/         # Helper functions
│   └── package.json
├── server/                 # Express backend
│   ├── config/            # DB & TMDB config
│   ├── controllers/       # Route handlers
│   ├── middleware/         # Auth, validation, error handling
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── utils/             # Helper functions
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password/:token` - Reset password

### Movies (TMDB Proxy)
- `GET /api/movies/trending` - Trending movies
- `GET /api/movies/popular` - Popular movies
- `GET /api/movies/top-rated` - Top rated movies
- `GET /api/movies/upcoming` - Upcoming movies
- `GET /api/movies/now-playing` - Now playing
- `GET /api/movies/:id` - Movie details
- `GET /api/movies/:id/credits` - Movie credits
- `GET /api/movies/:id/videos` - Movie videos
- `GET /api/movies/discover` - Discover movies (with filters)

### Users
- `GET /api/users/profile` - Get profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/password` - Change password
- `GET /api/users/favorites` - Get favorites
- `POST /api/users/favorites/:movieId` - Add favorite
- `DELETE /api/users/favorites/:movieId` - Remove favorite
- `GET /api/users/wishlist` - Get wishlist
- `POST /api/users/wishlist/:movieId` - Add to wishlist
- `DELETE /api/users/wishlist/:movieId` - Remove from wishlist

### Admin
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/users` - List users
- `PUT /api/admin/users/:id/status` - Update user status
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/analytics` - Analytics data

### Search & Genres
- `GET /api/search/movie?query=...` - Search movies
- `GET /api/genres` - Get genres
- `GET /api/genres/:id/movies` - Movies by genre

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | JWT signing secret |
| `JWT_EXPIRE` | Token expiration time |
| `TMDB_API_KEY` | TMDB API key |
| `CLIENT_URL` | Frontend URL for CORS |
| `NODE_ENV` | Environment (development/production) |

## License

MIT
