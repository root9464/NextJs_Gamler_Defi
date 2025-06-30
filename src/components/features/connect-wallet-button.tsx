'use client';

import { Button } from '@components/ui/button';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';

export const WalletConnectButton = () => {
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();
  const sliceAddress = address?.slice(0, 6) + '...' + address?.slice(-4);
  const handleConnectWallet = () => {
    if (!address) {
      tonConnectUI.openModal();
    }
    tonConnectUI.disconnect();
  };
  return (
    <Button className='bg-blue-500 hover:bg-blue-500/85' onClick={handleConnectWallet}>
      {address ? sliceAddress : 'Подключить кошелек'}
    </Button>
  );
};
