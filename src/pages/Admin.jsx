import UploadForm from "../features/admin/UploadForm";
import PhotoList from "../features/admin/PhotoList";
import GuestbookModeration from "../features/admin/GuestbookModeration";

export default function Admin() {
  return (
    <div className="container py-5">
      <h2>Admin Dashboard</h2>

      <UploadForm />
      <PhotoList />
      <GuestbookModeration />
    </div>
  );
}