import Unauthorized from "@/components/Autorized";
import AccountForm from "./account-form";
import { createClient } from "@/utils/supabase/server";
import FoodList from "./FoodList";

export default async function Account() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      {user ? (
        <>
          <AccountForm user={user} />
          <FoodList user={user} />
        </>
      ) : (
        <>
          <Unauthorized />
        </>
      )}
    </>
  );
}
