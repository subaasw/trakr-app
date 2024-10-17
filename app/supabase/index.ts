import { json, redirect } from '@remix-run/node';
import { createSupabaseServerClient } from './auth.server';


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

  return session?.user.user_metadata || null;
};

export const isUserLoggedIn = async (request: Request) => {
  const { supabase } = createSupabaseServerClient(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return !!user;
};
