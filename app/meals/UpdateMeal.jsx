"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function UpdateMeal() {
  const [user, setUser] = useState(null); // User state to hold session data
  const [userData, setUserData] = useState(null); // Additional data, if needed
  const supabase = createClient();

  useEffect(() => {
    // Fetch user session on mount
    const fetchUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error.message);
      } else if (session) {
        setUser(session.user); // Set the user in state
        // Fetch additional data if needed (optional)
        fetchUserData(session.user.id);
      }
    };

    // Optional: Fetch additional data from an API if required
    const fetchUserData = async (userId) => {
      const response = await fetch(`/api/user-data?userId=${userId}`);
      const data = await response.json();
      setUserData(data);
    };

    fetchUser();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.email}</h2>
          <p>User ID: {user.id}</p>
          {/* Render additional userData if available */}
          {userData && (
            <div>Additional user info: {JSON.stringify(userData)}</div>
          )}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
