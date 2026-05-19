import Link from "next/link";

const payments = [
  "クレジットカード決済",
  "Apple Pay",
  "Google Pay",
  "コンビニ決済",
  "その他当社が定める決済方法"
];

export default function TokushohoPage() {
  return (
    <main>
      <header className="legal-header">
        <Link href="/">U⇔Uへ戻る</Link>
        <p className="section-label">LEGAL</p>
        <h1>特定商取引法に基づく表記</h1>
      </header>
      <article className="legal-body">
        <section>
          <h2>サービス内容</h2>
          <p>ユーザー間で提供・利用される各種サービスのマッチングプラットフォーム</p>
        </section>
        <section>
          <h2>販売事業者</h2>
          <p>株式会社HEYL</p>
        </section>
        <section>
          <h2>所在地・連絡先</h2>
          <p>所在地、電話番号、メールアドレスは、請求があった場合に遅滞なく開示いたします。</p>
        </section>
        <section>
          <h2>販売価格</h2>
          <p>各サービスページまたは申込画面に表示される金額をご確認ください。</p>
        </section>
        <section>
          <h2>支払方法</h2>
          <ul>
            {payments.map((payment) => (
              <li key={payment}>{payment}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>サービス提供時期</h2>
          <p>購入後または双方合意後に提供</p>
        </section>
        <section>
          <h2>キャンセル・返金</h2>
          <p>
            サービスの性質上、提供開始後のキャンセルまたは返金は原則としてお受けできません。
            ただし、法令または当社が別途定める条件に該当する場合を除きます。
          </p>
        </section>
      </article>
    </main>
  );
}
