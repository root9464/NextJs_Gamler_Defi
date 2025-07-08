import FacebookIcon from '@assets/svg/facebook.svg';
import TelegramIcon from '@assets/svg/telegram.svg';
import VkIcon from '@assets/svg/vk.svg';

export const SocialLinks = () => (
  <div className='grid grid-cols-[128.33px_159.59px] place-content-between content-center items-center gap-[70px]'>
    <a href='https://t.me/gamler_bot' target='_blank' className='hover:text-uiSecondaryText mx-[15px] text-sm whitespace-nowrap text-black'>
      Напишите нам
    </a>
    <div className='flex flex-row items-center justify-center gap-1'>
      <div className='flex h-[50px] w-[50px] items-center justify-center rounded-[12px] bg-[#F0F4FA] p-2.5'>
        <TelegramIcon />
      </div>
      <div className='flex h-[50px] w-[50px] items-center justify-center rounded-[12px] bg-[#F0F4FA] p-2.5'>
        <FacebookIcon />
      </div>
      <div className='flex h-[50px] w-[50px] items-center justify-center rounded-[12px] bg-[#F0F4FA] p-2.5'>
        <VkIcon />
      </div>
    </div>
  </div>
);
