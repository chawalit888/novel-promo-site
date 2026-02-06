import { getNovelBySlug, getAllNovels, getChaptersForNovel } from "@/lib/novels";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const novels = getAllNovels();
  return novels.map((novel) => ({ slug: novel.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const novel = getNovelBySlug(slug);
  if (!novel) return {};

  return {
    title: `${novel.title} (${novel.titleEn}) - ${novel.genre.join(", ")}`,
    description: novel.logline,
    keywords: novel.tags,
    openGraph: {
      title: `${novel.title} - ${novel.titleEn}`,
      description: novel.logline,
      type: "article",
      locale: "th_TH",
    },
  };
}

export default async function NovelDetailPage({ params }: Props) {
  const { slug } = await params;
  const novel = getNovelBySlug(slug);
  if (!novel) notFound();

  const chapters = getChaptersForNovel(slug);

  return (
    <article>
      {/* Hero */}
      <section className="bg-gradient-to-b from-amber-950/20 to-zinc-950 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-red-600/90 text-white text-xs font-bold px-2 py-1 rounded">
              {novel.rating}
            </span>
            {novel.genre.map((g) => (
              <span
                key={g}
                className="bg-zinc-800 text-amber-300 text-xs px-2.5 py-1 rounded"
              >
                {g}
              </span>
            ))}
            <span className="bg-zinc-800 text-zinc-400 text-xs px-2.5 py-1 rounded">
              {novel.status}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-amber-50 mb-2">
            {novel.title}
          </h1>
          <p className="text-xl text-amber-200/60 mb-1">{novel.titleEn}</p>
          <p className="text-amber-500 mb-6">{novel.subtitle}</p>

          <blockquote className="border-l-4 border-amber-600 pl-4 text-zinc-300 italic text-lg mb-8 leading-relaxed">
            {novel.logline}
          </blockquote>

          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <span>{novel.totalChapters} ตอน</span>
            <span>{novel.freeChapters} ตอนฟรี</span>
            <span>ความเข้มข้น {novel.intensity}/10</span>
            <span>
              เผยแพร่บน{" "}
              <strong className="text-amber-400">{novel.platform}</strong>
            </span>
          </div>
        </div>
      </section>

      {/* Synopsis */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-amber-100 mb-6">เรื่องย่อ</h2>
        <div className="text-zinc-300 leading-relaxed space-y-4">
          {novel.synopsis.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Characters */}
      <section className="bg-zinc-900/50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-amber-100 mb-8">
            ตัวละครหลัก
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {novel.characters.map((char) => (
              <div
                key={char.name}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-amber-600/20 text-amber-400 text-xs font-semibold px-2 py-1 rounded">
                    {char.role}
                  </span>
                  <span className="text-zinc-500 text-sm">{char.age} ปี</span>
                </div>
                <h3 className="text-amber-100 font-bold text-lg mb-2">
                  {char.name}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  {char.description}
                </p>
                <blockquote className="border-l-2 border-amber-700 pl-3 text-amber-200/70 italic text-sm">
                  &ldquo;{char.quote}&rdquo;
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hooks */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-amber-100 mb-6">
          จุดเด่นของเรื่อง
        </h2>
        <ul className="space-y-4">
          {novel.hooks.map((hook, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-amber-500 mt-1 shrink-0">&#10022;</span>
              <p className="text-zinc-300 leading-relaxed">{hook}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Free Chapters */}
      {chapters.length > 0 && (
        <section className="bg-zinc-900/50 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-amber-100 mb-6">
              อ่านตัวอย่างฟรี
            </h2>
            <div className="space-y-3">
              {chapters
                .filter((ch) => ch.isFree)
                .map((ch) => (
                  <Link
                    key={ch.slug}
                    href={`/chapters/${novel.slug}/${ch.slug}`}
                    className="block bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-amber-700/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-amber-100">{ch.title}</span>
                      <span className="text-amber-500 text-sm">
                        อ่านฟรี &rarr;
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-amber-100 mb-4">
          อ่านเรื่องเต็มได้ที่
        </h2>
        <p className="text-zinc-400 mb-6">
          ติดตามอ่าน {novel.title} ได้บน {novel.platform}
        </p>
        {novel.platformUrl ? (
          <a
            href={novel.platformUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-600 hover:bg-amber-500 text-zinc-950 font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            อ่านบน {novel.platform}
          </a>
        ) : (
          <p className="text-zinc-500 text-sm">
            (ลิงก์จะเพิ่มเมื่อเผยแพร่แล้ว)
          </p>
        )}
      </section>

      {/* Tags for SEO */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="flex flex-wrap gap-2">
          {novel.tags.map((tag) => (
            <span
              key={tag}
              className="bg-zinc-900 text-zinc-500 text-xs px-3 py-1 rounded-full border border-zinc-800"
            >
              #{tag}
            </span>
          ))}
        </div>
      </section>
    </article>
  );
}
