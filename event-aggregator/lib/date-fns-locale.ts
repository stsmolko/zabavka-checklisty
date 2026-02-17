import { Locale } from 'date-fns';

// Slovak locale for date-fns
export const sk: Locale = {
  code: 'sk',
  formatDistance: () => '',
  formatRelative: () => '',
  localize: {
    ordinalNumber: (n: number) => String(n),
    era: () => '',
    quarter: () => '',
    month: (n: number) => {
      const months = [
        'január', 'február', 'marec', 'apríl', 'máj', 'jún',
        'júl', 'august', 'september', 'október', 'november', 'december'
      ];
      return months[n];
    },
    day: (n: number) => {
      const days = ['nedeľa', 'pondelok', 'utorok', 'streda', 'štvrtok', 'piatok', 'sobota'];
      return days[n];
    },
    dayPeriod: () => '',
  },
  formatLong: {
    date: () => 'dd.MM.yyyy',
    time: () => 'HH:mm',
    dateTime: () => 'dd.MM.yyyy HH:mm',
  },
  match: {
    ordinalNumber: () => ({ value: 0, rest: '' }),
    era: () => ({ value: 0, rest: '' }),
    quarter: () => ({ value: 0, rest: '' }),
    month: () => ({ value: 0, rest: '' }),
    day: () => ({ value: 0, rest: '' }),
    dayPeriod: () => ({ value: 0, rest: '' }),
  },
  options: {},
};
