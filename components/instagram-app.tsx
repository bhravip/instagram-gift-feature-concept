"use client"

import { useMemo, useState } from "react"
import { Bookmark, Gift, Heart, Home, PlusSquare, Search } from "lucide-react"
import { people, posts, type GiftSave } from "@/lib/data"
import { PostCard } from "./post-card"
import { SaveGiftSheet } from "./save-gift-sheet"
import { SavedView } from "./saved-view"
import { UserAvatar } from "./user-avatar"
import { cn } from "@/lib/utils"

type Tab = "home" | "saved"

export function InstagramApp() {
  const [tab, setTab] = useState<Tab>("home")
  const [savedPostIds, setSavedPostIds] = useState<string[]>([])
  const [giftSaves, setGiftSaves] = useState<GiftSave[]>([])
  const [giftSheetPostId, setGiftSheetPostId] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [hintDismissed, setHintDismissed] = useState(false)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2600)
  }

  const toggleSave = (postId: string) => {
    setSavedPostIds((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  const giftCountByPost = useMemo(() => {
    const map: Record<string, number> = {}
    for (const g of giftSaves) map[g.postId] = (map[g.postId] ?? 0) + 1
    return map
  }, [giftSaves])

  const sheetPost = giftSheetPostId ? posts.find((p) => p.id === giftSheetPostId) ?? null : null
  const existingPersonIdsForSheet = sheetPost
    ? giftSaves.filter((g) => g.postId === sheetPost.id).map((g) => g.personId)
    : []

  const confirmGift = (personIds: string[], note: string) => {
    if (!sheetPost) return
    const newSaves: GiftSave[] = personIds
      // avoid duplicating the same post+person combo
      .filter((pid) => !existingPersonIdsForSheet.includes(pid))
      .map((pid) => ({
        id: `${sheetPost.id}-${pid}-${Date.now()}`,
        postId: sheetPost.id,
        personId: pid,
        note: note || undefined,
        savedAt: new Date().toISOString(),
      }))
    setGiftSaves((prev) => [...prev, ...newSaves])
    setGiftSheetPostId(null)
    const names = personIds.map((id) => people.find((p) => p.id === id)?.name).filter(Boolean)
    const label =
      names.length === 1 ? names[0] : names.length === 2 ? `${names[0]} and ${names[1]}` : `${names.length} people`
    showToast(`Saved as a gift for ${label}`)
  }

  return (
    <div className="relative flex h-full flex-col bg-ig-bg">
      {/* top bar */}
      <header className="flex items-center justify-between border-b border-ig-border px-4 py-3">
        <span className="text-xl font-semibold tracking-tight text-ig-text" style={{ fontFamily: "cursive" }}>
          Instagram
        </span>
        <div className="flex items-center gap-4">
          <Heart className="size-6 text-ig-text" />
          <Gift className="size-6 text-gift" />
        </div>
      </header>

      {/* scroll area */}
      <main className="flex-1 overflow-y-auto">
        {tab === "home" && (
          <>
            {!hintDismissed && (
              <div className="m-3 flex items-start gap-2.5 rounded-xl border border-gift/40 bg-gift/10 p-3">
                <Gift className="mt-0.5 size-4 shrink-0 text-gift" />
                <p className="text-xs text-ig-text">
                  <span className="font-semibold">New: </span>
                  Press and hold the{" "}
                  <Bookmark className="inline size-3.5 align-text-bottom" /> bookmark on a post to{" "}
                  <span className="font-semibold text-gift">Save as gift</span> for someone.
                </p>
                <button
                  type="button"
                  onClick={() => setHintDismissed(true)}
                  className="ml-auto shrink-0 text-xs font-semibold text-gift"
                >
                  Got it
                </button>
              </div>
            )}
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                isSaved={savedPostIds.includes(post.id)}
                giftCount={giftCountByPost[post.id] ?? 0}
                onToggleSave={() => toggleSave(post.id)}
                onSaveAsGift={() => setGiftSheetPostId(post.id)}
              />
            ))}
          </>
        )}

        {tab === "saved" && (
          <SavedView
            savedPostIds={savedPostIds}
            giftSaves={giftSaves}
            onRemoveGift={(saveId) => setGiftSaves((prev) => prev.filter((g) => g.id !== saveId))}
          />
        )}
      </main>

      {/* bottom nav */}
      <nav className="flex items-center justify-around border-t border-ig-border py-2.5">
        <button type="button" onClick={() => setTab("home")} aria-label="Home">
          <Home className={cn("size-6 text-ig-text", tab === "home" && "fill-ig-text")} />
        </button>
        <button type="button" aria-label="Search">
          <Search className="size-6 text-ig-text" />
        </button>
        <button type="button" aria-label="Create">
          <PlusSquare className="size-6 text-ig-text" />
        </button>
        <button type="button" onClick={() => setTab("saved")} aria-label="Saved" className="relative">
          <Bookmark className={cn("size-6 text-ig-text", tab === "saved" && "fill-ig-text")} />
          {giftSaves.length > 0 && (
            <span className="absolute -right-2 -top-1.5 flex min-w-4 items-center justify-center rounded-full bg-gift px-1 text-[9px] font-bold text-gift-foreground">
              {giftSaves.length}
            </span>
          )}
        </button>
        <button type="button" aria-label="Profile">
          <UserAvatar name="You" color="oklch(0.6 0.13 280)" size={26} />
        </button>
      </nav>

      {/* gift sheet */}
      {sheetPost && (
        <SaveGiftSheet
          post={sheetPost}
          existingPersonIds={existingPersonIdsForSheet}
          onClose={() => setGiftSheetPostId(null)}
          onConfirm={confirmGift}
        />
      )}

      {/* toast */}
      {toast && (
        <div className="pointer-events-none absolute inset-x-0 bottom-20 z-50 flex justify-center px-6">
          <div className="flex items-center gap-2 rounded-full bg-gift px-4 py-2.5 text-sm font-medium text-gift-foreground shadow-lg animate-in fade-in slide-in-from-bottom-2">
            <Gift className="size-4" />
            {toast}
            <button
              type="button"
              onClick={() => {
                setToast(null)
                setTab("saved")
              }}
              className="pointer-events-auto ml-1 font-semibold underline underline-offset-2"
            >
              View
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
