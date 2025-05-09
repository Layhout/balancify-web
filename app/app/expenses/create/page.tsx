'use client'

import { PageHeader } from '@/components/PageHeader'
import AvatarForm from './_components/AvatarForm'
import InfoForm from './_components/InfoForm'

export default function CreateExpenses() {
  return (
    <div className="container pb-4">
      <PageHeader title="Create Expense" hasBackBtn />
      <div className="mt-6 flex gap-6">
        <AvatarForm />
        <InfoForm />
      </div>
    </div>
  )
}
