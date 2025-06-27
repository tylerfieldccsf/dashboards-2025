function formatSmartNumber(value) {
    const str = value.toString().trim();
    // Skip if already formatted with K, M, or B and doesn't look like a raw number
    if (/^[\s\$€£¥-]*\d+(\.\d+)?[KMB]\s*$/.test(str)) {
      return str.replace('$','');
    }
    const num = parseFloat(str.replace(/[^\d.-]/g, ''));
    if (isNaN(num)) return value;

    let formatted;

    if (num >= 1_000_000_000) {
      formatted = (num / 1_000_000_000).toFixed(2) + 'B';
    } else if (num >= 1_000_000) {
      formatted = (num / 1_000_000).toFixed(2) + 'M';
    } else if (num >= 1_000) {
      formatted = (num / 1_000).toFixed(2) + 'K';
    } else {
      return Math.round(num).toString();
    }

    // Remove .00 or .X0 (e.g. 1.10K → 1.1K, 2.00M → 2M)
    return formatted
      .replace(/\.00([KMB])$/, '$1')
      .replace(/\.([1-9])0([KMB])$/, '.$1$2');
  }

function formatAllCurrencyElements(containerId) {
  const container = containerId
    ? document.getElementById(containerId)
    : document;

  if (!container) return;

  container.querySelectorAll('.currency').forEach(el => {
    const original = el.textContent;
    const formatted = formatSmartNumber(original);
    if(formatted=='') {
      el.textContent = formatted;
    } else {
      el.textContent = '$' + formatted;
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  // Format ALL `.currency` elements 
  formatAllCurrencyElements();
});