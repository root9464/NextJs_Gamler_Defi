'use client';

import { Button } from '@components/ui/button';
import { copyClipboard } from '@shared/utils/common.utils';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { Menu } from '../ui/menu';

export const WalletConnectButton = () => {
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();
  const sliceAddress = address?.slice(0, 6) + '...' + address?.slice(-4);
  const handleConnect = () => tonConnectUI.openModal();
  const handleDisconnect = () => tonConnectUI.disconnect();

  return (
    <>
      {!address ? (
        <Button className='bg-blue-500 hover:bg-blue-500/85' size='sm' onClick={handleConnect}>
          Подключить кошелек
        </Button>
      ) : (
        <Menu>
          <Button className='bg-blue-500 hover:bg-blue-500/85' size='sm'>
            {sliceAddress}
          </Button>
          <Menu.Content popover={{ placement: 'bottom' }}>
            <Menu.Item isHovered={false} onClick={() => copyClipboard(address)}>
              Копировать адресс
            </Menu.Item>
            <Menu.Item isHovered={false} onClick={handleDisconnect}>
              Отключиться
            </Menu.Item>
          </Menu.Content>
        </Menu>
      )}
    </>
  );
};
