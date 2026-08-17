import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "./LoginForm";
import { getOwner, safeReturnPath } from "@/lib/owner-auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ returnTo?: string }>;
}) {
  const query = await searchParams;
  const returnTo = safeReturnPath(query.returnTo);
  if (await getOwner()) redirect(returnTo);
  return (
    <main className="login-page">
      <section>
        <span className="login-mark">K/</span>
        <p>PRIVATE WORKSPACE</p>
        <h1>Portfolio control.</h1>
        <p className="login-copy">
          Sign in with the private credentials configured for this deployment.
        </p>
        <LoginForm returnTo={returnTo} />
        <Link href="/en">← Return to portfolio</Link>
      </section>
    </main>
  );
}
