"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Check, Gift, Search, X } from "lucide-react"
import { people as allPeople, type Post } from "@/lib/data"
import { UserAvatar } from "./user-avatar"
import { cn } from "@/lib/utils"

export function SaveGiftSheet({
  post,
  existingPersonIds,
  onClose,
  onConfirm,
}: {
  post: Post
  existingPersonIds: string[]
  onClose: () => void
  onConfirm: (personIds: string[], note: string) => void
}) {
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<string[]>([])
  const [note, setNote] = useState("")

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return allPeople
    return allPeople.filter(
      (p) => p.name.toLowerCase().includes(q) || p.username.toLowerCase().includes(q) || p.relationship.toLowerCase().includes(q),
    )
  }, [query])

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end">
      {/* backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 animate-in fade-in duration-200"
      />

      {/* sheet */}
      <div className="relative flex max-h-[88%] flex-col rounded-t-2xl border-t border-ig-border bg-ig-surface animate-in slide-in-from-bottom duration-300">
        <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-ig-border" />

        <header className="flex items-center gap-2 px-4 py-3">
          <Gift className="size-5 text-gift" />
          <h2 className="text-base font-semibold text-ig-text">Save as gift</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="ml-auto">
            <X className="size-5 text-ig-muted" />
          </button>
        </header>

        {/* post preview */}
        <div className="mx-4 flex items-center gap-3 rounded-xl bg-ig-elevated p-2.5">
          <div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
            <Image src={post.image || "/placeholder.svg"} alt={post.productName} fill sizes="48px" className="object-cover" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ig-text">{post.productName}</p>
            <p className="truncate text-xs text-ig-muted">from @{post.username}</p>
          </div>
        </div>

        <p className="px-4 pb-1 pt-3 text-xs text-ig-muted">Who is this gift for? Pick as many people as you like.</p>

        {/* search */}
        <div className="mx-4 mt-1 flex items-center gap-2 rounded-lg bg-ig-elevated px-3 py-2">
          <Search className="size-4 text-ig-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search people"
            className="w-full bg-transparent text-sm text-ig-text placeholder:text-ig-muted focus:outline-none"
          />
        </div>

        {/* people list */}
        <ul className="mt-1 flex-1 overflow-y-auto px-2 py-1">
          {results.length === 0 && (
            <li className="px-2 py-8 text-center text-sm text-ig-muted">No people found</li>
          )}
          {results.map((person) => {
            const isSelected = selected.includes(person.id)
            const already = existingPersonIds.includes(person.id)
            return (
              <li key={person.id}>
                <button
                  type="button"
                  onClick={() => toggle(person.id)}
                  className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left hover:bg-white/5"
                >
                  <UserAvatar name={person.name} color={person.avatarColor} size={44} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ig-text">{person.name}</p>
                    <p className="truncate text-xs text-ig-muted">
                      @{person.username} · {person.relationship}
                      {already && " · already saved"}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "flex size-6 items-center justify-center rounded-full border-2",
                      isSelected ? "border-gift bg-gift" : "border-ig-border",
                    )}
                  >
                    {isSelected && <Check className="size-4 text-gift-foreground" />}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        {/* note + confirm */}
        <div className="border-t border-ig-border p-4">
          {selected.length > 0 && (
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note (e.g. birthday, size M)"
              className="mb-3 w-full rounded-lg bg-ig-elevated px-3 py-2.5 text-sm text-ig-text placeholder:text-ig-muted focus:outline-none focus:ring-1 focus:ring-gift"
            />
          )}
          <button
            type="button"
            disabled={selected.length === 0}
            onClick={() => onConfirm(selected, note.trim())}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gift py-3 text-sm font-semibold text-gift-foreground transition-opacity disabled:opacity-40"
          >
            <Gift className="size-4" />
            {selected.length === 0
              ? "Select people to save this gift"
              : `Save gift for ${selected.length} ${selected.length === 1 ? "person" : "people"}`}
          </button>
        </div>
      </div>
    </div>
  )
}
