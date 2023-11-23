import { SignIn, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Page() {
  const { user } = auth()

  if (user) return redirect("/home")

  return <SignIn />;
}
