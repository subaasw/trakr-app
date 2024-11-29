// import type { LoaderFunctionArgs } from '@remix-run/node';
// import { Outlet } from '@remix-run/react';
// import UserMetadataProps from '~/types/userMetadata';
// import SidebarLayout from '~/components/SidebarLayout';
// import { useLoaderData } from '@remix-run/react';
// import { getUser } from '~/supabase';

// export async function loader({ request }: LoaderFunctionArgs) {
//   const user = await getUser(request);

//   return Response.json(user);
// }

export default function DashboardLayout() {
  return <div className="flex">Dashboard Layout</div>;
}
