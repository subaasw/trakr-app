import { Form } from '@remix-run/react';

import { GoogleLogo } from '@phosphor-icons/react';
import ShineButton from '~/components/Buttons/ShineButton';
import LogoIcon from '~/components/Icons/LogoIcon';

export default function LoginForm() {
  return (
    <main className="grid min-h-svh place-items-center">
      <Form method="POST" className="flex flex-col items-center space-y-4">
        <LogoIcon className="h-20 pb-2" />
        <h1 className="pb-8 text-center text-2xl leading-tight">Expense Tracking for Shared Living.</h1>

        <ShineButton>
          <GoogleLogo weight="bold" className="h-8 w-8 text-frost-100" />
          <p className="text-xl leading-tight text-frost-100">Continue with Google</p>
        </ShineButton>
      </Form>
    </main>
  );
}
