const CITIES = [
  { id: 'newyork', name: 'New York', timeZone: 'America/New_York' },
  { id: 'barcelona', name: 'Barcelona', timeZone: 'Europe/Madrid' },
  { id: 'cheboksary', name: 'Cheboksary', timeZone: 'Europe/Moscow' },
  { id: 'tainan', name: 'Tainan', timeZone: 'Asia/Taipei' },
];

/**
 * The current server time and a set of world clocks. The times are filled
 * in and kept ticking by public/scripts/world-clock.js.
 */
export default function WorldClock() {
  return (
    <div className="times container-fluid">
      <section className="current-time">
        <pre id="time" suppressHydrationWarning></pre>
      </section>

      <section className="world-times">
        {CITIES.map((city) => (
          <div className={`${city.id} city`} key={city.id}>
            <div className="name">
              <strong>{city.name}</strong>
            </div>
            <pre className="time" id={`${city.id}-time`} data-time-zone={city.timeZone} suppressHydrationWarning></pre>
          </div>
        ))}
      </section>

      <script type="module" src="/scripts/world-clock.js"></script>
    </div>
  );
}
