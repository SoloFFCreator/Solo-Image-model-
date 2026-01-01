
import React from 'react';

export const ASPECT_RATIOS: { label: string; value: string; icon: string }[] = [
  { label: 'Square', value: '1:1', icon: 'M4 4h16v16H4z' },
  { label: 'Portrait', value: '3:4', icon: 'M6 2h12v20H6z' },
  { label: 'Landscape', value: '4:3', icon: 'M2 6h20v12H2z' },
  { label: 'Vertical', value: '9:16', icon: 'M7 1h10v22H7z' },
  { label: 'Cinematic', value: '16:9', icon: 'M1 7h22v10H1z' },
];

export const MODELS = {
  DEFAULT: 'gemini-2.5-flash-image',
  PRO: 'gemini-3-pro-image-preview',
};
