import { GroupRowPlaceholder } from './GroupRowPlaceholder'

export function GroupWrapper({
  children,
  loading,
}: Readonly<{
  children?: React.ReactNode
  loading: boolean
}>) {
  return (
    <ul className="flex w-full flex-col gap-4">
      <li className="flex items-center gap-4 px-4 py-0">
        <h1 className="flex-[0.6] text-sm lg:flex-[0.4]">Name</h1>
        <h1 className="hidden flex-[0.4] text-sm lg:block">Members</h1>
        <h1 className="hidden flex-[0.2] text-sm lg:block">Created</h1>
      </li>
      {loading ? Array.from({ length: 3 }, (_, i) => <GroupRowPlaceholder key={i} />) : children}
    </ul>
  )
}
