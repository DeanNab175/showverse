import { getPageMetadata } from "@/lib/get-page-metadata";

export async function generateMetadata() {
  return getPageMetadata("contact");
}

export default function ContactPage() {
  return <h1>Contact page</h1>;
}
