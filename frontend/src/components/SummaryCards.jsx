const cards = [
  {
    key: "stores",
    label: "Total optical stores",
    icon: "⌂",
    format: (value) => value.toLocaleString(),
  },
  {
    key: "frames",
    label: "Frames across all stores",
    icon: "▤",
    format: (value) => value.toLocaleString(),
  },
  {
    key: "eyeTests",
    label: "Stores offering eye tests",
    icon: "◎",
    format: (value) => value.toLocaleString(),
  },
];

export default function SummaryCards({ stores, unavailable }) {
  const totals = {
    stores: stores.length,
    frames: stores.reduce((sum, store) => sum + (Number(store.frameCount) || 0), 0),
    eyeTests: stores.filter((store) => store.offersEyeTest === true).length,
  };

  return (
    <section className="summary-grid" aria-label="Store summary">
      {cards.map((card) => (
        <article className="summary-card" key={card.key}>
          <div className="summary-card-top">
            <span className="summary-label">{card.label}</span>
            <span className="summary-icon" aria-hidden="true">
              {card.icon}
            </span>
          </div>
          <strong className="summary-value">
            {unavailable ? "—" : card.format(totals[card.key])}
          </strong>
          <span className="summary-footnote">
            {unavailable ? "Waiting for backend data" : "Across your locations"}
          </span>
        </article>
      ))}
    </section>
  );
}
