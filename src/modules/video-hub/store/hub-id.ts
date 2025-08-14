import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

type IdType = number | null;

export const idRoom = atomWithStorage<IdType>('id-storage-key', null);

export const setIdRoom = atom(null, (_get, set, newId: number) => set(idRoom, newId));
