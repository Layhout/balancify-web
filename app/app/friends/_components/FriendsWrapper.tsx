import FriendCardPlaceholder from './FriendCardPlaceholder'

export default function FriendsWrapper({
  children,
  loading,
}: Readonly<{
  children?: React.ReactNode
  loading: boolean
}>) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {loading ? Array.from({ length: 3 }, (_, i) => <FriendCardPlaceholder key={i} />) : children}
    </div>
  )
}
