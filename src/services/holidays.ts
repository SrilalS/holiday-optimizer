export const getAllHolidays = (year:number) => {
  return [
    { date: `${year}-01-15`, name: 'Tamil Thai Pongal Day' },
    { date: `${year}-02-04`, name: 'National Day' },
    { date: `${year}-04-13`, name: 'Day prior to Sinhala & Tamil New Year Day' },
    { date: `${year}-04-14`, name: 'Sinhala & Tamil New Year Day' },
    { date: `${year}-05-01`, name: 'May Day' },
  ];
};