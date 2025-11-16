export const getUserName = (users, userId) => {
  if (!Array.isArray(users)) return "Unknown User";
  const user = users.find((u) => u.id === userId);
  return user?.name || "Unknown User";
};
