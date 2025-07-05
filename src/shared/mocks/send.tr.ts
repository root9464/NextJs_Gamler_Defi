export const onSendTransactionMock = () => {
  return [
    {
      sendTransaction: async () => {
        const fakeBoc = '1e95861ef87af4c75811a0e3aaebd0ef9044bbc84e31425619405b8158d2795c';
        return {
          boc: fakeBoc,
        };
      },
    },
  ];
};
