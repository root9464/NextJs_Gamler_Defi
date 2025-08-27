import InfoIco from '@/assets/svg/info.svg';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import PhoneIco from '@assets/svg/phone.svg';
import TgIco from '@assets/svg/telega.svg';

const PLAYER_INFO_DATA = [
  { label: 'Сайт', value: 'https://tgame-online.ru' },
  { label: 'Телефон', value: '+7 854 527 25 23' },
  { label: 'E-mail', value: 'Olegg@mail.ru' },
  { label: 'О себе', value: 'Мне важно чувствовать контакт с людьми. Через игру я лучше понимаю себя и учусь новому у других участников.' },
  {
    label: 'Дополнительная информация',
    value:
      'Интересуется командной психологией и применением трансформационных игр в бизнесе. Участвовала в более чем 30 сессиях и стремится к развитию навыков коммуникации.',
  },
];

export const UserInfo = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Trigger onClick={onOpen} className='flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-[#222226]'>
        <InfoIco />
      </Modal.Trigger>
      <Modal.Content size='xl'>
        <Modal.Header>Карты игрока</Modal.Header>
        <Modal.Body className='flex flex-col gap-3 border-t border-b border-black/10 pt-[22px] pb-[17px]'>
          <div className='flex flex-col items-center gap-2.5'>
            <div className='flex h-[150px] w-[150px] items-center justify-center rounded-full bg-gray-600 text-white'>?</div>
            <UserHeader />
            <DataInfo />
          </div>
        </Modal.Body>
        <Modal.Footer className='flex h-full items-center justify-end sm:h-8'>
          <Button onClick={onClose} className='w-full font-normal text-red-500 sm:w-fit' intent='plain'>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

const DataInfo = () => {
  return (
    <div className='flex flex-col gap-2.5'>
      {PLAYER_INFO_DATA.map(({ label, value }) => (
        <div className='flex flex-col gap-2.5'>
          <h2 className='font-semibold'>{label}</h2>
          <p>{value}</p>
        </div>
      ))}
    </div>
  );
};

const UserHeader = () => {
  return (
    <>
      <h1>Игрок - Игрок 1</h1>
      <div className='flex gap-[30px]'>
        <div className='flex items-center gap-2.5'>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0F4FA]'>
            <TgIco />
          </div>
          <p>@igrok1</p>
        </div>
        <div className='flex items-center gap-2.5'>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0F4FA]'>
            <PhoneIco />
          </div>
          <p>+7 950 183 1100</p>
        </div>
      </div>
    </>
  );
};
