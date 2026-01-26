export const ICONS = [
  '🤖',
  '👽',
  '😺',
  '💩',
  '🤡',
  '😎',
  '😈',
  '🎮',
  '🤟',
  '🐸',
  '🤏',
  '🐔',
  '🪐',
  '🥐',
  '🗿',
  '🐞',
];

export const ICON_MAP = new Map<number, string>();

ICONS.forEach((icon, i) => {
  ICON_MAP.set(i, icon);
});
