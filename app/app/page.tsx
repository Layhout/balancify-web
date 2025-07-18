import { ROUTES } from '@/lib/constants'
import { redirect } from 'next/navigation'

export default function App() {
  redirect(ROUTES.APP.DASHBOARD)
}
