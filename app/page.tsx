import { InstagramApp } from "@/components/instagram-app"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-neutral-900 px-4 py-8">
      <header className="text-center">
        <h1 className="text-pretty text-2xl font-semibold text-white">Instagram · “Save as Gift” concept</h1>
        <p className="mx-auto mt-2 max-w-md text-pretty text-sm text-neutral-400">
          Press and hold the bookmark on any post to save it as a gift for one or more people. Then open the Saved tab to
          see ideas grouped by person.
        </p>
      </header>

      {/* phone frame */}
      <div className="h-[760px] w-[400px] max-w-full overflow-hidden rounded-[2.25rem] border-[10px] border-neutral-800 bg-ig-bg shadow-2xl">
        <InstagramApp />
      </div>
    </div>
  )
}
