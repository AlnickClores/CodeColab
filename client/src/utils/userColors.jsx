const COLORS = [
  "#e6194b",
  "#3cb44b",
  "#ffe119",
  "#4363d8",
  "#f58231",
  "#911eb4",
];
const userColors = new Map();

export const getUserColor = (userId) => {
  if (!userColors.has(userId)) {
    const color = COLORS[userColors.size % COLORS.length];
    userColors.set(userId, color);
  }
  return userColors.get(userId);
};
