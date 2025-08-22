import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { BsCurrencyDollar } from 'react-icons/bs'
import { UseFormReturn } from 'react-hook-form'
import { ExpenseFormType } from '../hooks/useExpenseForm'

type InfoFormProps = {
  form: UseFormReturn<ExpenseFormType>
}

export function InfoForm({ form }: InfoFormProps) {
  console.log(form)

  return (
    <div className="flex flex-[0.7] flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <Label>Name</Label>
          <Input />
        </div>
        <div className="flex-1">
          <Label>Amount</Label>
          <Input startIcon={BsCurrencyDollar} />
        </div>
      </div>
      {/* <div className="flex items-end gap-4">
        <div className="flex-[0.8]">
          <Label>Search</Label>
          <Input placeholder="friends or group" />
        </div>
        <Button className="flex-[0.2]">Add</Button>
      </div> */}
      <div className="flex items-center justify-between">
        <ToggleGroup type="single" defaultValue="group" className="justify-start">
          <ToggleGroupItem value="group">Group</ToggleGroupItem>
          <ToggleGroupItem value="friend">Friend</ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup type="single" defaultValue="paid_equally" className="justify-start">
          <ToggleGroupItem value="paid_equally">Paid equally</ToggleGroupItem>
          <ToggleGroupItem value="paid_by_you">Paid by you</ToggleGroupItem>
          <ToggleGroupItem value="paid_by_them">Paid by them</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  )
}
