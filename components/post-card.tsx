"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Bookmark, Gift, Heart, MessageCircle, MoreHorizontal, Send } from "lucide-react"
import type { Post } from "@/lib/data"
import { UserAvatar } from "./user-avatar"
import { cn } from "@/lib/utils"

export function PostCard({
  post,
  isSaved,
  giftCount,
  onToggleSave,
  onSaveAsGift,
}: {
  post: Post
  isSaved: boolean
  giftCount: number
  onToggleSave: () => void
  onSaveAsGift: () => void
}) {
  const [liked, setLiked] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const longPressTriggered = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const startPress = useCallback(() => {
    longPressTriggered.current = false
    timer.current = setTimeout(() => {
      longPressTriggered.current = true
      setMenuOpen(true)
    }, 450)
  }, [])

  const cancelPress = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  const handleSaveClick = useCallback(() => {
    // If a long press already opened the menu, ignore the trailing click.
    if (longPressTriggered.current) {
      longPressTriggered.current = false
      return
    }
    onToggleSave()
  }, [onToggleSave])

  useEffect(() => {
    if (!menuOpen) return
    const close = () => setMenuOpen(false)
    window.addEventListener("click", close)
    return () => window.removeEventListener("click", close)
  }, [menuOpen])

  return (
    <article className="border-b border-ig-border pb-3">
      {/* header */}
      <header className="flex items-center gap-3 px-3 py-2.5">
        <UserAvatar name={post.username} color={post.avatarColor} size={34} />
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-ig-text">{post.username}</span>
          <span className="text-xs text-ig-muted">{post.location}</span>
        </div>
        <MoreHorizontal className="ml-auto size-5 text-ig-text" />
      </header>

      {/* image */}
      <div className="relative aspect-square w-full bg-ig-surface">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.productName}
          fill
          sizes="420px"
          className="object-cover"
          priority={post.id === "p1"}
        />
      </div>

      {/* actions */}
      <div className="flex items-center gap-4 px-3 pt-3">
        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          aria-label="Like"
          className="transition-transform active:scale-90"
        >
          <Heart className={cn("size-6 text-ig-text", liked && "fill-red-500 text-red-500")} />
        </button>
        <button type="button" aria-label="Comment">
          <MessageCircle className="size-6 text-ig-text" />
        </button>
        <button type="button" aria-label="Share">
          <Send className="size-6 text-ig-text" />
        </button>

        {/* Save button with long-press menu */}
        <div className="relative ml-auto">
          {menuOpen && (
            <div
              role="menu"
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-9 right-0 z-20 w-52 overflow-hidden rounded-2xl border border-ig-border bg-ig-elevated shadow-2xl animate-in fade-in zoom-in-95 duration-150"
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false)
                  onToggleSave()
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-ig-text hover:bg-white/5"
              >
                <Bookmark className={cn("size-5", isSaved && "fill-ig-text")} />
                {isSaved ? "Remove from saved" : "Save"}
              </button>
              <div className="h-px bg-ig-border" />
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false)
                  onSaveAsGift()
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-gift hover:bg-gift/10"
              >
                <Gift className="size-5" />
                Save as gift
              </button>
            </div>
          )}

          <button
            type="button"
            aria-label="Save. Press and hold for gift options."
            onClick={handleSaveClick}
            onMouseDown={startPress}
            onMouseUp={cancelPress}
            onMouseLeave={cancelPress}
            onTouchStart={startPress}
            onTouchEnd={cancelPress}
            onContextMenu={(e) => {
              e.preventDefault()
              longPressTriggered.current = true
              setMenuOpen(true)
            }}
            className="relative transition-transform active:scale-90"
          >
            <Bookmark className={cn("size-6 text-ig-text", (isSaved || giftCount > 0) && "fill-ig-text")} />
            {giftCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex size-3.5 items-center justify-center rounded-full bg-gift text-[9px] font-bold text-gift-foreground">
                <Gift className="size-2.5" />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* likes + caption */}
      <div className="px-3 pt-2.5">
        <p className="text-sm font-semibold text-ig-text">{post.likes.toLocaleString()} likes</p>
        <p className="mt-1 text-sm text-ig-text">
          <span className="font-semibold">{post.username}</span> {post.caption}
        </p>
        {giftCount > 0 && (
          <p className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-gift">
            <Gift className="size-3.5" />
            Saved as a gift for {giftCount} {giftCount === 1 ? "person" : "people"}
          </p>
        )}
        <p className="mt-1 text-xs text-ig-muted">{post.timeAgo} ago</p>
      </div>
    </article>
  )
}
