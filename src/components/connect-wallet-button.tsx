'use client';

import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { Button } from './ui/button';

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
  return <Button onClick={handleConnectWallet}>{address ? sliceAddress : 'Подключить кошелек'}</Button>;
};
