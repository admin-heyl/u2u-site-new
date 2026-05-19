import Image from "next/image";
import Link from "next/link";

const navItems = [
  ["ABOUT", "#about"],
  ["SERVICE", "#service"],
  ["CONTACT", "#contact"]
];

const serviceSeeds = [
  "得意を活かす",
  "教える / 学ぶ",
  "挑戦を分け合う",
  "新しいつながり",
  "自分らしい一歩",
  "居場所をつくる"
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="U⇔U トップ">
          <span className="brand-mark">U⇔U</span>
          <span className="brand-sub">by HEYL</span>
        </Link>
        <nav className="desktop-nav" aria-label="メインナビゲーション">
          {navItems.map(([label, href]) => (
            <Link key={label} href={href}>
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy fade-in">
          <p className="eyebrow">A place where small courage meets possibility.</p>
          <h1>可能性が、少しずつ広がっていく。</h1>
          <p className="lead">
            U⇔Uは、学生の得意や挑戦が、誰かの一歩につながっていく場所を目指しています。
            教えること、学ぶこと、出会うこと。そのすべてが、自分らしい未来の輪郭になるように。
          </p>
          <div className="hero-actions">
          </div>
        </div>
        <div className="hero-visual fade-in delay">
          <Image
            src="/images/hero-u2u.png"
            alt="静かな光の中で学生たちが自然に集まり、学び合う様子"
            width={1400}
            height={900}
            priority
          />
        </div>
      </section>

      <section className="section intro" id="about">
        <p className="section-label">ABOUT</p>
        <div className="two-column">
          <h2>自分の中にあるものが、誰かのきっかけになる。</h2>
          <p>
            U⇔Uは、学生に向けた新しいサービスを準備しています。
            詳細は、公開まで今しばらくお待ちください。
          </p>
        </div>
      </section>

      <section className="section" id="service">
        <p className="section-label">SERVICE</p>
        <div className="section-head">
          <h2>できることから、未来はひらく。</h2>
          <p>
            詳しい仕組みは、準備が整い次第お知らせします。
            いまは、U⇔Uが大切にしたい体験の種を少しだけ。
          </p>
        </div>
        <div className="seed-grid">
          {serviceSeeds.map((seed, index) => (
            <article className="seed-card" key={seed}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{seed}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section sponsor">
  　　　　<p className="section-label">SPONSOR</p>

  　　　　<div className="two-column">
    　　　　<h2>広告掲載について</h2>

    　　　　<p>
      　　　　U⇔Uでは、学生向けサービス・ブランド様向けの広告掲載を募集しています。
    　　　　</p>
  　　　　</div>
　　　　</section>

      <section className="section contact" id="contact">
        <p className="section-label">CONTACT</p>
        <h2>U⇔Uについてのお問い合わせ</h2>
        <p>
          お問い合わせはこちらよりご連絡ください。
        </p>
        <a className="button primary" href="mailto:contact@heyl.co.jp">
          contact@heyl.co.jp
        </a>
      </section>

      <footer className="footer">
        <div>
          <Link className="footer-brand" href="/">
            U⇔U
          </Link>
          <p>HEYLが運営する学生向けサービスです。</p>
        </div>
        <nav aria-label="法務ページ">
          <Link href="/legal/tokushoho">特定商取引法に基づく表記</Link>
          <Link href="/legal/terms">利用規約</Link>
          <Link href="/legal/privacy">プライバシーポリシー</Link>
        </nav>
      </footer>
    </main>
  );
}
