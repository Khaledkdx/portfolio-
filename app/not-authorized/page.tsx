import Link from "next/link";

export default function NotAuthorizedPage() {
  return <main className="status-page"><div><span>K/</span><h1>Access restricted</h1><p>This workspace is available only to the site owner.</p><Link href="/en">Return to portfolio</Link></div></main>;
}
