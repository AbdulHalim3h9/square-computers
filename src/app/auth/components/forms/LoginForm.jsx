import React from 'react';
import Button from '@/components/ui/Button';

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  error,
  success,
  handleSubmit,
  onSwitchToRegister,
  onDemoLogin
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-lg">
          <p>{error}</p>
        </div>
      )}
      
      {success && (
        <div className="p-4 bg-green-50 border-l-4 border-green-500 text-green-700 text-sm rounded-r-lg">
          <p>{success}</p>
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-light text-gray-700 mb-2"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500"
          placeholder="••••••••"
        />
      </div>

      <div className="pt-2">
        <Button
          type="button"
          onClick={onDemoLogin}
          variant="ghost"
          className="w-full justify-center py-2 text-sm font-light text-cyan-600 hover:text-cyan-700"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Click here for a demo Admin Login'}
        </Button>
      </div>

      <Button
        type="submit"
        className="w-full justify-center py-3 text-base font-light shadow-lg"
        disabled={loading}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Signing in...
          </>
        ) : (
          'Sign In to Your Account'
        )}
      </Button>

    </form>
  );
};

// Add demo admin credentials to local storage when component mounts
const LoginFormWithDemo = (props) => {
  React.useEffect(() => {
    // This is just for demo purposes
    // In a real app, you would have proper authentication
    const demoAdmin = {
      email: 'admin@example.com',
      password: 'admin123',
      isAdmin: true
    };
    localStorage.setItem('demoAdmin', JSON.stringify(demoAdmin));
  }, []);

  return <LoginForm {...props} />;
};

export default LoginFormWithDemo;
