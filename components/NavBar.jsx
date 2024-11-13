import Link from "next/link"; // Link component from Next.js for navigation

import { createClient } from "@/utils/supabase/server";

export default async function Navbar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="flex items-center justify-between container mx-auto">
        <div className="text-2xl font-bold">MyApp</div>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link href="/food-list" className="hover:text-gray-400">
              Food List
            </Link>
          </li>

          {user ? (
            <li className="flex items-center space-x-2">
              <span>Welcome, {user?.email}</span>
              <form action="/auth/signout" method="post">
                <button
                  className="w-full bg-red-500 text-white font-medium py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  type="submit"
                >
                  Sign out
                </button>
              </form>
            </li>
          ) : (
            <>
              <li>
                <Link href="/login" className="hover:text-gray-400">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="hover:text-gray-400">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
