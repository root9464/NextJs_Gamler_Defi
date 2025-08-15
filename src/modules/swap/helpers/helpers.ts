import { isEqual } from '@/shared/utils/common.utils';
import type { Path } from '../hook/api/usePavingRoute';
import type { SwapResponseBasic } from '../store/swap-route';
import { SWAP_ROUTE_INITIAL } from '../store/swap-route';

const getDistributionRoute = (paths: Path[]): { pathString: string; pathData: { paths: Path[] } } => {
  if (!paths || paths.length === 0) {
    return {
      pathString: 'No available routes',
      pathData: { paths: [] },
    };
  }

  const calculateTotalOutputAmount = (path: Path): number => {
    if (path.next && path.next.length > 0) {
      return path.next[0].swap.output_amount;
    }

    return path.swap.output_amount;
  };

  const bestPath = paths.reduce((best, current) => (calculateTotalOutputAmount(current) > calculateTotalOutputAmount(best) ? current : best));

  const createPathString = (path: Path): string => {
    const tokens = [path.input_token.metadata.symbol];

    if (path.next && path.next.length > 0) {
      tokens.push(path.output_token.metadata.symbol);
      tokens.push(path.next[0].output_token.metadata.symbol);
      return `${tokens.join(' > ')} (${path.dex})`;
    }

    tokens.push(path.output_token.metadata.symbol);
    return `${tokens.join(' > ')} (${path.dex})`;
  };

  return {
    pathString: createPathString(bestPath),
    pathData: {
      paths: [bestPath],
    },
  };
};

const calculateMinReceived = (outputAmount: number, slippageTolerance: number) => {
  if (!outputAmount || !slippageTolerance) return 'Invalid input';

  const minimumReceived = outputAmount * (1 - slippageTolerance / 100);
  return minimumReceived.toFixed(2);
};

const isSwapRouteEmpty = (swapRoute: SwapResponseBasic): boolean => isEqual(swapRoute, SWAP_ROUTE_INITIAL);

export { calculateMinReceived, getDistributionRoute, isSwapRouteEmpty };
