import moment from 'moment';

export const getSchedulingDays = () => {
  const days = ['Today', 'Tomorrow'];
  for (i = 2; i <= 30; i++) {
    days.push(moment().add(i, 'days').format('ddd MMM D'));
  }
  return days;
}

export const getWorkingHours = () => {
  return [
    'between 8 am - 9 am',
    'between 9 am - 10 am',
    'between 10 am - 11 am',
    'between 11 am - 12 pm',
    'between 12 pm - 1 pm',
    'between 1 pm - 2 pm',
    'between 2 pm - 3 pm',
    'between 3 pm - 4 pm',
    'between 4 pm - 5 pm',
    'between 5 pm - 6 pm',
    'between 6 pm - 6 pm',
    'between 7 pm - 8 pm',
    'between 8 pm - 9 pm',
  ];
}

export const dayScrollInterval = 60;
export const timeScrollInterval = 40;