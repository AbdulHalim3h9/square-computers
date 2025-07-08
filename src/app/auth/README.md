# Authentication Flow

This directory contains the authentication flow for the Square Computers application, including login and registration functionality.

## Structure

```
src/app/auth/
├── login/
│   └── page.js          # Main login page with form switching
├── register/
│   └── page.js          # Registration page (redirects to login with form=register)
└── layout.js            # Shared layout for all auth pages
```

## Components

Form components are located in `src/components/auth/forms/`:

- `LoginForm.jsx` - Login form with email and password fields
- `RegisterForm.jsx` - Registration form with username, email, and password fields

## How It Works

1. All authentication routes are under `/auth/*`
2. The main login page (`/auth/login`) handles both login and registration forms with client-side routing
3. Direct navigation to `/auth/register` will redirect to `/auth/login` with the registration form pre-selected
4. The old `/login` route is automatically redirected to `/auth/login` using middleware

## Form State Management

- Form state is managed by the parent `login/page.js` component
- The current form type is reflected in the URL as a query parameter (`?form=login|register`)
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
