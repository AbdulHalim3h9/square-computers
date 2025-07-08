# Authentication Flow

This directory contains the authentication flow for the Square Computers application, including login, registration, and password reset functionality.

## Structure

```
src/app/auth/
├── login/
│   └── page.js          # Main login page with form switching
├── register/
│   └── page.js          # Registration page (redirects to login with form=register)
├── forgot-password/
│   └── page.js          # Forgot password page (redirects to login with form=forgot-password)
└── layout.js            # Shared layout for all auth pages
```

## Components

Form components are located in `src/components/auth/forms/`:

- `LoginForm.jsx` - Login form with email and password fields
- `RegisterForm.jsx` - Registration form with username, email, and password fields
- `ForgotPasswordForm.jsx` - Form to request a password reset link

## How It Works

1. All authentication routes are under `/auth/*`
2. The main login page (`/auth/login`) handles all three forms (login, register, forgot password) with client-side routing
3. Direct navigation to `/auth/register` or `/auth/forgot-password` will redirect to `/auth/login` with the appropriate form pre-selected
4. The old `/login` route is automatically redirected to `/auth/login` using middleware

## Form State Management

- Form state is managed by the parent `login/page.js` component
- The current form type is reflected in the URL as a query parameter (`?form=login|register|forgot-password`)
- Form state is preserved when switching between forms

## Styling

- Uses Tailwind CSS for styling
- Responsive design with mobile-first approach
- Consistent form styling across all authentication flows

## Security Notes

- Client-side validation is implemented in the form components
- Server-side validation should be implemented in the API endpoints
- Sensitive form submissions should be handled with proper CSRF protection
- Password fields should be properly hashed before sending to the server
