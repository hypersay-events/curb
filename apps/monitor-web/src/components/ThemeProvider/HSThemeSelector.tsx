import React, { FC } from 'react';

import { IconSun, IconMoonStars } from '@tabler/icons';

import {
  ActionIcon,
  ActionIconProps,
  Menu,
  MenuItemProps,
  useMantineColorScheme,
} from '@mantine/core';

export const HSThemeSelector: FC<ActionIconProps> = (props) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <ActionIcon
      {...props}
      aria-label="switch theme"
      onClick={() => toggleColorScheme()}
    >
      {colorScheme === 'light' ? <IconMoonStars /> : <IconSun />}
    </ActionIcon>
  );
};

export const HSThemeSelectorAsMenuItem: FC<MenuItemProps> = ({ ...props }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const icon =
    colorScheme === 'light' ? (
      <IconMoonStars size={14} />
    ) : (
      <IconSun size={14} />
    );
  return (
    <Menu.Item onClick={() => toggleColorScheme()} icon={icon} {...props}>
      {`${colorScheme === 'light' ? 'Dark' : 'Light'} theme`}
    </Menu.Item>
  );
};

export default HSThemeSelector;
