'use client'

import { PageHeader } from '@/components/PageHeader'
import { InfoForm } from './_components/InfoForm'
import { MemberForm } from './_components/MemberForm'

export default function CreateGroup() {
  return (
    <div className="container pb-4">
      <PageHeader title="Create Group" hasBackBtn />
      <div className="mt-6 flex flex-col gap-4 md:flex-row">
        <InfoForm />
        <MemberForm />
      </div>
    </div>
  )
}
