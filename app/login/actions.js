"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma/prisma"; // Prisma client import
import { createClient } from "@/utils/supabase/server";

// Sign up function
export async function signup(formData) {
  const { displayName, email, password, phone, age } =
    Object.fromEntries(formData);

  // Validate form data
  if (![email, password, displayName, phone, age].every(Boolean)) {
    return redirect("/error"); // If any field is missing, redirect to error page
  }

  const supabase = await createClient();

  // Sign up user in Supabase
  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });
  if (signUpError) throw new Error(signUpError.message);

  // Create user in Prisma if sign-up is successful
  await prisma.user.create({
    data: { id: data.user.id, displayName, phone, age: parseInt(age) },
  });

  // Revalidate and redirect to account page
  revalidatePath("/", "layout");
  return redirect("/account");
}

// Login function
export async function login(formData) {
  const { email, password } = Object.fromEntries(formData);

  // Validate form data
  if (![email, password].every(Boolean)) {
    return redirect("/error"); // If any field is missing, redirect to error page
  }

  const supabase = await createClient();

  // Attempt to sign in the user with Supabase
  const { data, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) throw new Error(loginError.message);

  // Revalidate and redirect to the appropriate account page
  revalidatePath("/", "layout");
  return redirect(
    data.user.email === "admin@admin.com" ? "/admin-account" : "/account"
  );
}
