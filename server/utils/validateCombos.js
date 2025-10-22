export function validateImpossibleCombo({ color, sole, laces, logo }) {
  // Example impossible combos:
  // - "white" color cannot pair with "stealth" logo + "glow" laces (branding rule)
  if (color === 'white' && logo === 'stealth' && laces === 'glow') {
    return 'White + Stealth logo + Glow laces is not a manufacturable combo.';
  }
  // - "chunky" sole cannot use "glow" laces (safety rule)
  if (sole === 'chunky' && laces === 'glow') {
    return 'Glow laces are incompatible with chunky soles.';
  }
  return null;
}
