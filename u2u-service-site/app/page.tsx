import Image from "next/image";
import Link from "next/link";
import SiteHeader from "./components/SiteHeader";

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-copy fade-in">
          <h1 className="hero-title">学生同士で「できる」がつながるスキルマーケット</h1>
          <p className="lead">
            U⇔Uは、学生の得意・知識・経験を、ほかの学生の「やってみたい」につなぐスキルマーケットです。教えることも、学ぶことも、学生同士だからもっと身近に。
          </p>
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
        <h2>学生同士だから、相談しやすい。学びやすい</h2>
        <p>
          得意なことを活かしたい学生と、新しいことを学びたい学生が出会い、スキルや経験を届け合える場です。学ぶ側にも教える側にも、新しい選択肢が生まれる体験を提供します。
        </p>
      </section>

      <section className="section service" id="service">
        <p className="section-label">SERVICE</p>
        <span className="coming-soon">Coming Soon</span>
        <h2>スキルを届ける。見つける。つながる</h2>
        <p>
          U⇔Uで体験できるサービスや機能について、詳しい情報をこちらでご紹介します。
        </p>
      </section>

      <section className="section sponsor">
        <p className="section-label">SPONSOR</p>
        <h2>広告掲載について</h2>
        <p>U⇔Uでは、学生向けサービス・ブランド様向けの広告掲載を募集しています。</p>
      </section>

      <section className="section contact" id="contact">
        <p className="section-label">CONTACT</p>
        <h2>U⇔Uについてのお問い合わせ</h2>
        <p>サービスや広告掲載に関するお問い合わせはこちらよりご連絡ください。</p>
        <a className="button primary" href="mailto:contact@u2u.heyl.co.jp">
          contact@u2u.heyl.co.jp
        </a>
      </section>

      <footer className="footer">
        <div>
          <Link className="footer-brand" href="#top" aria-label="U⇔U ホーム">
            <Image src="/images/u2u-logotype.svg" alt="U⇔U" width={168} height={51} />
          </Link>
        </div>
        <nav aria-label="法務ページ">
          <Link href="/news">NEWS</Link>
          <Link href="/legal/tokushoho">特定商取引法に基づく表記</Link>
          <Link href="/legal/terms">利用規約</Link>
          <Link href="/legal/privacy">プライバシーポリシー</Link>
          <Link href="/account-delete">アカウント削除</Link>
        </nav>
      </footer>
    </main>
  );
}
