/**
 * Fills the world clock (see WorldClock.tsx): the current server time and
 * the time of every element with a data-time-zone attribute, synchronized
 * against the time service and ticking on server-second boundaries.
 */

const TIME_SERVICE_URL = 'https://time-service-652878720259.europe-central2.run.app';

const SAMPLE_COUNT = 3;

async function sampleServerOffset() {
  const clientSend = Date.now();
  const response = await fetch(TIME_SERVICE_URL, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });

  const clientReceive = Date.now();
  if (!response.ok) {
    throw new Error(`Time response was not ok: ${response.statusText}`);
  }

  const data = await response.json();
  if (typeof data.unix !== 'number') {
    throw new Error('Invalid time format from time service');
  }

  // Difference between the server and the local clock, and the round-trip time.
  const serverAtSend = data.unix / 1e6;
  const offset = serverAtSend - (clientSend + clientReceive) / 2;
  const rtt = clientReceive - clientSend;

  return { offset, rtt };
}

/** Estimates the server clock offset from the sample with the lowest latency. */
async function getServerOffset() {
  const samples = [];

  for (let i = 0; i < SAMPLE_COUNT; i += 1) {
    try {
      samples.push(await sampleServerOffset());
    } catch (error) {
      console.error('Error sampling server time:', error);
    }
  }

  if (samples.length === 0) {
    throw new Error('Unable to sample server time');
  }

  samples.sort((a, b) => a.rtt - b.rtt);

  return samples[0].offset;
}

const currentTime = document.getElementById('time');
const cityTimes = document.querySelectorAll('[data-time-zone]');

function render(offset) {
  const now = new Date(Date.now() + offset);

  currentTime.textContent = now.toLocaleTimeString().toLowerCase();
  cityTimes.forEach((element) => {
    element.textContent = now
      .toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', timeZone: element.dataset.timeZone })
      .toLowerCase();
  });
}

getServerOffset()
  .then((offset) => {
    render(offset);

    // Align updates to the server clock's second boundary.
    const msToNextSecond = 1000 - ((Date.now() + offset) % 1000);
    setTimeout(() => {
      render(offset);
      setInterval(() => render(offset), 1000);
    }, msToNextSecond);
  })
  .catch((error) => {
    console.error('Error syncing time:', error);
    currentTime.textContent = 'N/A';
  });
