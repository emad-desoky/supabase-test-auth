import prisma from "@/utils/prisma/prisma";
import { redirect } from "next/navigation";
import React from "react";

// Component for a specific meal page
const MealPage = async ({ params }) => {
  const { id } = await params;

  const meal = await prisma.foodList.findUnique({
    where: { id: parseInt(id) },
  });

  if (!meal) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-500">Meal not found.</p>
      </div>
    );
  }

  const handleUpdate = async (formData) => {
    "use server";
    const { title, content, imageUrl } = Object.fromEntries(formData);
    const foodList = await prisma.foodList.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        content,
        imageUrl,
      },
    });
    redirect("./food-list");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <form action={handleUpdate} className="p-6">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            defaultValue={meal.title}
            name="title"
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-gray-700 font-medium mb-2">
            Content
          </label>
          <textarea
            name="content"
            defaultValue={meal.content}
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-gray-700 font-medium mb-2">
            Image URL
          </label>
          <input
            type="url"
            defaultValue={meal.imageUrl}
            name="imageUrl"
            className="w-full p-2 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update Meal
          </button>
        </form>
      </div>
    </div>
  );
};
export default MealPage;
