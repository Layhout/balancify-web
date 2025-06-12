export function Empty() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <img src="/assets/svgs/mood-bad.svg" className={'h-32 w-32'} alt="empty icon" />
      <h1 className="mt-8 text-lg">No Data</h1>
    </div>
  )
}
