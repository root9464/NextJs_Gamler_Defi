'use client';
import { useModalManager } from '../video/scene/hooks/useModalManaget';

function ModalWrapper({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='animate-fadeIn w-full max-w-md rounded-2xl bg-white p-6 shadow-xl'>
        {children}
        <button onClick={onClose} className='absolute top-3 right-3 text-gray-500 transition hover:text-gray-800'>
          ✕
        </button>
      </div>
    </div>
  );
}

function ParentModal() {
  const parentModal = useModalManager('parent');
  const childModal = useModalManager('child');

  return (
    <>
      <button {...parentModal.getButtonProps()} className='rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700'>
        Открыть Parent
      </button>

      <ModalWrapper isOpen={parentModal.isOpen} onClose={parentModal.onClose}>
        <h2 className='mb-4 text-xl font-semibold'>Parent Modal</h2>
        <button
          onClick={() => {
            parentModal.onClose();
            childModal.onOpen();
          }}
          className='mb-2 rounded-lg bg-green-500 px-4 py-2 text-white transition hover:bg-green-600'>
          Открыть Child
        </button>
      </ModalWrapper>
    </>
  );
}

function ChildModal() {
  const childModal = useModalManager('child');

  return (
    <ModalWrapper isOpen={childModal.isOpen} onClose={childModal.onClose}>
      <h2 className='mb-4 text-xl font-semibold'>Child Modal</h2>
      <p className='mb-4'>Это дочерняя модалка внутри Parent.</p>
      <button className='rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600' onClick={childModal.onClose}>
        Закрыть Child
      </button>
    </ModalWrapper>
  );
}

export function TestModule() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-4'>
      <ParentModal />
      <ChildModal />
    </div>
  );
}
