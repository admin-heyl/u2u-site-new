import Image from "next/image";
import Link from "next/link";

const navItems = [
  ["ABOUT", "#about"],
  ["VISION", "#vision"],
  ["SERVICE", "#service"],
  ["FAQ", "#faq"],
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

const faqs = [
  {
    q: "U⇔Uはどんな人に向けたサービスですか？",
    a: "学生を中心に、誰かに伝えられることや、これから学びたいことを持つ人に向けて準備しています。"
  },
  {
    q: "正式公開はいつですか？",
    a: "現在は公開準備中です。機能や参加方法は、準備が整い次第このサイトでお知らせします。"
  },
  {
    q: "法人や学校からの相談はできますか？",
    a: "はい。連携や導入に関するご相談は、お問い合わせフォームからご連絡ください。"
  }
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
            <Link className="button primary" href="#contact">
              お問い合わせ
            </Link>
            <Link className="button quiet" href="#vision">
              想いを読む
            </Link>
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
            まだ名前のついていない得意。少しだけ先に進んだ経験。誰かに聞いてみたいこと。
            U⇔Uは、そうした小さな可能性が、やわらかく行き交うためのサービスです。
          </p>
        </div>
      </section>

      <section className="section vision-band" id="vision">
        <div>
          <p className="section-label">VISION</p>
          <h2>挑戦が、ひとりきりにならない未来へ。</h2>
        </div>
        <p>
          学生時代の一歩は、ときに不確かで、ときにまぶしすぎるものです。
          U⇔Uは、誰かの「やってみたい」と、別の誰かの「できるかもしれない」が出会うことで、
          新しい居場所や選択肢が生まれていく未来を信じています。
        </p>
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

      <section className="section quiet-story">
        <p className="section-label">MESSAGE</p>
        <blockquote>
          うまく言葉にできない得意も、まだ自信のない挑戦も、
          誰かと出会うことで少しずつ形になっていく。
        </blockquote>
      </section>

      <section className="section faq" id="faq">
        <p className="section-label">FAQ</p>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.q}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section contact" id="contact">
        <p className="section-label">CONTACT</p>
        <h2>U⇔Uについてのお問い合わせ</h2>
        <p>
          連携、取材、公開前のご相談などは、HEYLのお問い合わせ窓口よりご連絡ください。
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
          <p>HEYLが運営する、可能性とつながりのためのサービスです。</p>
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
