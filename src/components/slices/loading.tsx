import LogoIcon from '@assets/svg/logo.svg';
import { Spin } from 'antd';

export const Loading = () => (
  <div className='flex h-10 w-10 flex-col items-center justify-center'>
    <Spin />
    <LogoIcon />
  </div>
);
