export default function formatDateBr(date: Date) {
  return `${('00' + date.getUTCDate()).slice(-2)}/${(
    '00' +
    (date.getMonth() + 1)
  ).slice(-2)}/${date.getFullYear()}`;
}
