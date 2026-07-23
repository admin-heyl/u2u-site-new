"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  ["ホーム", "#top"],
  ["サービスについて", "#about"],
  ["サービス紹介", "#service"],
  ["NEWS", "/news"],
  ["お問い合わせ", "#contact"]
];

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="brand" href="#top" aria-label="U⇔U ホーム">
        <Image src="/images/u2u-logotype.svg" alt="U⇔U" width={168} height={51} priority />
        <span className="brand-sub">by HEYL</span>
      </Link>

      <nav className="desktop-nav" aria-label="メインナビゲーション">
        {navItems.map(([label, href]) => (
          <Link key={label} href={href}>
            {label}
          </Link>
        ))}
      </nav>

      <button
        className={`menu-button${isMenuOpen ? " is-open" : ""}`}
        type="button"
        aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        className={`mobile-nav${isMenuOpen ? " is-open" : ""}`}
        id="mobile-navigation"
        aria-label="モバイルナビゲーション"
      >
        {navItems.map(([label, href]) => (
          <Link key={label} href={href} onClick={() => setIsMenuOpen(false)}>
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
