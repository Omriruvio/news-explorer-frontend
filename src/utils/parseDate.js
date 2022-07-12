const monthConvert = {
  Jan: 'January',
  Feb: 'February',
  Mar: 'March',
  Apr: 'April',
  May: 'May',
  Jun: 'June',
  Jul: 'July',
  Aug: 'August',
  Sep: 'September',
  Oct: 'October',
  Nov: 'November',
  Dec: 'December',
};

export const parseDate = date => {
  const [MMM, DD, YYYY] = new Date(date).toString().slice(4, 15).split(' ');
  return `${monthConvert[MMM]} ${DD}, ${YYYY}`;
};
