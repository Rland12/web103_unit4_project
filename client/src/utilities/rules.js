export function impossibleReason({ color, sole, laces, logo }) {
  if (color === 'white' && logo === 'stealth' && laces === 'glow') {
    return 'White + Stealth logo + Glow laces is not a manufacturable combo.';
  }
  if (sole === 'chunky' && laces === 'glow') {
    return 'Glow laces are incompatible with chunky soles.';
  }
  return null;
}

export function getDisabledOptions(current) {
  const disabled = { color:new Set(), sole:new Set(), laces:new Set(), logo:new Set() };
  if (current.sole === 'chunky') disabled.laces.add('glow');
  if (current.color === 'white' && current.laces === 'glow') disabled.logo.add('stealth');
  return disabled;
}
