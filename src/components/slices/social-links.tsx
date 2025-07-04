import FacebookIcon from '@assets/svg/facebook.svg';
import TelegramIcon from '@assets/svg/telegram.svg';
import VkIcon from '@assets/svg/vk.svg';

export const SocialLinks = () => (
  <div className='grid grid-cols-[auto_auto] place-content-between content-center items-center gap-[70px]'>
    <a href='https://t.me/gamler_bot' target='_blank' className='hover:text-uiSecondaryText text-sm whitespace-nowrap text-black/85'>
      Напишите нам
    </a>
    <div className='flex flex-row items-center justify-center gap-2'>
      <div className='h-10 w-10 justify-center rounded-[12px] bg-[#F0F4FA] p-2.5'>
        <TelegramIcon />
      </div>
      <div className='h-10 w-10 justify-center rounded-[12px] bg-[#F0F4FA] p-2.5'>
        <FacebookIcon />
      </div>
      <div className='h-10 w-10 justify-center rounded-[12px] bg-[#F0F4FA] p-2.5'>
        <VkIcon />
      </div>
    </div>
  </div>
);
