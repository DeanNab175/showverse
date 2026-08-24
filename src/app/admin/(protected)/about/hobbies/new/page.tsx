import Link from "next/link";

import { createHobby } from "../../actions";
import HobbyForm from "../../hobby-form";

function NewHobbyPage() {
  return (
    <div>
      <Link href="/admin/about" className="text-sm hover:text-primary">
        &larr; Back to about
      </Link>
      <h1 className="text-lg font-medium mt-2 mb-4">Add hobby</h1>
      <HobbyForm action={createHobby} submitLabel="Create" />
    </div>
  );
}

export default NewHobbyPage;
