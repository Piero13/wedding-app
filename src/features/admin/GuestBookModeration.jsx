import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  fetchGuestbookMessages,
  approveMessage,
} from "../../services/admin/adminService";

/**
 * Moderate guestbook messages
 */
export default function GuestbookModeration() {
  const [messages, setMessages] = useState([]);



  const loadMessages = async () => {
    try {
      const data = await fetchGuestbookMessages();
      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const loadMessages = async () => {
        try {
          const data = await fetchGuestbookMessages();
          setMessages(data);
        } catch (err) {
          console.error(err);
        }
    };

    loadMessages();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveMessage(id);
      loadMessages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {messages.map((m) => (
        <div key={m.id}>
          <p>{m.message}</p>

          {!m.is_approved && (
            <Button onClick={() => handleApprove(m.id)}>
              Approve
            </Button>
          )}
        </div>
      ))}
    </>
  );
}