import Link from "next/link";

export default function TermsPage() {
  return (
    <main>
      <header className="legal-header">
        <Link href="/">U⇔Uへ戻る</Link>
        <p className="section-label">LEGAL</p>
        <h1>利用規約</h1>
      </header>
      <article className="legal-body">
        <section>
          <h2>適用</h2>
          <p>
            本規約は、株式会社HEYLが提供するU⇔Uの利用条件を定めるものです。
            ユーザーは、本サービスの利用にあたり本規約に同意するものとします。
          </p>
        </section>
        <section>
          <h2>アカウント</h2>
          <p>
            ユーザーは、登録情報を正確かつ最新の状態に保つものとします。
            アカウントの管理責任はユーザー本人が負うものとします。
          </p>
        </section>
        <section>
          <h2>禁止事項</h2>
          <p>
            法令または公序良俗に反する行為、第三者の権利を侵害する行為、
            本サービスの運営を妨げる行為を禁止します。
          </p>
        </section>
        <section>
          <h2>変更・停止</h2>
          <p>
            当社は、必要に応じて本サービスの内容を変更または停止することがあります。
            重要な変更がある場合は、合理的な方法で通知します。
          </p>
        </section>
      </article>
    </main>
  );
}
