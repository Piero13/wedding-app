import { useEffect, useState } from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import {
  fetchCategories,
  createCategory,
} from "../../services/admin/adminService";
import { useToast } from "../../hooks/useToast";

export default function CategoryManager({ onUpdate }) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const { showToast } = useToast();

  const load = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  useEffect(() => {
    const load = async () => {
        const data = await fetchCategories();
        setCategories(data);
    };
    load();
  }, []);

  const handleAdd = async () => {
    if (!name) return;

    try {
      await createCategory(name);
      showToast("Category created");
      setName("");
      await load();
      onUpdate?.();
    } catch {
      showToast("Error creating category", "danger");
    }
  };

  return (
    <section>
      <Container className="p-0 mb-1">
        <h3 className="fs-4 mb-3">Categories</h3>

        <Row>
          <Col sm={12} lg={5}>
            <div className="d-flex mb-3">
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nouvelle catégorie"
              />
              <Button 
                variant="primary"
                className="border-primaryDark ms-2 w-10"
                onClick={handleAdd}
              >
                Ajouter
              </Button>              
            </div>                 
          </Col>

          <Col sm={12} lg={7}>
            <ul className="d-flex flex-wrap m-0">
              {categories.map((c) => (
                <li 
                  key={c.id} 
                  className="me-3 px-3 py-1 mb-3 rounded border border-primary"
                >
                  {c.name}
                </li>
              ))}
            </ul>          
          </Col>
        </Row>




      </Container>
    </section>
  );
}