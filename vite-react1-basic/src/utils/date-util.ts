export const getFormattedDate = (targetDate: Date = new Date()): string => {
  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, '0');
  const date = String(targetDate.getDate()).padStart(2, '0');
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = days[targetDate.getDay()];
  
  return `${year}-${month}-${date}(${dayOfWeek})`;
};
