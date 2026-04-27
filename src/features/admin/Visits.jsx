// src/features/admin/Visits.jsx

import { useEffect, useState } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

import {
  getTodayVisits,
  getTotalVisits,
  getLast7DaysVisits,
} from "../../services/admin/analyticsService";

import VisitsTooltip from "./VisitsTooltip";

export default function Visits() {
  const [loading, setLoading] = useState(true);
  const [today, setToday] = useState(0);
  const [total, setTotal] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [todayCount, totalCount, weekData] =
          await Promise.all([
            getTodayVisits(),
            getTotalVisits(),
            getLast7DaysVisits(),
          ]);

        setToday(todayCount);
        setTotal(totalCount);
        setChartData(weekData);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return <Spinner className="d-block mx-auto my-5" />;
  }

  return (
    <section className="mt-5">

      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          Statistiques du site
        </h2>

        <p className="text-muted mb-0">
          Suivi de fréquentation en temps réel.
        </p>
      </div>

      {/* KPI */}
      <Row className="g-4 mb-4">

        <Col md={6}>
          <Card className="dashboard-v2-card border-primary shadow-sm h-100 text-center p-4">

            <small className="text-muted text-uppercase">
              Aujourd’hui
            </small>

            <h2 className="hero-title text-primary mt-2 mb-0">
              {today}
            </h2>

          </Card>
        </Col>

        <Col md={6}>
          <Card className="dashboard-v2-card border-primary shadow-sm h-100 text-center p-4">

            <small className="text-muted text-uppercase">
              Total
            </small>

            <h2 className="hero-title text-primary mt-2 mb-0">
              {total}
            </h2>

          </Card>
        </Col>

      </Row>

      {/* GRAPH */}
      <Card className="dashboard-v2-card border-primary shadow-sm p-4">

        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">

          <h5 className="mb-0 fw-bold">
            7 derniers jours
          </h5>

          <small className="text-muted">
            Nombre de visites
          </small>

        </div>

        <div style={{ width: "100%", height: 340 }}>

          <ResponsiveContainer>

            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="visitsGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#ff5762"
                  />
                  <stop
                    offset="100%"
                    stopColor="#c9142c"
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                opacity={0.15}
              />

              <XAxis
                dataKey="day"
                fontSize={13}
              />

              <YAxis
                allowDecimals={false}
                fontSize={13}
              />

              <Tooltip
                content={VisitsTooltip}
                cursor={{ opacity: 0.2 }}
              />

              <Bar
                dataKey="visits"
                radius={[10, 10, 0, 0]}
                animationDuration={900}
              >
                {chartData.map((_, i) => (
                  <Cell
                    key={i}
                    fill="url(#visitsGradient)"
                  />
                ))}
              </Bar>

            </BarChart>

          </ResponsiveContainer>

        </div>

      </Card>

    </section>
  );
}