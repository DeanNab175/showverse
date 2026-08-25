import Heading from "@/components/typography/heading";

function AdminDashboardPage() {
  return (
    <div>
      <Heading level={1} className="text-2xl font-extrabold text-primary mb-2">
        Dashboard
      </Heading>
      <p className="text-xs-plus text-body-txt/60">
        Use the sidebar to manage the site&apos;s content.
      </p>
    </div>
  );
}

export default AdminDashboardPage;
