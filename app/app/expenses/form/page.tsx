'use client'

import { PageHeader } from '@/components/PageHeader'
import { AvatarForm } from './_components/AvatarForm'
import { InfoForm } from './_components/InfoForm'
import { Form } from '@/components/ui/form'
import { useExpenseForm } from './hooks/useExpenseForm'
import { Button } from '@/components/ui/button'
import { LuLoaderCircle } from 'react-icons/lu'

export default function CreateExpenses() {
  const { expenseForm, memberExpenseAmountForm, onSubmitExpenseForm, isSubmitting, isEdit } = useExpenseForm()

  return (
    <>
      <div className="container pb-20">
        <PageHeader title="Create Expense" hasBackBtn />
        <Form {...expenseForm}>
          <form onSubmit={expenseForm.handleSubmit(onSubmitExpenseForm)} id="expenseForm">
            <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-start">
              <AvatarForm form={expenseForm} />
              <InfoForm
                form={expenseForm}
                memberForm={memberExpenseAmountForm}
                isSubmitting={isSubmitting}
                isEdit={isEdit}
              />
            </div>
          </form>
        </Form>
      </div>
      <div className="fixed bottom-0 left-0 right-0 block bg-background p-4 md:hidden">
        <Button
          type="submit"
          form="expenseForm"
          disabled={isSubmitting || !expenseForm.formState.isDirty}
          className="w-full gap-2"
        >
          {isSubmitting && <LuLoaderCircle className="animate-spin" />}
          {isEdit ? 'Update' : 'Create'}
        </Button>
      </div>
    </>
  )
}
