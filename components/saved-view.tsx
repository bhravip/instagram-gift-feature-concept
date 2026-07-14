"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Bookmark, ChevronLeft, Gift, X } from "lucide-react"
import { people, posts, type GiftSave } from "@/lib/data"
import { UserAvatar } from "./user-avatar"

export function SavedView({
  savedPostIds,
  giftSaves,
  onRemoveGift,
}: {
  savedPostIds: string[]
  giftSaves: GiftSave[]
  onRemoveGift: (saveId: string) => void
}) {
  const [collection, setCollection] = useState<"overview" | "gift" | "all">("overview")

  const giftCoverPosts = useMemo(() => {
    const ids = [...new Set(giftSaves.map((g) => g.postId))]
    return ids.map((id) => posts.find((p) => p.id === id)!).filter(Boolean).slice(0, 4)
  }, [giftSaves])

  const allSavedPosts = savedPostIds.map((id) => posts.find((p) => p.id === id)!).filter(Boolean)

  // group gift saves by person
  const groups = useMemo(() => {
    return people
      .map((person) => {
        const saves = giftSaves.filter((g) => g.personId === person.id)
        return { person, saves }
      })
      .filter((g) => g.saves.length > 0)
  }, [giftSaves])

  if (collection === "gift") {
    return (
      <div className="flex flex-col">
        <SubHeader title="Saved as gift" onBack={() => setCollection("overview")} />
        {groups.length === 0 ? (
          <EmptyGift />
        ) : (
          <div className="flex flex-col gap-6 px-3 py-4">
            {groups.map(({ person, saves }) => (
              <section key={person.id}>
                <div className="mb-2 flex items-center gap-2.5">
                  <UserAvatar name={person.name} color={person.avatarColor} size={36} ring />
                  <div>
                    <p className="text-sm font-semibold text-ig-text">{person.name}</p>
                    <p className="text-xs text-ig-muted">
                      {saves.length} {saves.length === 1 ? "gift idea" : "gift ideas"} · {person.relationship}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {saves.map((save) => {
                    const post = posts.find((p) => p.id === save.postId)!
                    return (
                      <div key={save.id} className="group relative aspect-square overflow-hidden rounded-md bg-ig-surface">
                        <Image src={post.image || "/placeholder.svg"} alt={post.productName} fill sizes="120px" className="object-cover" />
                        <button
                          type="button"
                          aria-label={`Remove ${post.productName} for ${person.name}`}
                          onClick={() => onRemoveGift(save.id)}
                          className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-black/60 text-ig-text"
                        >
                          <X className="size-3.5" />
                        </button>
                        {save.note && (
                          <span className="absolute inset-x-1 bottom-1 truncate rounded bg-black/65 px-1.5 py-0.5 text-[10px] text-ig-text">
                            {save.note}
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (collection === "all") {
    return (
      <div className="flex flex-col">
        <SubHeader title="All posts" onBack={() => setCollection("overview")} />
        {allSavedPosts.length === 0 ? (
          <div className="px-6 py-20 text-center text-sm text-ig-muted">
            Tap the bookmark on any post to save it here.
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1 p-3">
            {allSavedPosts.map((post) => (
              <div key={post.id} className="relative aspect-square overflow-hidden rounded-md bg-ig-surface">
                <Image src={post.image || "/placeholder.svg"} alt={post.productName} fill sizes="120px" className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // overview
  return (
    <div className="flex flex-col px-3 py-4">
      <div className="grid grid-cols-2 gap-3">
        {/* gift collection */}
        <button
          type="button"
          onClick={() => setCollection("gift")}
          className="flex flex-col overflow-hidden rounded-xl border border-ig-border text-left"
        >
          <div className="grid aspect-square grid-cols-2 grid-rows-2 gap-px bg-ig-border">
            {giftCoverPosts.length === 0 ? (
              <div className="col-span-2 row-span-2 flex items-center justify-center bg-ig-surface">
                <Gift className="size-8 text-gift" />
              </div>
            ) : (
              Array.from({ length: 4 }).map((_, i) => {
                const post = giftCoverPosts[i]
                return (
                  <div key={i} className="relative bg-ig-surface">
                    {post && <Image src={post.image || "/placeholder.svg"} alt="" fill sizes="120px" className="object-cover" />}
                  </div>
                )
              })
            )}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-2.5">
            <Gift className="size-4 text-gift" />
            <div>
              <p className="text-sm font-semibold text-ig-text">Saved as gift</p>
              <p className="text-xs text-ig-muted">{giftSaves.length} saved</p>
            </div>
          </div>
        </button>

        {/* all posts collection */}
        <button
          type="button"
          onClick={() => setCollection("all")}
          className="flex flex-col overflow-hidden rounded-xl border border-ig-border text-left"
        >
          <div className="grid aspect-square grid-cols-2 grid-rows-2 gap-px bg-ig-border">
            {allSavedPosts.length === 0 ? (
              <div className="col-span-2 row-span-2 flex items-center justify-center bg-ig-surface">
                <Bookmark className="size-8 text-ig-muted" />
              </div>
            ) : (
              Array.from({ length: 4 }).map((_, i) => {
                const post = allSavedPosts[i]
                return (
                  <div key={i} className="relative bg-ig-surface">
                    {post && <Image src={post.image || "/placeholder.svg"} alt="" fill sizes="120px" className="object-cover" />}
                  </div>
                )
              })
            )}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-2.5">
            <Bookmark className="size-4 text-ig-muted" />
            <div>
              <p className="text-sm font-semibold text-ig-text">All posts</p>
              <p className="text-xs text-ig-muted">{allSavedPosts.length} saved</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}

function SubHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="flex items-center gap-2 border-b border-ig-border px-2 py-3">
      <button type="button" onClick={onBack} aria-label="Back">
        <ChevronLeft className="size-6 text-ig-text" />
      </button>
      <h2 className="text-base font-semibold text-ig-text">{title}</h2>
    </div>
  )
}

function EmptyGift() {
  return (
    <div className="flex flex-col items-center px-6 py-20 text-center">
      <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-gift/15">
        <Gift className="size-8 text-gift" />
      </div>
      <p className="text-sm font-semibold text-ig-text">No gift ideas yet</p>
      <p className="mt-1 max-w-[220px] text-xs text-ig-muted">
        Press and hold the bookmark on any post, then choose “Save as gift” to start a list for someone.
      </p>
    </div>
  )
}
