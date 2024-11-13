import { signup } from "../login/actions";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Sign Up
        </h2>

        <label
          htmlFor="displayName"
          className="block text-gray-700 font-medium mb-2"
        >
          Display Name:
        </label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          required
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          Email:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label
          htmlFor="password"
          className="block text-gray-700 font-medium mb-2"
        >
          Password:
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
          Phone:
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          className="w-full p-2 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          formAction={signup}
          type="submit"
          className="w-full bg-green-500 text-black font-medium py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
