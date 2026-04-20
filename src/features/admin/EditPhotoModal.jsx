import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {
  updatePhoto,
  fetchCategories,
} from "../../services/admin/adminService";

export default function EditPhotoModal({ photo, onHide, onSave }) {
    const [categories, setCategories] = useState([]);

    const [form, setForm] = useState({
        title: photo?.title || "",
        description: photo?.description || "",
        category_id: photo?.category_id || "",
    });


    useEffect(() => {
        const loadCategories = async () => {
            const data = await fetchCategories();
            setCategories(data);
        };

        loadCategories();
    }, []);

    const handleSave = async () => {
        await updatePhoto(photo.id, form);
        onSave();
        onHide();
    };

    const handleClose = () => {
        onHide();
    }

    if (!photo) return null;

    return (
        <Modal show={!!photo} onHide={onHide}>
            <Modal.Body>
                <Form.Group>
                    <Form.Label className="mb-1">Titre</Form.Label>
                    <Form.Control
                        className="mb-3"
                        value={form.title}
                        onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                        }
                    />
                </Form.Group>
                
                <Form.Group>
                    <Form.Label className="mb-1">Description</Form.Label>
                    <Form.Control
                        className="mb-3"
                        as="textarea"
                        rows={3}
                        value={form.description}
                        onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                        }
                    />
                </Form.Group>
                
                <Form.Group>
                    <Form.Label className="mb-1">Catégorie</Form.Label>
                    <Form.Select
                        value={form.category_id}
                        onChange={(e) =>
                            setForm({ ...form, category_id: e.target.value })
                        }
                    >
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                            {c.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                
                <div className="d-flex justify-content-between mt-4">
                    <Button 
                        className="w-10 border-primaryDark"
                        variant="primary"
                        onClick={handleSave}
                    >
                        Enregistrer
                    </Button>

                    <Button 
                    className="w-10 border-primaryDark"
                        variant="secondary"
                        onClick={handleClose}
                    >
                        Annuler
                    </Button>
                </div>
                

            </Modal.Body>
        </Modal>
    );
}