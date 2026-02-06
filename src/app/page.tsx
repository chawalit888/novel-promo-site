import NovelCard from "@/components/NovelCard";
import { getAllNovels } from "@/lib/novels";
import { getAllBlogPosts } from "@/lib/blog";
import Link from "next/link";

export default function HomePage() {
  const novels = getAllNovels();
  const blogPosts = getAllBlogPosts().slice(0, 3);

  const featured = novels[0];

  return (
    <>
      {/* Hero Section */}
      {featured && (
        <section className="relative bg-gradient-to-b from-amber-950/20 via-zinc-950 to-zinc-950 py-24 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-amber-500 text-sm font-semibold tracking-widest uppercase mb-4">
              แนะนำนิยาย
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-amber-50 mb-4">
              {featured.title}
            </h1>
            <p className="text-xl text-amber-200/70 mb-2">
              {featured.titleEn}
            </p>
            <p className="text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              {featured.logline}
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href={`/novels/${featured.slug}`}
                className="bg-amber-600 hover:bg-amber-500 text-zinc-950 font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                อ่านรายละเอียด
              </Link>
              <Link
                href={`/chapters/${featured.slug}/chapter-01`}
                className="border border-amber-700 text-amber-400 hover:bg-amber-900/30 px-8 py-3 rounded-lg transition-colors"
              >
                อ่านตัวอย่างฟรี
              </Link>
            </div>
            <div className="flex items-center justify-center gap-3 mt-6">
              {featured.genre.map((g) => (
                <span
                  key={g}
                  className="bg-zinc-800 text-amber-300 text-xs px-3 py-1 rounded-full"
                >
                  {g}
                </span>
              ))}
              <span className="bg-red-900/50 text-red-300 text-xs px-3 py-1 rounded-full">
                {featured.rating}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* All Novels */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-amber-100 mb-8">
          นิยายทั้งหมด
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {novels.map((novel) => (
            <NovelCard key={novel.slug} novel={novel} />
          ))}
        </div>
      </section>

      {/* Featured Quote */}
      {featured && featured.characters.length > 0 && (
        <section className="bg-gradient-to-r from-zinc-950 via-amber-950/10 to-zinc-950 py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="text-2xl md:text-3xl text-amber-100 font-light italic leading-relaxed mb-4">
              &ldquo;{featured.characters[0].quote}&rdquo;
            </blockquote>
            <p className="text-amber-500 font-semibold">
              — {featured.characters[0].name}
            </p>
          </div>
        </section>
      )}

      {/* Blog Posts */}
      {blogPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-amber-100">
              บทความล่าสุด
            </h2>
            <Link
              href="/blog"
              className="text-amber-500 hover:text-amber-400 text-sm"
            >
              ดูทั้งหมด →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-amber-700/50 transition-all"
              >
                <h3 className="text-amber-100 font-semibold mb-2 group-hover:text-amber-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-zinc-400 text-sm line-clamp-3">
                  {post.excerpt}
                </p>
                <p className="text-zinc-600 text-xs mt-3">{post.publishedAt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
