export interface Theme {
  id: string;
  name: string;
}

export const themes: Theme[] = [
  { id: 'cream', name: '奶油' },
  { id: 'sakura', name: '樱花' },
  { id: 'starry', name: '星空' },
];

export const defaultTheme = 'cream';
