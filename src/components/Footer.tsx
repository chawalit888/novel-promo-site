import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-amber-900/20 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-amber-400 font-bold text-lg mb-3">
              NovelPromo
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              เว็บไซต์โปรโมทนิยายออนไลน์ อ่านตัวอย่างฟรี
              ติดตามนิยายที่คุณชื่นชอบ
            </p>
          </div>
          <div>
            <h4 className="text-amber-200 font-semibold mb-3">ลิงก์ด่วน</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-zinc-400 hover:text-amber-400 transition-colors"
                >
                  หน้าแรก
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-zinc-400 hover:text-amber-400 transition-colors"
                >
                  บทความ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-amber-200 font-semibold mb-3">แพลตฟอร์ม</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-zinc-400">Tunwalai</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-zinc-500 text-sm">
          &copy; {new Date().getFullYear()} NovelPromo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
