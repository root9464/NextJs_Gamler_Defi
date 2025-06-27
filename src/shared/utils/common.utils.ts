const copyClipboard = async (text: string) => await navigator.clipboard.writeText(text);

const formatUnixToDate = (unixTimestamp: number): string => {
  const date = new Date(unixTimestamp * 1000);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export { copyClipboard, formatUnixToDate };
