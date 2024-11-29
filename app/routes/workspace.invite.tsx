import { ActionFunctionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { workspaceInviteMember } from '~/supabase';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const memberEmail = formData.get('email') as string;

  if (memberEmail) {
    const response = await workspaceInviteMember(request, memberEmail);
  }

  return memberEmail
}

export default function MemberInvitationForm() {
  return (
    <Form method="post" className="w-80 space-y-4 bg-frost-300 px-6 py-5">
      <p className="text-sm font-medium">Invite your Room Mate</p>
      <input type="email" name="email" id="email" placeholder='enter email address'/>
      <button className="bg-twilight px-6 py-2 text-white" type="submit">
        Invite
      </button>
    </Form>
  );
}
