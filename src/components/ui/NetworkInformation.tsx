const CLIENT_ROWS = [
  { id: 'ip', label: 'Public IP', field: 'public_ip' },
  { id: 'user-agent', label: 'User Agent', field: 'user_agent' },
] as const;

const LOCATION_ROWS = [
  { id: 'city', label: 'City', field: 'city' },
  { id: 'region', label: 'Region', field: 'region' },
  { id: 'country', label: 'Country', field: 'country' },
  { id: 'latitude', label: 'Latitude', field: 'latitude' },
  { id: 'longitude', label: 'Longitude', field: 'longitude' },
] as const;

type Row = (typeof CLIENT_ROWS | typeof LOCATION_ROWS)[number];

/**
 * The visitor's public IP address and approximate location, filled in by
 * public/scripts/network-information.js.
 */
export default function NetworkInformation() {
  const rows = (definitions: readonly Row[]) =>
    definitions.map((row) => (
      <div className="row" key={row.id}>
        <span className="label">
          <strong>{row.label}</strong>
        </span>
        <span className="value" id={row.id} data-field={row.field} suppressHydrationWarning>---</span>
      </div>
    ));

  return (
    <div className="network container">
      <h1>
        Network Information
      </h1>

      <section className="client">
        {rows(CLIENT_ROWS)}
      </section>

      <section className="location">
        {rows(LOCATION_ROWS)}
      </section>

      <script type="module" src="/scripts/network-information.js"></script>
    </div>
  );
}
