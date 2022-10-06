import React from 'react';
import { Global } from '@mantine/core';

export const CustomFonts = ({ fontPath = '/fonts' }: { fontPath?: string }) => {
  const normal = `${fontPath}/Inter-roman.var.woff2`;
  const italic = `${fontPath}/Inter-italic.var.woff2`;
  return (
    <Global
      styles={[
        {
          '@font-face': {
            fontFamily: 'Inter var',
            src: `url('${normal}') format("woff2")`,
            fontWeight: '100 900',
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Inter var',
            src: `url('${italic}') format("woff2")`,
            fontWeight: '100 900',
            fontStyle: 'italic',
          },
        },
      ]}
    />
  );
};
