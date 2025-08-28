import type { FC } from 'react';
// import { ChangeAcceptance } from './change-acceptance';
import { ChangeCurash } from './change-curash';

type Props = {
  gameType: string;
};

export const ChangeTrick: FC<Props> = ({ gameType }) => {
  return (
    <div>
      <h2 className='text-[18px] font-medium text-[#3f4149]'>Ваша фишка в игре:</h2>
      {gameType === 'curash' ? <ChangeCurash /> : null}
    </div>
  );
};
