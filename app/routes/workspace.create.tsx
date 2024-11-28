import { redirect, json, type ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { addUserMetadata, checkNewUser, createWorkspace, getUser } from '~/supabase';

export async function loader({ request }: LoaderFunctionArgs) {
  const userData = await getUser(request);
  const isNewUser = await checkNewUser(request, userData?.id as string);

  if (isNewUser) {
    await addUserMetadata(request, null);
    return null;
  }

  return redirect('/');
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const workspaceName = formData.get('name') as string;
  if (workspaceName) {
    const isSuccess = await createWorkspace(request, { name: workspaceName });
    if (isSuccess) {
      return redirect('/');
    }

    return json('Something went wrong please try again later.', {
      status: 500,
    });
  }

  return json('Bad Request! Missing name field', { status: 400 });
}

export default function CreateWorkspace() {
  return (
    <div>
      <Form method="post" className="block space-y-3 bg-frost-200">
        <input type="text" name="name" id="workspace-name" placeholder="Workspace Name" />
        <button type="submit" className="bg-twilight px-6 py-2 text-white">
          Create
        </button>
      </Form>
    </div>
  );
}
