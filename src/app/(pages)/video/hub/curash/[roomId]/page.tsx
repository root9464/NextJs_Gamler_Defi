'use client';
import { idRoom } from '@/modules/video-hub/store/hub-id';
import { useAtomValue } from 'jotai';

export default function Curash() {
  const currentId = useAtomValue(idRoom);
  console.log(currentId, 'roomId');
  return <div>Curash</div>;
}
