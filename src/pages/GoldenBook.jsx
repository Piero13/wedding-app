import GuestbookForm from "../features/guest/GuestbookForm";
import GuestbookList from "../features/guest/GuestbookList";

export default function GoldenBook() {
  return (
    <div className="container py-4">

      <h2 className="mb-4 text-center">
        Livre d’or
      </h2>

      <GuestbookForm />

      <GuestbookList />

    </div>
  );
}