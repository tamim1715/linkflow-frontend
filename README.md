# Linkflow Mobile App

Production-ready Magic Link authentication mobile application built with React Native (Expo).

Linkflow demonstrates secure passwordless authentication, JWT-based authorization, protected API calls, and a clean frontend architecture aligned with production best practices.

---

## Table of Contents

- Overview
- Features
- Architecture
- Authentication Flow
- Application Flow
- API Integration
- Security Considerations
- Project Structure
- Local Development Strategy
- Design Decisions
- Limitations
- Future Improvements
- Tech Stack
- Author

---

## Overview

Linkflow implements a passwordless authentication flow using expiring magic links instead of passwords.

Authentication Flow:

1. User requests login link
2. Backend generates a time-limited token
3. Token is delivered via deep link
4. User verifies the token
5. Backend issues JWT
6. JWT is used to access protected endpoints

---

## Features

- Passwordless authentication (Magic Link)
- JWT-based stateless authorization
- Protected feedback submission
- Clean Expo Router navigation
- Separation of UI and API logic
- Development-friendly manual verification mode

---

## Architecture

The frontend follows a layered client architecture:

```
UI Layer (Screens)
        ↓
Context Layer (Auth State)
        ↓
Service Layer (API Calls)
        ↓
Backend API
```

### Architectural Principles

- Screens contain no API logic
- Services handle HTTP communication
- AuthContext manages authentication state
- JWT stored client-side
- Clear separation between public and protected flows

---

## Authentication Flow

1. User enters email
2. App calls:

   POST /api/auth/request-link

3. Backend sends deep link via email
4. User clicks link
5. App opens via deep linking
6. App calls:

   POST /api/auth/verify

7. Backend returns JWT
8. JWT stored locally
9. Protected APIs use:

   Authorization: Bearer <token>

---

## Application Flow

Login → Check Email → Verify → Onboarding → Review Prompt → Feedback (if needed)

Feedback submission requires authentication.

---

## API Integration

### Request Magic Link

POST /api/auth/request-link

Request Body:

```json
{
  "email": "shahadathhossain447@gmail.com"
}
```

---

### Verify Token

POST /api/auth/verify?token=my-token


Response:

```json
{
  "token": "jwt-token"
}
```

---

### Submit Feedback (Protected)

POST /api/feedback

Headers:

Authorization: Bearer <jwt-token>

Request Body:

```json
{
  "message": "User feedback text"
}
```

---

## Security Considerations

- Stateless JWT authentication
- No session stored on backend
- Protected routes require Bearer token
- Authentication endpoints publicly accessible but rate-limited on backend
- No password storage


---

## Project Structure

```
app/
 ├── (auth)/
 │    ├── login.tsx
 │    ├── onboarding.tsx
 │
 ├── (app)/
 │    ├── index.tsx
 |
 ├── _layout.tsx
 ├── index.tsx
 │
src/
 ├── services/
 │    ├── authService.ts
 │    ├── feedbackService.ts
 │
 ├── context/
 │    ├── AuthContext.tsx
 |
 ├── api/
 │    ├── client.ts
 |
 ├── sheets/
 │    ├── FeedbackSheet.tsx
 │    ├── ReviewPromptSheet.tsx
 │    ├── StoreRedirectSheet.tsx
 |
 ├── theme/
 │    ├── colors.ts
 |    ├── spacing.ts
```

- `app/` handles routing (Expo Router)
- `src/services/` contains API logic
- `src/context/` manages authentication state

---

## Local Development Strategy

Expo Go does not automatically open deep links from backend logs.

To enable local testing:

1. Backend logs generated deep link:

   myapp://api/auth/verify?token=my-token

2. Developer manually copies token
3. Token pasted into app verify input
4. App calls /verify
5. JWT received
6. Normal flow continues

This manual verification for development purposes.

---

## Design Decisions

Why Magic Link?

- Eliminates password storage risks
- Improves onboarding experience

Why JWT?

- Stateless authentication
- Scalable and infrastructure-friendly

Why Separate Service Layer?

- Clean separation of concerns
- Easier testing
- Reusable API logic

Why Manual Verification Mode?

- Expo Go deep linking limitations
- Enables local backend testing without real email provider

---

## Limitations

- Manual token copy required during development
- JWT stored in AsyncStorage (not encrypted)
- No refresh token support
- Feedback typing issue
- No global error handling middleware yet

---

## Future Improvements

- Secure token storage using encrypted store
- Refresh token rotation
- Full universal deep linking support
- Real email provider integration
- Global loading and error state management
- Observability and analytics integration

---

## Tech Stack

- React Native (Expo)
- TypeScript
- Expo Router
- AsyncStorage
- Go Backend (LinkFlow API)
- JWT Authentication

---

## Author

Shahadath Hossain Tamim  
Senior Software Engineer
