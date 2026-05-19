import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main>
      <header className="legal-header">
        <Link href="/">U⇔Uへ戻る</Link>
        <p className="section-label">LEGAL</p>
        <h1>プライバシーポリシー</h1>
      </header>
      <article className="legal-body">
        <section>
          <h2>取得する情報</h2>
          <p>
            当社は、本サービスの提供に必要な範囲で、氏名、連絡先、決済に関する情報、
            利用履歴、お問い合わせ内容等を取得する場合があります。
          </p>
        </section>
        <section>
          <h2>利用目的</h2>
          <p>
            取得した情報は、本サービスの提供、本人確認、決済、問い合わせ対応、
            品質改善、不正利用の防止、法令対応のために利用します。
          </p>
        </section>
        <section>
          <h2>第三者提供</h2>
          <p>
            当社は、法令に基づく場合または本人の同意がある場合を除き、
            個人情報を第三者に提供しません。
          </p>
        </section>
        <section>
          <h2>お問い合わせ</h2>
          <p>個人情報の取り扱いに関するお問い合わせは、当社窓口までご連絡ください。</p>
        </section>
      </article>
    </main>
  );
}
