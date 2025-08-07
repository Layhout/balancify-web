import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UserAvatar } from '@/components/UserAvatar'
import { LuTrash2 } from 'react-icons/lu'

export function MemberForm() {
  return (
    <div className="flex flex-[0.7] flex-col gap-4">
      <div className="flex items-end gap-4">
        <div className="flex-[0.8]">
          <Label>Search</Label>
          <Input placeholder="friends or group" />
        </div>
        <Button className="flex-[0.2]">Search</Button>
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="flex flex-1 items-center gap-4">
            <UserAvatar
              imageUrl={`https://picsum.photos/id/${i * 5}/1000/1000`}
              fallbackText="AB"
              profileBgColor="pink"
            />
            <div className="flex-1">
              <h1 className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">Lorem ipsum</h1>
              <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">a@a.com</p>
            </div>
            <Button variant="ghost" size="icon">
              <LuTrash2 className="text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
