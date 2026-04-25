import GuestbookForm from "../features/goldenbook/GuestbookForm";
import GuestbookList from "../features/goldenbook/GuestbookList";
import AdminLayout from "../layouts/AdminLayout";

export default function GoldenBook() {
  return (
    <AdminLayout>
      <div className="container py-4">

        <h2 className="mb-4 text-center hero-title text-primary">
          Livre d’or
        </h2>

        <section className="d-flex flex-column flex-md-row w-100 justify-content-center">
          <GuestbookForm/>

          <GuestbookList />
        </section>
      </div>
    </AdminLayout>
  );
}