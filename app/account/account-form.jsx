export default function AccountForm({ user }) {
  return (
    <div className="form-widget max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          Email
        </label>
        <input
          id="email"
          type="text"
          value={user?.email}
          disabled
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
        />
      </div>
      <div className="mt-4">
        <form action="/auth/signout" method="post">
          <button
            className="w-full bg-red-500 text-white font-medium py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            type="submit"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
