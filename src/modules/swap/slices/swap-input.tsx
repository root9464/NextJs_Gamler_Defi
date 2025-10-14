/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, type ChangeEvent, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { updateSwapStateAtom, type SwapState } from '../store/swap-store';

import { cn } from '@/shared/utils/tw.utils';
import { useAtomValue, useSetAtom } from 'jotai';
import { getSelectedTokenAtom } from '../store/select-token';

type SwapInputProps = {
  type: 'send' | 'receive';
  amount?: number;
  maxAmount: number;
  setSwapState: (updateFn: (prevState: SwapState) => Partial<SwapState>) => void;
};

const InputShema = z.object({
  amount: z.number(),
});

type InputForm = z.infer<typeof InputShema>;

export const SwapInput: FC<SwapInputProps> = ({ type, amount, maxAmount, setSwapState }) => {
  const { register, setError, clearErrors, setValue } = useForm<InputForm>({
    resolver: zodResolver(InputShema),
    defaultValues: {
      amount,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    setValue('amount', amount ?? 0, { shouldValidate: true });
  }, [amount, setValue]);

  const selectedTokenFn = useAtomValue(getSelectedTokenAtom);
  const selectedToken = selectedTokenFn(type);

  const handleAmountChange = (value: number) => {
    const sanitizedValue = Math.max(0, value);
    if (type === 'send') {
      if (maxAmount !== undefined && sanitizedValue > maxAmount) {
        setError('amount', {
          type: 'manual',
          message: 'Amount exceeds maximum available balance',
        });
      } else {
        clearErrors('amount');
      }
      setValue('amount', sanitizedValue, { shouldValidate: true });
      setSwapState((prevState) => ({ ...prevState, amount: sanitizedValue }));
    }
  };

  const updateSwapState = useSetAtom(updateSwapStateAtom);

  return (
    <div className='flex w-full flex-col gap-1'>
      <div className='flex w-full flex-row items-center justify-between'>
        {type === 'send' ? (
          <div className='flex flex-row items-baseline gap-1 *:text-sm'>
            <h3 className='font-medium'>Вы отправляете:</h3>
            <button
              className='text-uiActiveBlue w-fit cursor-pointer underline'
              onClick={() =>
                updateSwapState((_prev) => ({
                  amount: maxAmount,
                }))
              }>
              Max
            </button>
          </div>
        ) : (
          <h3 className='text-sm font-medium'>Вы получаете:</h3>
        )}
        <p className='self-end text-base font-medium'>{maxAmount.toFixed(2)}</p>
      </div>
      <div className='flex h-fit w-full flex-row items-end justify-between gap-2.5'>
        <input
          className='[appearance:textfield] rounded-md border border-[#D9D9D9] bg-white p-1.5 outline-none [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden'
          type='number'
          {...(type === 'receive' ? { value: amount } : {})}
          {...register('amount', {
            valueAsNumber: true,
            min: 0,
            max: maxAmount,
            disabled: type === 'receive',
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
              const rawValue = e.target.value;
              const value = rawValue === '' ? 0 : Number(rawValue);
              handleAmountChange(value);
            },
          })}
        />

        {selectedToken && (
          <div
            className={cn(
              'flex h-8 w-fit flex-row items-center gap-2.5 rounded-[50px] pr-1.5 pl-1',
              type === 'send' ? 'bg-uiActiveBlue text-white' : 'bg-[#F5F5F5] text-black/85',
            )}>
            <img src={selectedToken.image} alt={selectedToken.symbol} className='size-6' />
            <p className='text-base font-medium'>{selectedToken.symbol}</p>
          </div>
        )}
      </div>
    </div>
  );
};
