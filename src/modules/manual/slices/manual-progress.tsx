'use client';
import { ProgressBar } from '@/components/ui/progress-bar';
import { useAtomValue } from 'jotai';
import { progressAtom } from '../store/progress';
import { calculateProgressPercentage } from '../utils/utils';

export const ManualProgress = () => {
  const currentStepState = useAtomValue(progressAtom);
  const progressPercentage = calculateProgressPercentage(currentStepState);
  return (
    <div className='flex flex-col gap-2'>
      <ProgressBar value={progressPercentage} className='flex w-full flex-row gap-2.5' />
      <p className='text-sm text-black/60'>
        Шаг {currentStepState.step + 1} из {currentStepState.total}
      </p>
    </div>
  );
};
