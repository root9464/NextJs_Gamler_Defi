import { ActionButtons } from './features/action-buttons';
import { ManualBlock } from './slices/manual-block';
import { ManualProgress } from './slices/manual-progress';

export const ManualModule = () => {
  return (
    <div className='flex h-fit max-w-[822px] flex-col'>
      <ManualProgress />
      <ManualBlock />
      <ActionButtons />
    </div>
  );
};
