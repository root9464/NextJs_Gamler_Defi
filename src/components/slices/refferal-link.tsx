import { MyInviteLink } from './my-invite-link';

export const ReferralLink = () => (
  <div className='flex h-fit w-full max-w-[1141px] flex-col gap-5 sm:h-[128px]'>
    <h2 className='heading-1'>Вы можете пригласить пользователя через персональную ссылку:</h2>
    <div className='flex h-fit flex-row items-center justify-between gap-9 bg-[#F6FFED] px-5 py-4 sm:h-[90px] sm:px-[26px]'>
      <MyInviteLink />
      <p className='hidden w-[585px] text-sm text-black/85 sm:block'>
        Также можно просто <span className='text-sm font-bold'>попросить человека указать ваш Telegram-ник</span> при регистрации в{' '}
        <a href='https://t.me/GamlerOfficialBot' className='text-uiSecondaryText text-sm underline'>
          Telegram-боте.
        </a>
      </p>
    </div>
  </div>
);
