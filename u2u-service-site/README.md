# U⇔U Service Site

HEYL配下のサービスサイトとして制作した、U⇔UのNext.jsサイトです。

## Development

```bash
npm install
npm run dev
```

## URL Structure

現状は `heyl.co.jp/u2u` での公開を想定しつつ、将来的に `u2u.heyl.co.jp` や `u2u.jp` へ独立しやすいようにしています。

`heyl.co.jp/u2u` 配下で公開する場合は、Vercelの環境変数に以下を設定してください。

```bash
NEXT_PUBLIC_BASE_PATH=/u2u
```

独立ドメインで公開する場合は、この環境変数を未設定にします。
