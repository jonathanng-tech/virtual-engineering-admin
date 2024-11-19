export const MODEL_POSITION = {
  L: 'L',
  LF: 'LF',
  R: 'R',
  RF: 'RF',
  LR: 'L_R',
  T: 'T',
  F: 'F',
  B: 'B',
  NONE: 'NONE',
};

export const CATEGORY = {
  BBQ: 'bbq',
  RANGE_HOOD: 'range-hood',
  CORNER: 'corner',
};

export const MODULE_TYPE = {
  BASE: 'BASE',
  DYNAMIC: 'DYNAMIC',
  SINGLE: 'SINGLE',
};

export const DEFAULT_SORT_TYPE = 'Alphabet';

export const LIST_SORT_TYPE = [
  { name: 'Alphabet', value: 'Alphabet' },
  { name: 'Price up', value: 'PriceUp' },
  { name: 'Price down', value: 'PriceDown' },
];

export const LIST_DRAWER: typeListItemDrawer = [
  {
    name: 'Products',
    type: 'PRODUCT',
    icon: 'icon-product.png',
  },
  {
    name: 'Style',
    type: 'STYLE',
    icon: 'icon-style.png',
  },
];

export interface typeItemDrawer {
  name: string;
  type: string;
  icon: string;
  children?: typeListItemDrawer;
}

export type typeListItemDrawer = typeItemDrawer[];

export const ACTION_CAPTCHA = 'VerifyCaptcha';

export const KEY_CAPTCHA = 'recaptcha';

export const STYLE = {
  CABINET: 'CABINET',
  BENCHTOP: 'BENCHTOP',
};
