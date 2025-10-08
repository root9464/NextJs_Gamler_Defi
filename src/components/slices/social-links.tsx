import FacebookIcon from '@assets/svg/facebook.svg';
import TelegramIcon from '@assets/svg/telegram.svg';
import VkIcon from '@assets/svg/vk.svg';
import { DynamicBalanceInHeader } from '../exports/exports';

export const SocialLinks = () => (
  <div className='grid grid-cols-[auto_0.555fr] place-content-between content-center items-center gap-[3.7vw]'>
    <DynamicBalanceInHeader />
    <div className='hidden flex-row items-center justify-center gap-1 min-[1200px]:flex'>
      <a href='https://t.me/gamleronline' className='flex h-[2.7vw] w-[2.7vw] items-center justify-center rounded-[12px] bg-[#F0F4FA] p-2.5'>
        <TelegramIcon className='size-5' />
      </a>
      <a
        href='https://www.facebook.com/gamler.online'
        className='flex h-[2.7vw] w-[2.7vw] items-center justify-center rounded-[12px] bg-[#F0F4FA] p-2.5'>
        <FacebookIcon className='h-[17px] w-[15px]' />
      </a>
      <a href='https://vk.com/gamler' className='flex h-[2.7vw] w-[2.7vw] items-center justify-center rounded-[12px] bg-[#F0F4FA] p-2.5'>
        <VkIcon className='size-5' />
      </a>
    </div>
  </div>
);
