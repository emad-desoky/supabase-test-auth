import prisma from "@/utils/prisma/prisma"; // Prisma client import
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function FoodList() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const foodList = await prisma.foodList.findMany({
    where: { userId: user.id },
  });

  const handleSubmit = async (formData) => {
    "use server";
    const { title, content, imageUrl } = Object.fromEntries(formData);
    const foodList = await prisma.foodList.create({
      data: {
        userId: user.id,
        title,
        imageUrl,
        content,
      },
    });
    redirect("/food-list");
  };

  const handleDelete = async (formData) => {
    "use server";
    const { mealId } = Object.fromEntries(formData);

    await prisma.foodList.delete({ where: { id: parseInt(mealId) } });
    redirect("/food-list");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Your Food List
      </h2>

      {/* Add New Meal Form */}
      <form action={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Add a New Meal
        </h3>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="imageUrl"
          >
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Meal
        </button>
      </form>

      {/* Display the list of meals */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Your Meals
        </h3>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Title
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Description
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Image
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {foodList && foodList.length > 0 ? (
              foodList.map((meal) => (
                <tr key={meal.id} className="border-b">
                  <td className="py-3 px-4">{meal.title}</td>
                  <td className="py-3 px-4">{meal.content}</td>
                  <td className="py-3 px-4">
                    <img
                      src={meal.imageUrl}
                      alt={meal.title}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <form action={handleDelete}>
                      <input
                        name="mealId"
                        defaultValue={meal.id}
                        style={{ display: "none" }}
                      />
                      <button
                        type="submit"
                        className="text-red-500 hover:text-red-700"
                        aria-label="Delete meal"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </form>
                    <Link href={`meals/${meal.id}`} className="text-blue-600">
                      ADJUST MEAL
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-3 px-4 text-center text-gray-600">
                  No meals added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
