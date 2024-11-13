// app/api/foodlist/route.js
import { prisma } from "@/utils/prisma/prisma"; // Prisma client import

// Handler for GET and POST requests for food list
export async function GET(req) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId"); // Get userId from query

  if (!userId) {
    return new Response(JSON.stringify({ error: "User ID is required" }), {
      status: 400,
    });
  }

  try {
    const foodList = await prisma.foodList.findMany({
      where: { userId },
    });
    return new Response(JSON.stringify(foodList), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch food list" }),
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
  const { title, content, imageUrl, userId } = await req.json();

  if (!title || !content || !imageUrl || !userId) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
    });
  }

  try {
    // Insert new food item into the database
    const newMeal = await prisma.foodList.create({
      data: { title, content, imageUrl, userId },
    });

    // Optionally, fetch updated food list for the user
    const updatedFoodList = await prisma.foodList.findMany({
      where: { userId },
    });

    return new Response(JSON.stringify(updatedFoodList), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to add meal" }), {
      status: 500,
    });
  }
}
