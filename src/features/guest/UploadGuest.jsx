import { useEffect, useState } from "react";
import {
  Card,
  Form,
  Button,
  Table,
  Row,
  Col,
} from "react-bootstrap";
import {
  FaUsers,
  FaTrash,
  FaEdit,
  FaSave,
  FaPlus,
} from "react-icons/fa";

import {
  fetchGuests,
  createGuest,
  updateGuest,
  deleteGuest,
} from "../../services/admin/guestsService";

import { useToast } from "../../hooks/useToast";

export default function UploadGuest() {
    const [guests, setGuests] = useState([]);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editCode, setEditCode] = useState("");

    const { showToast } = useToast();

    const loadGuests = async () => {
        try {
            const data = await fetchGuests();
            setGuests(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const loadGuests = async () => {
            try {
            const data = await fetchGuests();
            setGuests(data);
            } catch (err) {
            console.error(err);
            }
        };
        loadGuests();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
        await createGuest({
            name,
            access_code: code,
        });

        setName("");
        setCode("");

        showToast("Invité ajouté");
        loadGuests();
        } catch (err) {
        showToast("Erreur création", "danger");
        console.log(err);
        }
    };

    const handleSave = async () => {
        try {
        await updateGuest(editingId, {
            name: editName,
            access_code: editCode,
        });

        setEditingId(null);
        showToast("Invité modifié");
        loadGuests();
        } catch {
        showToast("Erreur modification", "danger");
        }
    };

    const handleDelete = async (id) => {
        try {
        await deleteGuest(id);
        showToast("Invité supprimé");
        loadGuests();
        } catch {
        showToast("Erreur suppression", "danger");
        }
    };

    return (
        <>
        <Card className="border-primary shadow-sm mb-4 rounded-4">
            <Card.Body>
            <h4 className="text-primary mb-3">
                <FaPlus className="me-2" />
                Ajouter un foyer
            </h4>

            <Form onSubmit={handleCreate}>
                <Row className="g-3">
                <Col md={5}>
                    <Form.Control
                    placeholder="Nom du foyer"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    />
                </Col>

                <Col md={4}>
                    <Form.Control
                    placeholder="Code d'accès"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    />
                </Col>

                <Col md={3}>
                    <Button type="submit" variant="primary" className="w-100">
                    Ajouter
                    </Button>
                </Col>
                </Row>
            </Form>
            </Card.Body>
        </Card>

        <Card className="border-primary shadow-sm rounded-4">
            <Card.Body>
            <h4 className="text-primary mb-3">
                <FaUsers className="me-2" />
                Liste des invités
            </h4>

            <Table responsive hover>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Code</th>
                    <th width="180">Actions</th>
                </tr>
                </thead>

                <tbody>
                {guests.map((g) => (
                    <tr key={g.id}>
                    <td>
                        {editingId === g.id ? (
                        <Form.Control
                            value={editName}
                            onChange={(e) =>
                            setEditName(e.target.value)
                            }
                        />
                        ) : (
                        g.name
                        )}
                    </td>

                    <td>
                        {editingId === g.id ? (
                        <Form.Control
                            value={editCode}
                            onChange={(e) =>
                            setEditCode(e.target.value)
                            }
                        />
                        ) : (
                        g.access_code
                        )}
                    </td>

                    <td>
                        {editingId === g.id ? (
                        <Button
                            size="sm"
                            variant="success"
                            onClick={handleSave}
                        >
                            <FaSave />
                        </Button>
                        ) : (
                        <Button
                            size="sm"
                            variant="secondary"
                            className="me-2"
                            onClick={() => {
                            setEditingId(g.id);
                            setEditName(g.name);
                            setEditCode(g.access_code);
                            }}
                        >
                            <FaEdit />
                        </Button>
                        )}

                        <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleDelete(g.id)}
                        >
                        <FaTrash />
                        </Button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </Card.Body>
        </Card>
        </>
    );
}