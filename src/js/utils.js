export const formatString = str => {
  return str
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .replace(/^./, char => char.toUpperCase());
};

export const formatLocation = location => {
  const parts = location.split(', ').reverse();
  return parts.join(', ');
};

export const formatPrice = price => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(price)
    .replace(/,/g, '')
    .replace(/\u00A0/g, '');
};

export const truncateText = text => {
  if (text.length <= 61) {
    return text;
  }
  return text.substring(0, 61) + '...';
};

export const equipmentIcons = {
  automatic: 'icon-diagram',
  kitchen: 'icon-cup-hot',
  AC: 'icon-wind',
  TV: 'icon-tv',
  bathroom: 'icon-bi_droplet',
};

export const typeIcons = {
  van: 'icon-bi_grid-1x2',
  fullyIntegrated: 'icon-bi_grid',
  alcove: 'icon-bi_grid-3x3-gap',
};
