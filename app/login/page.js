"use client";
import { login } from "./actions";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Login
        </h2>

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
          className="w-full p-2 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-between">
          <button
            formAction={login}
            className="bg-blue-500 text-black font-medium py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => router.push("/sign-up")}
            className="bg-green-500 text-black font-medium py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
