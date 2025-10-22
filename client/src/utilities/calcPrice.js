export const PRICE = {
  base: 70,
  color: { red: 5, blue: 5, black: 10, white: 0 },
  sole: { standard: 10, sport: 20, chunky: 30 },
  laces: { white: 0, black: 5, glow: 15 },
  logo: { classic: 0, stealth: 5, bold: 10 }
};

export const OPTIONS = {
  color: ['red','blue','black','white'],
  sole: ['standard','sport','chunky'],
  laces: ['white','black','glow'],
  logo: ['classic','stealth','bold']
};

export const calcPrice = s =>
  PRICE.base + PRICE.color[s.color] + PRICE.sole[s.sole] + PRICE.laces[s.laces] + PRICE.logo[s.logo];
