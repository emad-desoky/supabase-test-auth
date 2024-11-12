import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Link href="/login">
        <h1 className="text-3xl font-semibold text-white bg-blue-600 px-8 py-4 rounded-lg shadow-lg cursor-pointer hover:bg-blue-700 transition duration-300">
          Hello, please log in
        </h1>
      </Link>
    </div>
  );
}
