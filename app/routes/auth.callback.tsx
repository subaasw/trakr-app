import { redirect, type LoaderFunctionArgs } from '@remix-run/node';
import { createSupabaseServerClient } from '~/supabase/auth.server';
import { checkNewUser } from '~/supabase';

export async function loader({ request }: LoaderFunctionArgs) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/';

  if (code) {
    const { supabase, headers } = createSupabaseServerClient(request);

    const {
      data: { user },
      error,
    } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && user?.id) {
      const isNewUser = await checkNewUser(request, user.id);

      if (isNewUser) {
        return redirect('/workspace/create', { headers });
      }

      return redirect(next, { headers });
    }
  }

  return redirect('/auth/error', { headers: new Headers() });
}
