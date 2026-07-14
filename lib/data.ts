export type Post = {
  id: string
  username: string
  avatarColor: string
  location: string
  image: string
  caption: string
  productName: string
  likes: number
  timeAgo: string
}

export type Person = {
  id: string
  name: string
  username: string
  avatarColor: string
  relationship: string
}

// A saved gift = one post saved for one specific person.
// Saving a post for multiple people creates multiple GiftSave entries.
export type GiftSave = {
  id: string
  postId: string
  personId: string
  note?: string
  savedAt: string
}

export const posts: Post[] = [
  {
    id: "p1",
    username: "clayandco",
    avatarColor: "oklch(0.7 0.15 40)",
    location: "Portland, OR",
    image: "/posts/mug-set.png",
    caption: "New handmade ceramic mug sets just dropped. Made for slow mornings ☕️",
    productName: "Handmade Ceramic Mug Set",
    likes: 2481,
    timeAgo: "3h",
  },
  {
    id: "p2",
    username: "field.notes",
    avatarColor: "oklch(0.65 0.13 250)",
    location: "Brooklyn, NY",
    image: "/posts/journal.png",
    caption: "Full-grain leather journals for the people who still write things down.",
    productName: "Leather Bound Journal",
    likes: 5120,
    timeAgo: "5h",
  },
  {
    id: "p3",
    username: "emberlight",
    avatarColor: "oklch(0.68 0.17 25)",
    location: "Austin, TX",
    image: "/posts/candle.png",
    caption: "Cedar + amber. Our best-selling candle is back in stock 🔥",
    productName: "Amber Glass Scented Candle",
    likes: 1893,
    timeAgo: "8h",
  },
  {
    id: "p4",
    username: "stridelab",
    avatarColor: "oklch(0.7 0.14 150)",
    location: "Los Angeles, CA",
    image: "/posts/sneakers.png",
    caption: "Sage everydays. Lightweight, cushioned, go-anywhere.",
    productName: "Sage Everyday Sneakers",
    likes: 8740,
    timeAgo: "12h",
  },
  {
    id: "p5",
    username: "toneaudio",
    avatarColor: "oklch(0.6 0.05 280)",
    location: "Seattle, WA",
    image: "/posts/headphones.png",
    caption: "Studio-grade sound, all-day comfort. Meet the new Tone Over-Ears.",
    productName: "Tone Over-Ear Headphones",
    likes: 6402,
    timeAgo: "1d",
  },
  {
    id: "p6",
    username: "leaf.theory",
    avatarColor: "oklch(0.68 0.15 145)",
    location: "Denver, CO",
    image: "/posts/plant.png",
    caption: "A little monstera to brighten any room 🌿",
    productName: "Monstera in Ceramic Pot",
    likes: 3277,
    timeAgo: "1d",
  },
]

export const people: Person[] = [
  { id: "u1", name: "Mom", username: "linda.reyes", avatarColor: "oklch(0.7 0.15 30)", relationship: "Family" },
  { id: "u2", name: "Jordan Blake", username: "jordanblake", avatarColor: "oklch(0.65 0.14 250)", relationship: "Best friend" },
  { id: "u3", name: "Sofia Nguyen", username: "sofia.ng", avatarColor: "oklch(0.68 0.16 340)", relationship: "Sister" },
  { id: "u4", name: "Dad", username: "marcus.reyes", avatarColor: "oklch(0.6 0.1 200)", relationship: "Family" },
  { id: "u5", name: "Priya Patel", username: "priya.p", avatarColor: "oklch(0.7 0.15 60)", relationship: "Coworker" },
  { id: "u6", name: "Liam Carter", username: "liamc", avatarColor: "oklch(0.62 0.12 160)", relationship: "Roommate" },
  { id: "u7", name: "Grandma Rose", username: "rose.f", avatarColor: "oklch(0.72 0.13 350)", relationship: "Family" },
  { id: "u8", name: "Alex Kim", username: "alexkim", avatarColor: "oklch(0.6 0.13 280)", relationship: "Partner" },
]

export function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}
