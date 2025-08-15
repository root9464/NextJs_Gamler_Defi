'use client';
import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { progressAtom } from '../store/progress';

export const ActionButtons = () => {
  const [currentStepState, setProgress] = useAtom(progressAtom);
  const router = useRouter();
  return (
    <div className='flex flex-row gap-2'>
      {currentStepState.step > 0 && (
        <Button intent='outline' onClick={() => setProgress((prev) => ({ ...prev, step: prev.step - 1 }))}>
          Назад
        </Button>
      )}
      {currentStepState.step < 10 ? (
        <Button intent='primary' onClick={() => setProgress((prev) => ({ ...prev, step: prev.step + 1 }))}>
          Выполнил
        </Button>
      ) : (
        <Button intent='outline' onClick={() => router.back()}>
          Все готово
        </Button>
      )}
    </div>
  );
};
