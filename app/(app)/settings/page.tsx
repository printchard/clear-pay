import { getSession } from "@/lib/actions/auth";
import { updateUser } from "@/lib/actions/users";
import PasswordChangeForm from "./password-change-form";
import ProfileDetailsForm from "./profile-details-form";

export default async function Page({}: {
  searchParams: Promise<{ status: string }>;
}) {
  const session = await getSession();

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      <section className="flex flex-col gap-y-4">
        <h2 className="text-xl font-semibold">Profile details</h2>
        <ProfileDetailsForm
          name={session!.name}
          email={session!.email}
          action={updateUser.bind(null, session!.id)}
        />
      </section>
      <section className="flex flex-col gap-y-4">
        <h2 className="text-xl font-semibold">Change password</h2>
        <PasswordChangeForm />
      </section>
    </>
  );
}
