import Link from "next/link";

import Heading from "@/components/typography/heading";

import { createService } from "../actions";
import ServiceForm from "../service-form";

function NewServicePage() {
  return (
    <div>
      <Link href="/admin/services" className="text-sm hover:text-primary">
        &larr; Back to services
      </Link>
      <Heading level={1} className="text-2xl font-extrabold text-primary mt-2 mb-4">
        Add service
      </Heading>
      <ServiceForm action={createService} submitLabel="Create" />
    </div>
  );
}

export default NewServicePage;
