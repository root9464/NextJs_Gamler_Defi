import InfoIco from '@/assets/svg/info.svg';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import PhoneIco from '@assets/svg/phone.svg';
import TgIco from '@assets/svg/telega.svg';

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
          <div className='flex flex-col items-center gap-[10px]'>
            <div className='flex h-[150px] w-[150px] items-center justify-center rounded-full bg-gray-600 text-white'>?</div>
            <h1>Игрок - Игрок 1</h1>
            <div className='flex gap-[30px]'>
              <div className='flex items-center gap-[11px]'>
                <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0F4FA]'>
                  <TgIco />
                </div>
                <p>@igrok1</p>
              </div>
              <div className='flex items-center gap-[11px]'>
                <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0F4FA]'>
                  <PhoneIco />
                </div>
                <p>+7 950 183 1100</p>
              </div>
            </div>
            <div className='flex w-full flex-col gap-[10px]'>
              {/* Ряд 1 */}
              <div className='flex w-full items-start justify-start gap-[30px]'>
                <p className='flex-shrink-0 text-[#A2A2A2]'>Сайт</p>
                <p className='text-black'>https://tgame-online.ru</p>
              </div>

              {/* Ряд 2 */}
              <div className='flex w-full items-start justify-start gap-[30px]'>
                <p className='flex-shrink-0 text-[14px] text-[#A2A2A2]'>Телефон</p>
                <p className='text-black'>+7 854 527 25 23</p>
              </div>

              {/* Ряд 3 */}
              <div className='flex w-full items-start justify-start gap-[30px]'>
                <p className='flex-shrink-0 text-[#A2A2A2]'>E-mail</p>
                <p className='text-black'>Olegg@mail.ru</p>
              </div>

              {/* Ряд 4 */}
              <div className='flex w-full items-start justify-start gap-[30px]'>
                <p className='flex-shrink-0 text-[#A2A2A2]'>О себе</p>
                <p className='text-black'>
                  Мне важно чувствовать контакт с людьми. Через игру я лучше понимаю себя и учусь новому у других участников.
                </p>
              </div>

              {/* Ряд 5 */}
              <div className='flex w-full items-start justify-start gap-[30px]'>
                <p className='flex-shrink-0 text-[#A2A2A2]'>Дополнительная информация</p>
                <p className='text-black'>
                  Интересуется командной психологией и применением трансформационных игр в бизнесе. Участвовала в более чем 30 сессиях и
                  стремится к развитию навыков коммуникации.
                </p>
              </div>
            </div>
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
