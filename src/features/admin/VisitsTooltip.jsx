// src/features/admin/VisitsTooltip.jsx

export default function VisitsTooltip({
  active,
  payload,
  label,
}) {
  if (
    active &&
    payload &&
    payload.length
  ) {
    return (
      <div
        className="bg-white border shadow-sm rounded-4 px-3 py-2"
        style={{ minWidth: 150 }}
      >
        <small className="text-muted d-block mb-1">
          {label}
        </small>

        <strong className="text-primary">
          {payload[0].value} visite(s)
        </strong>
      </div>
    );
  }

  return null;
}