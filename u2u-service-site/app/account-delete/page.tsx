import type { Metadata } from "next";
import Link from "next/link";

const SUPPORT_EMAIL = "support@heyl.co.jp";
const DELETE_REQUEST_MAILTO =
  "mailto:support@heyl.co.jp?subject=U%E2%87%94U%E3%82%A2%E3%82%AB%E3%82%A6%E3%83%B3%E3%83%88%E5%89%8A%E9%99%A4%E4%BE%9D%E9%A0%BC&body=U%E2%87%94U%E3%81%AE%E3%82%A2%E3%82%AB%E3%82%A6%E3%83%B3%E3%83%88%E5%89%8A%E9%99%A4%E3%82%92%E4%BE%9D%E9%A0%BC%E3%81%97%E3%81%BE%E3%81%99%E3%80%82%0A%0A%E3%83%BB%E7%99%BB%E9%8C%B2%E3%83%A1%E3%83%BC%E3%83%AB%E3%82%A2%E3%83%89%E3%83%AC%E3%82%B9%EF%BC%9A%0A%E3%83%BB%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E5%90%8D%E3%81%BE%E3%81%9F%E3%81%AF%E8%A1%A8%E7%A4%BA%E5%90%8D%EF%BC%9A%0A%E3%83%BB%E3%81%94%E9%80%A3%E7%B5%A1%E5%85%88%EF%BC%9A%0A%0A%E2%80%BB%E3%83%91%E3%82%B9%E3%83%AF%E3%83%BC%E3%83%89%E3%82%84%E6%9C%AC%E4%BA%BA%E7%A2%BA%E8%AA%8D%E6%9B%B8%E9%A1%9E%E3%81%AE%E7%94%BB%E5%83%8F%E3%81%AF%E3%80%81%E3%81%93%E3%81%AE%E3%83%A1%E3%83%BC%E3%83%AB%E3%81%AB%E6%B7%BB%E4%BB%98%E3%81%97%E3%81%AA%E3%81%84%E3%81%A7%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84%E3%80%82";

export const metadata: Metadata = {
  title: "アカウント削除について | U⇔U",
  description:
    "U⇔Uのアプリ内アカウント削除方法、削除対象データ、保持される場合があるデータ、アプリを利用できない場合の代替手段についてご案内します。",
  openGraph: {
    title: "アカウント削除について | U⇔U",
    description:
      "U⇔Uのアプリ内アカウント削除方法と、アプリを利用できない場合の代替手段をご案内します。",
    url: "/account-delete"
  }
};

export default function AccountDeletePage() {
  return (
    <main>
      <header className="legal-header">
        <Link href="/">〈 U⇔U</Link>
        <p className="section-label">ACCOUNT DELETION</p>
        <h1>アカウント削除について</h1>
      </header>

      <article className="legal-body">
        <p className="legal-lead">
          このページでは、合同会社 HEYL が提供する「U⇔U（ユーーズ）」のアカウント削除および関連データ削除の方法をご案内します。
        </p>

        <section className="account-delete-request">
          <h2>アプリ内でアカウントを削除できます</h2>
          <p>
            U⇔Uでは、アプリ内からアカウント削除の手続きを行えます。
            アプリにログインしたうえで、「マイページ → 設定 → アカウント削除」から手続きを行ってください。
          </p>
          <p>
            アプリ内で削除手続きを完了すると、U⇔Uアカウントおよび関連データの削除処理が開始されます。
            削除前の注意事項と、保持される場合があるデータについては本ページ内の説明をご確認ください。
          </p>
        </section>

        <section>
          <h2>アプリを利用できない場合の代替手段</h2>
          <p>
            アプリを利用できない場合、ログインできない場合、または技術的な問題によりアプリ内で削除手続きを行えない場合は、メールで削除を依頼できます。
            ご本人確認に必要な情報を確認したうえで、アカウントおよび関連データの削除手続きを進めます。
          </p>
          <a className="button primary account-delete-button" href={DELETE_REQUEST_MAILTO}>
            メールで削除を依頼する
          </a>
          <p className="account-delete-note">
            メールが開けない場合は、件名を「U⇔Uアカウント削除依頼」として
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
            までご連絡ください。
          </p>
        </section>

        <section>
          <h2>メールで依頼する場合に記載いただきたい情報</h2>
          <p>アカウントの特定とご本人確認のため、以下の情報をお知らせください。</p>
          <ul>
            <li>U⇔Uに登録しているメールアドレス</li>
            <li>ユーザー名または表示名</li>
            <li>当社から連絡可能なメールアドレス</li>
            <li>その他、当社が本人確認のために必要と判断した情報</li>
          </ul>
          <p>
            パスワード、本人確認書類の画像、クレジットカード番号などの機微な情報は、初回のメールには記載・添付しないでください。
          </p>
        </section>

        <section>
          <h2>削除されるデータ</h2>
          <p>
            アカウント削除が完了すると、法令上またはサービス運営上保持が必要な情報を除き、U⇔Uアカウントに関連する以下のデータを削除または匿名化します。
          </p>
          <ul>
            <li>アカウント情報</li>
            <li>プロフィール情報</li>
            <li>投稿内容、応募情報、取引履歴などのサービス利用情報</li>
            <li>チャット内容、レビュー情報、問い合わせ履歴などの関連情報</li>
            <li>その他、U⇔Uアカウントに紐づく利用者データ</li>
          </ul>
        </section>

        <section>
          <h2>保持される場合があるデータ</h2>
          <p>
            以下の目的で必要な範囲に限り、一部の情報を一定期間保持する場合があります。
            保持期間の経過後、または保持の必要がなくなった場合は、適切な方法で削除または匿名化します。
          </p>
          <ul>
            <li>法令、会計、税務、決済その他の規制上の義務を履行するため</li>
            <li>不正利用、不正決済、セキュリティ上の問題を防止または調査するため</li>
            <li>取引、問い合わせ、紛争、トラブル対応に必要な記録を確認するため</li>
            <li>当社の権利または利用者の安全を保護するため</li>
          </ul>
          <p>
            個人情報の取扱いについては、
            <Link href="/legal/privacy">プライバシーポリシー</Link>
            もあわせてご確認ください。
          </p>
        </section>

        <section>
          <h2>削除完了までの目安</h2>
          <p>
            当社は、削除リクエストを受領後、ご本人確認および必要な確認を行います。
            確認完了後、法令等に基づき保持が必要な情報を除き、合理的な期間内に削除手続きを行います。
          </p>
          <p>
            通常は確認完了から30日以内の対応を目安としますが、取引、決済、本人確認、法令対応、トラブル対応などの状況により、追加の確認や一定期間の保持が必要となる場合があります。
          </p>
        </section>

        <section>
          <h2>削除前にご確認ください</h2>
          <ul>
            <li>アカウント削除後は、同じアカウントでU⇔Uにログインできなくなります。</li>
            <li>削除済みのデータは復元できない場合があります。</li>
            <li>進行中の取引、未完了の手続き、未払いまたは未受領の金額がある場合は、削除前に確認が必要となる場合があります。</li>
            <li>アプリを端末からアンインストールしただけでは、U⇔Uアカウントおよび関連データは削除されません。</li>
          </ul>
        </section>

        <section>
          <h2>お問い合わせ窓口</h2>
          <p>事業者名：合同会社 HEYL</p>
          <p>対象サービス：U⇔U（ユーーズ）</p>
          <p>
            メールアドレス：
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          </p>
          <p>制定日：2026年7月22日</p>
        </section>
      </article>
    </main>
  );
}
