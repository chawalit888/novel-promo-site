import Link from "next/link";
import type { Novel } from "@/lib/novels";

export default function NovelCard({ novel }: { novel: Novel }) {
  return (
    <Link href={`/novels/${novel.slug}`} className="group block">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-amber-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/10">
        {/* Cover placeholder */}
        <div className="aspect-[3/4] bg-gradient-to-br from-zinc-800 via-amber-950/30 to-zinc-900 relative flex items-center justify-center">
          <div className="text-center p-6">
            <p className="text-amber-400/80 text-4xl mb-3">📖</p>
            <h3 className="text-amber-100 font-bold text-xl mb-1 group-hover:text-amber-400 transition-colors">
              {novel.title}
            </h3>
            <p className="text-zinc-400 text-sm">{novel.titleEn}</p>
          </div>
          <div className="absolute top-3 right-3 bg-red-600/90 text-white text-xs font-bold px-2 py-1 rounded">
            {novel.rating}
          </div>
          <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
            {novel.genre.slice(0, 2).map((g) => (
              <span
                key={g}
                className="bg-zinc-950/70 text-amber-300 text-xs px-2 py-0.5 rounded"
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-zinc-400 text-sm line-clamp-2 mb-3">
            {novel.logline}
          </p>
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>{novel.totalChapters} ตอน</span>
            <span className="text-amber-600">{novel.platform}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
