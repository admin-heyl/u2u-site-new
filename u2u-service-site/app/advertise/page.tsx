export const metadata = {
  title: "広告掲載について | U⇔U",
  description: "U⇔Uへの広告掲載について",
};

export default function AdvertisePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "32px 20px",
        background: "#faf8fc",
        color: "#2d2630",
      }}
    >
      <section style={{ width: "min(100%, 640px)", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(24px, 6vw, 36px)", marginBottom: 20 }}>
          広告掲載について
        </h1>
        <p style={{ lineHeight: 1.9, margin: 0 }}>
          U⇔Uへの広告掲載案内は現在準備中です
        </p>
        <p style={{ lineHeight: 1.9, marginTop: 8 }}>
          詳細は support@u2u.heyl.co.jp までお問い合わせください
        </p>
      </section>
    </main>
  );
}
