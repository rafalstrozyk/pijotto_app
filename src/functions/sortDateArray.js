import moment from 'moment';

export function sortDateArray(array) {
  return array.sort((a, b) => {
    return moment(b.created.toDate()).diff(a.created.toDate());
  });
}

export function formateDateArray(array, format) {
  const formatedArray = array.map((a) => {
    let formatDate = moment(a.created.toDate()).format(format);
    a.created = formatDate;
    return a;
  });
  return formatedArray;
}
