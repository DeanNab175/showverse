import Link from "next/link";

import Heading from "@/components/typography/heading";

import { createHobby } from "../../actions";
import HobbyForm from "../../hobby-form";

function NewHobbyPage() {
  return (
    <div>
      <Link href="/admin/about" className="text-sm hover:text-primary">
        &larr; Back to about
      </Link>
      <Heading level={1} className="text-2xl font-extrabold text-primary mt-2 mb-4">
        Add hobby
      </Heading>
      <HobbyForm action={createHobby} submitLabel="Create" />
    </div>
  );
}

export default NewHobbyPage;
