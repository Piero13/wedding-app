import { useEffect, useState } from "react";
import { fetchApprovedMessages } from "../../services/guest/guestbookService";
import { Card, Spinner, Pagination } from "react-bootstrap";

/**
 * Display approved guestbook messages
 */
export default function GuestbookList({ publicView = false }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 5;

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = publicView
          ? await fetchApprovedMessages()
          : await fetchApprovedMessages();
        setMessages(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [publicView]);

    // pagination logic
  const start = (page - 1) * PAGE_SIZE;
  const paginated = messages.slice(start, start + PAGE_SIZE);
  const totalPages = Math.ceil(messages.length / PAGE_SIZE);

  const handlePageChange = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center">
     <Spinner />
    </div>
  );

  return (
    <div className="mt-4 w-100">
      {messages.length === 0 && <p>Aucun message pour le moment</p>}

      {publicView && (
        <p className="text-center text-muted mb-4">
          Messages laissés par nos invités ❤️
        </p>
      )}

      {paginated.map((m) => (
        <Card key={m.id} className="mb-3 shadow-sm border-primary">
          <Card.Body>
            <Card.Title>{m.first_name} {m.last_name}</Card.Title>
            <Card.Text>{m.message}</Card.Text>
          </Card.Body>
        </Card>
      ))}

      {/* Pagination */}
      <Pagination className="justify-content-center mt-4">
        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item
            key={i}
            active={i + 1 === page}
            onClick={() => handlePageChange(i + 1)}
            className="pagination-link rounded"
          >
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}