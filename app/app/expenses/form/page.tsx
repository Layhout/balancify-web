'use client'

import { PageHeader } from '@/components/PageHeader'
import { AvatarForm } from './_components/AvatarForm'
import { InfoForm } from './_components/InfoForm'
import { Form } from '@/components/ui/form'
import { useExpenseForm } from './hooks/useExpenseForm'

export default function CreateExpenses() {
  const { expenseForm, onSubmitExpenseForm } = useExpenseForm()
  return (
    <div className="container pb-4">
      <PageHeader title="Create Expense" hasBackBtn />
      <Form {...expenseForm}>
        <form onSubmit={expenseForm.handleSubmit(onSubmitExpenseForm)}>
          <div className="mt-6 flex flex-col gap-4 md:flex-row">
            <AvatarForm form={expenseForm} />
            <InfoForm form={expenseForm} />
          </div>
        </form>
      </Form>
    </div>
  )
}
