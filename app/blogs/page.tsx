import BlogListItem from './_components/BlogListItem'

export default function Blogs() {
  return (
    <main className="container sm:max-w-4xl">
      <header className="py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Dev Blogs</h1>
        <p className="text-gray-700">New updated, improvements and fixes to Balancify.</p>
      </header>
      <article>
        <ul>
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
