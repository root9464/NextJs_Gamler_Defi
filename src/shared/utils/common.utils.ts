import { toast } from 'sonner';

const copyClipboard = async (text: string) => {
  toast('Скопировано в буффер обмена');
  await navigator.clipboard.writeText(text);
};

const formatDate = (input: number | string): string => {
  const date = new Date(typeof input === 'number' ? input * 1000 : input);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};


const isEqual = <T extends Record<string, unknown>>(current: T, initial: T): boolean =>
  Object.keys(initial).every((key) => JSON.stringify(current[key]) === JSON.stringify(initial[key]));

export { copyClipboard, formatDate, isEqual };
