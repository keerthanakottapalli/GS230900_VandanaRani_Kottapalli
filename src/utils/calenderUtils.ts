export const generateCalendar = (year: number) => {
    const calendar: { month: string; weeks: string[] }[] = [];
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    for (let month = 0; month < 12; month++) {
      let weeks = [];
      for (let week = 1; week <= 4; week++) {
        weeks.push(`W${week} ${months[month]}`);
      }
      calendar.push({ month: months[month], weeks });
    }
  
    return calendar;
  };
  