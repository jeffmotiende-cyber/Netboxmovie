Use the following prompt to generate the project:

---

# Prompt: Build a MERN Stack Movie Streaming Website

Create a complete **Movie Streaming Website** using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.

The project should look like it was built by an experienced human developer rather than AI-generated. The code should be clean, readable, modular, and maintainable with natural naming conventions and comments only where necessary. Avoid repetitive coding patterns and avoid common AI-generated animations or effects.

## General Requirements

* MERN Stack
* Responsive design for desktop, tablet, and mobile
* Simple and intuitive user interface
* Fast loading
* Clean folder structure
* REST API architecture
* JWT Authentication
* Password hashing with bcrypt
* Protected routes
* Environment variables for secrets
* Reusable React components
* Error handling
* Loading states
* Empty states
* Pagination for movies
* Search functionality
* Filter by genre
* Sort by:

  * Rating
  * Release Date
  * Popularity
  * Alphabetically

Do not use unnecessary animations.

Avoid floating effects, glowing buttons, bouncing cards, AI-style gradients, or exaggerated transitions.

Use only subtle hover effects and smooth page transitions.

---

# Theme

## Dark Mode

Primary Color:
Royal Red (#8B0000)

Background:
Black (#0D0D0D)

Cards:
#181818

Text:
White

Secondary Text:
#B5B5B5

Buttons:
Royal Red

Hover:
Slightly lighter red

---

## Light Mode

Background:
White

Primary:
Royal Red

Cards:
#F7F7F7

Text:
Black

Secondary Text:
Gray

Buttons:
Royal Red

Text on Buttons:
White

Users should be able to switch between Light Mode and Dark Mode.

Save theme preference in local storage.

---

# Movie Data

Use a public movie API.

Recommended:

TMDB API

or

OMDb API

Store the API key inside the backend using environment variables.

Never expose secrets in the frontend.

Every movie page should display:

* Poster
* Backdrop
* Title
* Description
* Genres
* Runtime
* Release Date
* Language
* Rating
* Vote Count
* Popularity
* Cast
* Director
* Trailer (YouTube)
* Production Companies

Display runtime like:

2 hr 14 min

or

95 min

---

# Home Page

Hero banner

Trending Movies

Popular Movies

Top Rated

Upcoming Movies

Now Playing

Recommended Movies

Genre Section

Recently Viewed

Footer

---

# Navigation

Logo

Home

Movies

Genres

Trending

Top Rated

Wishlist

Favorites

Profile

Login

Register

Theme Toggle

Search Bar

---

# Search

Live search suggestions

Movie search

Genre search

No results page

---

# Movie Details Page

Large backdrop

Poster

Movie Title

Rating

Runtime

Genres

Release Date

Overview

Cast

Crew

Official Trailer

Related Movies

Buttons

Add to Wishlist

Add to Favorites

Share

---

# Genres

Action

Adventure

Animation

Comedy

Crime

Documentary

Drama

Fantasy

Family

History

Horror

Music

Mystery

Romance

Science Fiction

TV Movie

Thriller

War

Western

---

# Authentication

Implement:

Register

Login

Logout

Remember Me

Forgot Password

Reset Password

Email verification (optional)

Password validation

JWT Authentication

bcrypt password hashing

Protected Routes

---

Registration fields

Full Name

Username

Email

Password

Confirm Password

---

Login

Email

Password

Remember Me

Forgot Password

Register Link

---

Forgot Password Flow

Enter Email

Receive Reset Link (or token simulation during development)

Reset Password

Success message

---

# User Account

Dashboard

Profile Information

Edit Profile

Upload Avatar

Change Password

Favorites

Wishlist

Recently Watched

Watch History

Logout

---

Favorites

Users can:

Add movies

Remove movies

View favorite movies

---

Wishlist

Users can:

Save movies

Remove movies

Move to Favorites

---

# Admin Panel

Create a separate admin dashboard.

Admin authentication required.

Dashboard includes analytics and management tools.

## Analytics

Total Users

Active Users

Inactive Users

Total Movies Displayed

Most Viewed Movies

Most Favorited Movies

Most Wishlisted Movies

Most Popular Genres

Daily Visits

Monthly Visits

Average User Session

User Growth

Movie Views by Genre

Top Rated Movies

Recently Added Movies

Charts using Chart.js or Recharts.

---

## User Management

Search users

Deactivate users

Activate users

Suspend users

Reset user passwords

Change user passwords

Delete users

View user profiles

View favorites

View wishlist

View watch history

Filter users by:

Status

Registration date

Activity

---

## Movie Management (Optional Local Database)

If storing local movie metadata:

Edit descriptions

Feature movies

Hide movies

Approve new content

Manage categories

---

# Database Models

## User

Name

Username

Email

Password

Avatar

Role

Status

Favorites

Wishlist

Watch History

Created At

Updated At

---

## Movie Cache (Optional)

Movie ID

Title

Genre

Description

Runtime

Poster

Backdrop

Views

Favorites Count

Wishlist Count

---

# Backend

Node.js

Express

MongoDB

JWT

bcrypt

Mongoose

Helmet

Cors

Morgan

Express Validator

Rate Limiter

Nodemailer

Dotenv

---

API Routes

Auth

Users

Movies

Favorites

Wishlist

Analytics

Admin

Search

Genres

---

# Frontend

React

React Router

Axios

Context API or Redux Toolkit

React Query (optional)

React Hook Form

Yup Validation

Chart.js or Recharts

React Icons

Lazy Loading

Code Splitting

---

# UI Components

Navbar

Footer

Movie Card

Genre Card

Search Bar

Pagination

Modal

Profile Menu

Sidebar

Admin Sidebar

Dashboard Cards

Charts

Buttons

Forms

Loader

404 Page

Empty State

Error Page

---

# Pages

Home

Movies

Movie Details

Genres

Favorites

Wishlist

Login

Register

Forgot Password

Reset Password

Profile

Settings

Admin Dashboard

Admin Users

Admin Analytics

404

---

# Security

JWT Authentication

Hashed Passwords

Protected API Routes

Role-based authorization

Rate limiting

Input validation

XSS protection

CORS

Helmet

Secure environment variables

---

# Performance

Lazy loading

Image optimization

Pagination

Memoization where appropriate

Efficient API calls

Reusable components

Minimal re-renders

---

# User Experience

The application should feel straightforward and easy to use for non-technical users.

Navigation should be simple.

Buttons should be clearly labeled.

Forms should provide helpful validation messages.

Loading indicators should be subtle.

Avoid excessive animations and visual clutter.

Keep spacing, typography, and color usage consistent throughout the application.

---

# Code Quality

* Follow a feature-based folder structure.
* Use descriptive variable and function names.
* Keep components small and reusable.
* Avoid deeply nested logic.
* Write clean, maintainable code with consistent formatting.
* Do not generate repetitive or overly generic code patterns.
* Include a concise `README.md` with setup instructions, required environment variables (such as the TMDB API key and JWT secret), and commands to run both the client and server.
