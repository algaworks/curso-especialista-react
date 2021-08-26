export default function formatPhone(phoneNumber: string) {
  const numberArray = phoneNumber.split('');
  const ddd = numberArray.slice(0, 2).join('');
  const firstSlice = numberArray.slice(2, 7).join('');
  const lastSlice = numberArray.slice(7, 11).join('');

  return `(${ddd}) ${firstSlice}-${lastSlice}`;
}
