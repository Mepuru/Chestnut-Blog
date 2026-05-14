export interface Theme {
  id: string;
  name: string;
}

export const themes: Theme[] = [
  { id: 'sakura', name: '樱花' },
  { id: 'starry', name: '星空' },
];

export const defaultTheme = 'sakura';
