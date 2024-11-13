import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {user ? (
        <h1 className="text-3xl font-semibold text-gray-800">
          Welcome back, {user.email}
        </h1>
      ) : (
        <Link href="/login">
          <h1 className="text-3xl font-semibold text-white bg-blue-600 px-8 py-4 rounded-lg shadow-lg cursor-pointer hover:bg-blue-700 transition duration-300">
            Welcome, please log in
          </h1>
        </Link>
      )}
    </div>
  );
}
