import { useEffect, useState } from "react";
import { fetchApprovedMessages } from "../../services/guest/guestbookService";
import { Card, Spinner } from "react-bootstrap";

/**
 * Display approved guestbook messages
 */
export default function GuestbookList() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await fetchApprovedMessages();
        setMessages(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="mt-4">
      {messages.length === 0 && <p>Aucun message pour le moment</p>}

      {messages.map((m) => (
        <Card key={m.id} className="mb-3 shadow-sm">
          <Card.Body>
            <Card.Title>{m.first_name} {m.last_name}</Card.Title>
            <Card.Text>{m.message}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}