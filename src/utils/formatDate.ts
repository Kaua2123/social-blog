export const formatDate = (date: Date | undefined) => {
  if (typeof date === 'undefined') return;

  const newDate = new Date(date).toLocaleDateString();

  return newDate;
};
