import Link from 'next/link'
import { BlogListItem } from './_components/BlogListItem'

export default function Blogs() {
  return (
    <main className="container sm:max-w-4xl">
      <header className="py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Dev Blogs</h1>
        <p className="text-muted-foreground">New updated, improvements and fixes to Balancify.</p>
      </header>
      <article>
        <ul>
          <BlogListItem date="2025-05-20" title="v0.0.0-alpha-0 POC Release! 🎉" version="v0.0.0-alpha-0">
            <p>
              After a long hiatus, I&apos;m finally back to working on this project! This release focuses solely on the
              UI, core concepts, and feature layout—it does not include any actual functionality yet. All the data shown
              is randomly generated using the{' '}
              <Link href="https://fakerjs.dev/" target="_blank" className="underline">
                Faker.js
              </Link>{' '}
              library. The next step will be integrating the UI with real APIs. I&apos;ve decided to use{' '}
              <Link href="https://firebase.google.com/" target="_blank" className="underline">
                Firebase
              </Link>{' '}
              as the backend for this project.
            </p>
          </BlogListItem>
          <BlogListItem date="2024-12-06" title="Development continued" version="v0.0.0-alpha-0">
            <p>With personal matters resolved, the development process has resumed.</p>
          </BlogListItem>
          <BlogListItem date="2024-05-16" title="Development put on hold" version="v0.0.0-alpha-0">
            <p>
              Due to personal matters requiring immediate attention, the development process has been temporarily put on
              hold.
            </p>
          </BlogListItem>
          <BlogListItem date="2024-04-27" title="Journey Started" version="v0.0.0-alpha-0">
            <ul className="text-md flex list-disc flex-col gap-2 pl-4 pt-2">
              <li>Choose tech stacks.</li>
              <li>Planning app workflow.</li>
              <li>Discuss app functionality.</li>
              <li>Discuss app UX/UI.</li>
            </ul>
          </BlogListItem>
        </ul>
      </article>
    </main>
  )
}
