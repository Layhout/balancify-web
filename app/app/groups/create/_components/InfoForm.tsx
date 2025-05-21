import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function InfoForm() {
  return (
    <div className="flex flex-[0.3] flex-col gap-4">
      <div>
        <Label>Name</Label>
        <Input />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea />
      </div>
    </div>
  )
}
