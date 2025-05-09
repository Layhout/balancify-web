import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { LuTrash2 } from 'react-icons/lu'
import { BsCurrencyDollar } from 'react-icons/bs'

export default function InfoForm() {
  return (
    <div className="flex flex-[0.7] flex-col gap-6">
      <div className="flex gap-6">
        <div className="flex-1">
          <Label>Name</Label>
          <Input />
        </div>
        <div className="flex-1">
          <Label>Amount</Label>
          <Input startIcon={BsCurrencyDollar} />
        </div>
      </div>
      <div className="flex items-end gap-6">
        <div className="flex-[0.8]">
          <Label>Search</Label>
          <Input placeholder="friends or group" />
        </div>
        <Button className="flex-[0.2]">Add</Button>
      </div>
      <div>
        <ToggleGroup type="single" defaultValue="1" className="justify-start">
          <ToggleGroupItem value="1">Paid equally</ToggleGroupItem>
          <ToggleGroupItem value="2">Paid by you</ToggleGroupItem>
          <ToggleGroupItem value="3">Paid by them</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="flex flex-1 items-center gap-4">
            <Avatar>
              <AvatarImage src={`https://picsum.photos/id/${i * 5}/1000/1000`} alt="" />
              <AvatarFallback className="text-xs uppercase" style={{ backgroundColor: 'pink' }}>
                AB
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">Lorem ipsum</h1>
            </div>
            <div className="flex-[0.5]">
              <Input startIcon={BsCurrencyDollar} />
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
