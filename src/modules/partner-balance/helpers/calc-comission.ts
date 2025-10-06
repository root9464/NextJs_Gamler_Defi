const MIN_TONS_FOR_STORGAE = 20000000;
const TONS_FOR_COMISSION = 50000000;


export const calcComission = (tons: number, iter: number) => (tons >= MIN_TONS_FOR_STORGAE + (TONS_FOR_COMISSION * iter))
