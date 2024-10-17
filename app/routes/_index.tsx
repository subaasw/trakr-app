import { json, redirect } from '@remix-run/node';
import type { MetaFunction, ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { getUser, signInWithGoogle } from '~/supabase';
import LoginForm from '~/components/Login';
import { useLoaderData } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Trakr | Expenses Tracker' },
    {
      name: 'description',
      content: 'This is the application for our roommate expenses',
    },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const { url, headers } = await signInWithGoogle(request);
  return redirect(url, { headers });
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request);
  return json(user);
}

export default function Index() {
  const userData = useLoaderData();
  console.log('userdata', userData);

  return <LoginForm />;
}
