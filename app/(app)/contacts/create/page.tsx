import ConctactsForm from "../contacts-form";

export default function Page() {
  async function action(formData: FormData) {
    "use server";

    console.log(Object.fromEntries(formData));
  }
  return <ConctactsForm action={action} />;
}
