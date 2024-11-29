import UserMetadataProps from '~/types/userMetadata';
import SidebarLayout from '~/components/SidebarLayout';
import { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { getUser } from '~/supabase';

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request);

  return Response.json(user);
}

export default function Dashboard() {
  const user: UserMetadataProps = useLoaderData();

  return (
    <div className="flex">
      <SidebarLayout full_name={user.full_name} email={user.email} avatar_url={user.avatar_url} />
      <div className="h-[400vh] w-full bg-[#fff] p-4">
        <Outlet />
      </div>
    </div>
  );
}
