import { json, redirect } from '@remix-run/node';
import { createSupabaseServerClient } from './auth.server';

enum USER_ROLE {
  ADMIN = 'admin',
  USER = 'user',
}

enum HTTP_STATUS {
  CREATED = 201,
  NOTFOUND = 404,
}

interface workspaceProps {
  name: string;
  members?: Array<String>;
}

interface expensesProps {
  title: string;
  price: number;
  paidBy?: string;
}

export const signInWithGoogle = async (request: Request) => {
  const { supabase, headers } = createSupabaseServerClient(request);

  const { data } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: process.env.APP_URL + '/auth/callback',
    },
  });

  return { url: data.url || '/', headers };
};

export const signOut = async (request: Request, successRedirectPath: string = '/') => {
  const { supabase, headers } = createSupabaseServerClient(request);
  const { error } = await supabase.auth.signOut();

  if (!error) {
    throw redirect(successRedirectPath, { headers });
  }

  return json({ error: error.message });
};

export const getUser = async (request: Request) => {
  const { supabase } = createSupabaseServerClient(request);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user.id) {
    const {
      id,
      user_metadata: { name, email, avatar_url, full_name },
    } = session.user;

    return { id, name, email, avatar_url, full_name };
  }

  return null;
};

export const isAuthenticated = async (request: Request): Promise<boolean> => {
  const { supabase } = createSupabaseServerClient(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return !!user?.id;
};

export const checkNewUser = async (request: Request, id: string): Promise<boolean> => {
  const { supabase } = createSupabaseServerClient(request);

  const { data: user } = await supabase.from('usermeta').select('user_id').eq('user_id', id).maybeSingle();
  return !user?.user_id;
};

export const addUserMetadata = async (request: Request, workspaceId: string | null) => {
  const { supabase } = createSupabaseServerClient(request);
  const userData = await getUser(request);

  if (userData) {
    const { error: insertError, statusText } = await supabase.from('usermeta').insert({
      user_id: userData.id,
      name: userData.name,
      email: userData.email,
      role: USER_ROLE.ADMIN,
      workspace_id: workspaceId,
    });

    if (insertError) {
      return insertError;
    }

    return statusText;
  }

  return false;
};

export const fetchUserMetadata = async (request: Request) => {
  const { supabase } = createSupabaseServerClient(request);
  const user = await getUser(request);

  const { data: userMetadata } = await supabase
    .from('usermeta')
    .select()
    .eq('user_id', user?.id as string)
    .maybeSingle();

  return userMetadata;
};

export const getWorkspaceInfo = async (request: Request) => {
  const { supabase } = createSupabaseServerClient(request);
  const userData = await getUser(request);

  if (userData?.id) {
    const { data } = await supabase
      .from('usermeta')
      .select(`user_id, workspace( workspace_id, members, name )`)
      .eq('user_id', userData.id)
      .maybeSingle();

    //@ts-ignore
    const memberIds = data?.workspace?.members;

    const { data: members } = await supabase.from('usermeta').select('user_id, name').in('user_id', memberIds);

    return {
      memberList: members,
      user_id: data?.user_id,
      workspace: data?.workspace,
    };
  }

  return null;
};

export const createWorkspace = async (request: Request, { name, members = [] }: workspaceProps) => {
  const { supabase } = createSupabaseServerClient(request);

  const userData = await getUser(request);
  if (!userData) return 'User Not Found!';

  const {
    data: workspaceInfo,
    error: insertError,
    status,
  } = await supabase
    .from('workspace')
    .insert({
      name,
      members: [userData.id],
    })
    .select()
    .maybeSingle();

  if (!insertError) {
    await addUserMetadata(request, workspaceInfo?.workspace_id || '');
    return workspaceInfo;
  }

  return status === 201;
};

export const createExpenses = async (request: Request, { title, price, paidBy }: expensesProps) => {
  const { supabase } = createSupabaseServerClient(request);
  const userMetadata = await fetchUserMetadata(request);

  if (userMetadata?.user_id) {
    const { status } = await supabase.from('expenses').insert({
      title,
      price,
      paid_by: paidBy ? paidBy : userMetadata.user_id,
      workspace_id: userMetadata?.workspace_id,
      user_id: userMetadata.user_id,
    });

    return status;
  }

  return HTTP_STATUS.NOTFOUND;
};

export const workspaceInviteMember = async (request: Request, email: string) => {
  const { supabase } = createSupabaseServerClient(request);

  const { data: invitedUser, error } = await supabase
    .from('usermeta')
    .select('user_id')
    .eq('email', email)
    .maybeSingle();

  if (error) {
    return error;
  }

  if (invitedUser?.user_id) {
    const currentUser = await getUser(request);

    const { data } = await supabase
      .from('usermeta')
      .select('workspace(workspace_id)')
      .eq('user_id', currentUser?.id)
      .maybeSingle();

    //@ts-ignore
    const wsId = data?.workspace?.workspace_id;

    const {
      data: updatedData,
      error: workspaceInvitationError,
      ...rest
    } = await supabase
      .from('usermeta')
      .update({
        workspace_id: wsId,
        role: USER_ROLE.USER,
        is_invited: true,
      })
      .eq('user_id', invitedUser.user_id)
      .select();

    console.log('updated data', wsId, invitedUser.user_id, updatedData, rest);

    const { data: workspace } = await supabase
      .from('workspace')
      .select('members')
      .eq('workspace_id', wsId)
      .maybeSingle();

    const workspaceMembers = workspace?.members || [];

    console.log('workspaceMembers', workspaceMembers);

    if (Array.isArray(workspaceMembers)) {
      const { error: workspaceMemberUpdateError, ...rest } = await supabase
        .from('workspace')
        .update({
          members: [...workspaceMembers, invitedUser.user_id],
        })
        .eq('workspace_id', wsId);

      return workspaceMemberUpdateError;
    }

    return workspaceInvitationError;
  }

  return 'User Not found!';
};
