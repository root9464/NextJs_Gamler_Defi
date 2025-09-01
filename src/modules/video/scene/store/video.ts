'use client';
import { atom } from 'jotai';

export const localStreamAtom = atom<MediaStream | null>(null);
export const remoteStreamsAtom = atom<MediaStream[]>([]);
