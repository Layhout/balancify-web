import Link from 'next/link'
import { BlogListItem } from './_components/BlogListItem'
import { ROUTES } from '@/lib/constants'

export default function Blogs() {
  return (
    <main className="container sm:max-w-4xl">
      <header className="py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Dev Blogs</h1>
        <p className="text-muted-foreground">New updated, improvements and fixes to Balancify.</p>
      </header>
      <article>
        <ul>
          <BlogListItem date="2025-09-12" title="v1.0.0-beta Release! 🚀🎉" version="v1.0.0-beta">
            <p>
              I am excited to announce the beta release of Balancify! 🎉 This early version of our web app is now live
              and ready for you to explore. During the beta phase, we’re focusing on gathering feedback, improving
              stability, and refining features.
            </p>
            <p>✅ What you can do:</p>
            <ul className="text-md flex list-disc flex-col gap-2 pl-4 pt-2">
              <li>Sign up and start using the app today.</li>
              <li>Invite your friends to try it out.</li>
              <li>Add friends who are already using the app.</li>
              <li>Create groups with your friends.</li>
              <li>Start tracking your expenses.</li>
              <li>Review your spending on dashboard.</li>
            </ul>
            <p>
              Report bugs or share your feedback on{' '}
              <Link href="https://github.com/Layhout/balancify-web/issues" target="_blank" className="underline">
                GitHub
              </Link>{' '}
              issues. Your input will help shape the future of Balancify. Thank you for being part of our journey!
            </p>
            <p>
              👉 Try it now:{' '}
              <Link href={ROUTES.APP.HOME} className="underline">
                Balancify
              </Link>
            </p>
          </BlogListItem>
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
            <p>What we did:</p>
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
