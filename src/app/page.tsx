'use client';
import { TestEvents } from '@/components/test-events';
import { Button } from '@/components/ui/button';
import user from '@/shared/mocks/user.json';
import { UserSchema } from '@/shared/types/user';
import { validateResult } from '@/shared/utils/zod.utils';
import Icon from '../assets/svg/helper-symbol.svg';

export default function Home() {
  const userAccount = validateResult(JSON.parse(JSON.stringify(user)), UserSchema);

  console.log('userAccount', userAccount);

  return (
    <div>
      <Button>Click me</Button>
      <Icon />
      <TestEvents />
    </div>
  );
}
