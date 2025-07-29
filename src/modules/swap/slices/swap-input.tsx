/* eslint-disable @next/next/no-img-element */
import { zodResolver } from '@hookform/resolvers/zod';
import type { ChangeEvent, FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { type SwapState } from '../store/swap-store';

import { cn } from '@/shared/utils/tw.utils';
import { useAtomValue } from 'jotai';
import { getSelectedTokenAtom } from '../store/select-token';

type SwapInputProps = {
  type: 'send' | 'receive';
  amount: number;
  maxAmount: number;
  setSwapState: (updateFn: (prevState: SwapState) => Partial<SwapState>) => void;
};

const InputShema = z.object({
  amount: z.number(),
});

type InputForm = z.infer<typeof InputShema>;

export const SwapInput: FC<SwapInputProps> = ({ type, amount, maxAmount, setSwapState }) => {
  const { register, setError, clearErrors } = useForm<InputForm>({
    resolver: zodResolver(InputShema),
    defaultValues: {
      amount,
    },
    mode: 'onChange',
  });

  const selectedTokenFn = useAtomValue(getSelectedTokenAtom);
  const selectedToken = selectedTokenFn(type);

  const handleAmountChange = (value: number) => {
    if (type === 'send') {
      if (maxAmount !== undefined && value > Number(maxAmount))
        setError('amount', {
          type: 'manual',
          message: 'Amount exceeds maximum available balance',
        });
      clearErrors('amount');
      setSwapState((prevState) => ({ ...prevState, amount: value }));
    }
  };

  return (
    <div className='flex w-full flex-col gap-3'>
      <div className='flex h-fit w-full flex-row items-center justify-between gap-2.5'>
        <input
          className='rounded-md border border-[#D9D9D9] bg-white p-1.5 outline-none'
          max={maxAmount}
          type='number'
          disabled={type === 'receive'}
          {...(type === 'receive' ? { value: amount } : {})}
          {...register('amount', {
            valueAsNumber: true,
            onChange: (e: ChangeEvent<HTMLInputElement>) => handleAmountChange(Number(e.target.value)),
          })}
        />
        <div
          className={cn(
            'flex h-8 w-[103px] flex-row items-center gap-2.5 rounded-[50px] p-1',
            type === 'send' ? 'bg-uiActiveBlue text-white' : 'bg-[#F5F5F5] text-black/85',
          )}>
          {selectedToken && (
            <>
              <img src={selectedToken.image} alt={selectedToken.symbol} className='size-6' />
              <p className='text-base font-medium'>{selectedToken.symbol}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
