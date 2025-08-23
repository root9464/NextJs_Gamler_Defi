/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useJettonWallet } from '@/shared/hooks/api/useJettonWallet';
import { useTon } from '@/shared/hooks/api/useTon';
import { ENVs } from '@/shared/lib/envs';
import { Address } from '@ton/core';
import { useTonAddress } from '@tonconnect/ui-react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { RollStats } from '../features/roll-stats';
import { SwapButton } from '../features/swap-button';
import { SwapInput } from '../slices/swap-input';
import { setSelectTokenAtom, updateSelectTokenAtom } from '../store/select-token';
import { swapRouteAtom } from '../store/swap-route';
import { setSwapStateAtom, swapStateAtom, updateSwapStateAtom } from '../store/swap-store';

export const SwapInterface = () => {
  const address = useTonAddress();
  const swapState = useAtomValue(swapStateAtom);
  const setSwapState = useSetAtom(setSwapStateAtom);
  const setSelectToken = useSetAtom(setSelectTokenAtom);
  const updateSwapState = useSetAtom(updateSwapStateAtom);
  const updateSelectToken = useSetAtom(updateSelectTokenAtom);
  const swapRoute = useAtomValue(swapRouteAtom);

  const {
    data: jettonWallets,
    isLoading: isLoadingJettonWallets,
    isError: isErrorJettonWallets,
    isSuccess: isSuccessJettonWallets,
  } = useJettonWallet({ address: address ?? '' });
  const gamlerJettonWallet = jettonWallets?.balances.find((balance) => balance.jetton.symbol === 'GMLR');
  const gamlerInBalance = Number(gamlerJettonWallet?.balance) / 10 ** (gamlerJettonWallet?.jetton.decimals ?? 0);
  const gamlerJettonAddress =
    gamlerJettonWallet && gamlerJettonWallet.wallet_address ? Address.parse(gamlerJettonWallet.jetton.address).toString() : '';

  const {
    data: rawTonUserBalance,
    isLoading: isLoadingTonUserBalance,
    isError: isErrorTonUserBalance,
    isSuccess: isSuccessTonUserBalance,
  } = useTon(address ?? '');

  const tonUserBalance = rawTonUserBalance ? rawTonUserBalance.balance / 10 ** 9 : 0;

  const swapTokens = () => {
    if (!swapState.send || !swapState.receive) return;
    updateSwapState((prevState) => ({
      send: prevState.receive,
      receive: prevState.send,
    }));

    updateSelectToken((prevState) => ({
      send: prevState.receive,
      receive: prevState.send,
    }));
  };

  useEffect(() => {
    if (!isSuccessJettonWallets || !isSuccessTonUserBalance) return;
    setSwapState({
      send: 'native',
      receive: gamlerJettonAddress,
      amount: 1,
    });

    setSelectToken({
      type: 'send',
      token: {
        id: 1,
        symbol: 'TON',
        decimals: 9,
        image: 'https://ton.org/download/ton_symbol.svg',
        address: 'native',
      },
    });

    setSelectToken({
      type: 'receive',
      token: {
        id: 2,
        symbol: 'GMLR',
        decimals: 9,
        image: 'https://serv.gamler.online/web3/api/ton/image/logo.svg',
        address: ENVs.client.NEXT_PUBLIC_JETTON_MASTER,
      },
    });
  }, [address, isSuccessJettonWallets, isSuccessTonUserBalance]);

  return (
    <div className='flex flex-col gap-3'>
      {isSuccessTonUserBalance && (
        <SwapInput
          type='send'
          amount={swapState.amount}
          maxAmount={swapState.send === 'native' ? tonUserBalance : gamlerInBalance}
          setSwapState={updateSwapState}
        />
      )}
      {(isErrorTonUserBalance || isLoadingTonUserBalance) && <p>чето не так</p>}
      <RollStats swapTokens={swapTokens} />
      {isSuccessJettonWallets && gamlerJettonWallet && (
        <SwapInput
          type='receive'
          amount={Number(swapRoute.output_amount.toFixed(4))}
          maxAmount={swapState.send === 'native' ? gamlerInBalance : tonUserBalance}
          setSwapState={updateSwapState}
        />
      )}
      {(isErrorJettonWallets || isLoadingJettonWallets) && <Skeleton className='h-8 w-full' />}
      <SwapButton />
    </div>
  );
};
