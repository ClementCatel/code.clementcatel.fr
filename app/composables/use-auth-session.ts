import type { authClient } from '~/utils/auth-client'

type Session = typeof authClient.$Infer.Session

export function useAuthSession() {
  const headers = useRequestHeaders(['cookie'])

  return useFetch<Session | null>('/api/auth/get-session', {
    key: 'auth:session',
    headers,
    server: true,
  })
}