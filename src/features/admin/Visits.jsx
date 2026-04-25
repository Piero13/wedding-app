import { Card, Row, Col } from "react-bootstrap";

export default function Visits() {
  const fakeData = [12, 18, 9, 22, 15, 30, 19];

  const total = fakeData.reduce((a, b) => a + b, 0);
  const today = fakeData[fakeData.length - 1];

  return (
    <section>

      <h2 className="mb-4">Visites du site</h2>

      <Row className="g-4 mb-4">

        <Col md={6}>
          <Card className="border-primary text-center p-4">
            <h5>Aujourd’hui</h5>
            <h2 className="text-primary">{today}</h2>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="border-primary text-center p-4">
            <h5>Total 7 jours</h5>
            <h2 className="text-primary">{total}</h2>
          </Card>
        </Col>

      </Row>

      <Card className="border-primary p-4">

        <h5 className="mb-4">7 derniers jours</h5>

        <div className="visits-chart">

          {fakeData.map((v, i) => (
            <div key={i} className="chart-col">

              <div
                className="chart-bar"
                style={{ height: `${v * 4}px` }}
              />

              <small>J-{6 - i}</small>

            </div>
          ))}

        </div>

      </Card>

    </section>
  );
}