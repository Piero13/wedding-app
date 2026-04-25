import { useEffect, useState } from "react";
import {
  fetchGuestbookMessages,
  approveMessage,
  deleteMessage,
} from "../../services/admin/adminService";

import {
  Button,
  Card,
  Badge,
  Pagination,
  Spinner,
} from "react-bootstrap";

/**
 * Moderate guestbook messages
 */
export default function GuestbookModeration() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  /**
   * Load messages
   */
  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await fetchGuestbookMessages();
      setMessages(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Initial load
   */
  useEffect(() => {
    const loadMessages = async () => {
      try {
        setLoading(true);
        const data = await fetchGuestbookMessages();
        setMessages(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadMessages();
  }, []);

  /**
   * Approve message
   */
  const handleApprove = async (id) => {
    try {
      await approveMessage(id);
      await loadMessages(); // refresh auto
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Delete message
   */
  const handleDelete = async (id) => {
    try {
      await deleteMessage(id);
      await loadMessages(); // refresh auto
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Pagination
   */
  const start = (page - 1) * PAGE_SIZE;
  const paginated = messages.slice(start, start + PAGE_SIZE);
  const totalPages = Math.ceil(messages.length / PAGE_SIZE);

  const handlePageChange = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return <Spinner className="d-block mx-auto" />;
  }

  return (
    <div className="mt-5">
      <h3 className="fs-4 mb-3">Modération Livre d’or</h3>

      {messages.length === 0 && (
        <p className="text-center">Aucun message</p>
      )}

      {paginated.map((m) => (
        <Card key={m.id} className="mb-3 shadow-sm">
          <Card.Body>

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-2">
              <strong>
                {m.first_name} {m.last_name}
              </strong>

              <Badge bg={m.is_approved ? "success" : "warning"}>
                {m.is_approved ? "Validé" : "En attente"}
              </Badge>
            </div>

            {/* Message */}
            <Card.Text>{m.message}</Card.Text>

            {/* Actions */}
            {!m.is_approved && (
              <div className="d-flex gap-2">
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => handleApprove(m.id)}
                >
                  Valider
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(m.id)}
                >
                  Supprimer
                </Button>
              </div>
            )}

          </Card.Body>
        </Card>
      ))}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-4">
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i}
              active={i + 1 === page}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </div>
  );
}