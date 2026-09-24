/**
 * Fills the network information (see NetworkInformation.tsx): every element
 * with a data-field attribute receives that field of the service response.
 */

const NETWORK_SERVICE_URL = 'https://networkinfo-service-652878720259.europe-central2.run.app';

async function getNetworkInfo() {
  try {
    const response = await fetch(NETWORK_SERVICE_URL, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching network info:', error);
    return null;
  }
}

getNetworkInfo().then((info) => {
  document.querySelectorAll('[data-field]').forEach((element) => {
    element.textContent = (info && info[element.dataset.field]) || 'N/A';
  });
});
