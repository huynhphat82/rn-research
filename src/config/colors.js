const rgbHex = (colorName) => ({
  HEX: Color[colorName.toUpperCase()],
  hex: function () {return this.HEX},
  RGB: Color[colorName.toUpperCase()+'_RGB'],
  rgb: function () {return this.RGB},
});

const colors = {
  white: () => rgbHex('white'),
  silver: () => rgbHex('silver'),
  gray: () => rgbHex('gray'),
  black: () => rgbHex('black'),
  red: () => rgbHex('red'),
  maroon: () => rgbHex('maroon'),
  yellow: () => rgbHex('yellow'),
  olive: () => rgbHex('olive'),
  lime: () => rgbHex('lime'),
  green: () => rgbHex('green'),
  aqua: () => rgbHex('aqua'),
  teal: () => rgbHex('teal'),
  blue: () => rgbHex('blue'),
  navy: () => rgbHex('navy'),
  fuchsia: () => rgbHex('fuchsia'),
  purple: () => rgbHex('purple'),
};

const Color = {
  WHITE: '#FFFFFF',
  SILVER: '#C0C0C0',
  GRAY: '#808080',
  BLACK: '#000000',
  RED: '#FF0000',
  MAROON: '#800000',
  YELLOW: '#FFFF00',
  OLIVE: '#808000',
  LIME: '#00FF00',
  GREEN: '#008000',
  AQUA: '#00FFFF',
  TEAL: '#008080',
  BLUE: '#0000FF',
  NAVY: '#000080',
  FUCHSIA: '#FF00FF',
  PURPLE: '#800080',
  RGB_MAROON: 'RGB(128, 0, 0)',
  RGB_YELLOW: 'RGB(255, 255, 0)',
  RGB_OLIVE: 'RGB(128, 128, 0)',
  RGB_LIME: 'RGB(0, 255, 0)',
  RGB_GREEN: 'RGB(0, 128, 0)',
  RGB_AQUA: 'RGB(0, 255, 255)',
  RGB_TEAL: 'RGB(0, 128, 128)',
  RGB_BLUE: 'RGB(0, 0, 255)',
  RGB_NAVY: 'RGB(0, 0, 128)',
  RGB_FUCHSIA: 'RGB(255, 0, 255))',
  RGB_PURPLE: 'RGB(128, 0, 128))',
  RGB_WHITE: 'RGB(255,255,255)',
  RGB_SILVER: 'RGB(192,192,192)',
  RGB_GRAY: 'RGB(128,128,128)',
  RGB_BLACK: 'RGB(0, 0, 0)',
  RGB_RED: 'RGB(255,0,0)',
  ...colors,
};

export default Color;
