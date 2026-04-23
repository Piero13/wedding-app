import GuestbookForm from "../features/guest/GuestbookForm";
import GuestbookList from "../features/guest/GuestbookList";

export default function GoldenBook() {
  return (
    <div className="container py-4">

      <h2 className="mb-4 text-center hero-title text-primary">
        Livre d’or
      </h2>

      <section className="d-flex flex-column flex-md-row w-100 justify-content-center">
        <GuestbookForm/>

        <GuestbookList />
      </section>
    </div>
  );
}