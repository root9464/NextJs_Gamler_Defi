export const onSendTransactionMock = () => {
  return {
    sendTransaction: async () => {
      const fakeBoc = '03f8ccf2ff685157612a0f7fb9a56323bc4fadf2dab718277717c1c35ea6ef8f';
      return {
        boc: fakeBoc,
      };
    },
  };
};
