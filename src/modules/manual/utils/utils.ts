import type { ProgressState } from '../store/progress';

function calculateProgressPercentage(progress: ProgressState): number {
  return progress.total > 0 ? Math.min(100, Math.ceil((progress.step / (progress.total - 1)) * 100)) : 0;
}

export { calculateProgressPercentage };
