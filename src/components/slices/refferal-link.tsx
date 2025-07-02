import { MyInviteLink } from './my-invite-link';

export const ReferralLink = () => (
  <div className='flex h-[128px] w-full max-w-[1141px] flex-col gap-5'>
    <h2 className='heading-1'>Вы можете пригласить пользователя через персональную ссылку:</h2>
    <div className='flex h-[90px] flex-row items-center justify-between gap-9 bg-[#F6FFED] px-[26px]'>
      <MyInviteLink />
      <p className='w-[585px] text-sm text-black/85'>
        Также можно просто <span className='text-sm font-bold'>попросить человека указать ваш Telegram-ник</span> при регистрации в{' '}
        <a href='#' className='text-uiSecondaryText text-sm underline'>
          Telegram-боте.
        </a>
      </p>
    </div>
  </div>
);
