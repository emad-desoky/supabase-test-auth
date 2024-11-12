import Unauthorized from "@/components/Autorized";
import AccountForm from "../account/account-form.jsx";
import { createClient } from "@/utils/supabase/server";

export default async function Account() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      {user && user.email == "admin@admin.com" ? (
        <AccountForm user={user} />
      ) : (
        <>
          <Unauthorized />
        </>
      )}
    </>
  );
}
