import Unauthorized from "@/components/Autorized";
import AccountForm from "./account-form";
import { createClient } from "@/utils/supabase/server";

export default async function Account() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      {user ? (
        <AccountForm user={user} />
      ) : (
        <>
          <Unauthorized />
        </>
      )}
    </>
  );
}
