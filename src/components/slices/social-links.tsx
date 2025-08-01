import FacebookIcon from '@assets/svg/facebook.svg';
import TelegramIcon from '@assets/svg/telegram.svg';
import VkIcon from '@assets/svg/vk.svg';
import { DynamicWalletConnectButton } from '../exports/exports';

export const SocialLinks = () => (
  <div className='grid grid-cols-[0.445fr_0.555fr] place-content-between content-center items-center gap-[3.7vw]'>
    <DynamicWalletConnectButton />
    <div className='flex flex-row items-center justify-center gap-1'>
      <a href='https://t.me/gamleronline' className='flex h-[2.7vw] w-[2.7vw] items-center justify-center rounded-[12px] bg-[#F0F4FA] p-2.5'>
        <TelegramIcon />
      </a>
      <a
        href='https://www.facebook.com/gamler.online'
        className='flex h-[2.7vw] w-[2.7vw] items-center justify-center rounded-[12px] bg-[#F0F4FA] p-2.5'>
        <FacebookIcon />
      </a>
      <a href='https://vk.com/gamler' className='flex h-[2.7vw] w-[2.7vw] items-center justify-center rounded-[12px] bg-[#F0F4FA] p-2.5'>
        <VkIcon />
      </a>
    </div>
  </div>
);
