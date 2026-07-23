"use client";

import { FormEvent, useEffect, useState } from "react";

const services = [
  { mark: "＋", title: "介護DX", text: "記録や情報共有の負担を、現場に合わせてやさしく整えます。" },
  { mark: "↺", title: "業務改善", text: "毎日の「少し面倒」を見つけ、無理なく続く仕組みに変えます。" },
  { mark: "□", title: "システム開発", text: "小さな困りごとから、ちょうどいい道具を一緒につくります。" },
  { mark: "✦", title: "AI活用支援", text: "仕事で本当に役立つAIの使い方を、わかりやすくご提案します。" },
];

const products = [
  ["ぽちっと相棒", "毎日の仕事と行動をそっと支える", "公開中"],
  ["ぽちっと名刺管理", "出会いのあとまで、ご縁を育てる", "開発中"],
  ["ぽちっと勤怠", "働く時間を、かんたん・正確に", "Coming Soon"],
  ["ぽちっと介護", "介護の現場を、もっとやさしく", "開発中"],
  ["ぽちっと建設", "現場の情報を、ひとつにつなぐ", "Coming Soon"],
];

export default function Home() {
  const [sent, setSent] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => setPageUrl(window.location.href), []);

  function saveContact() {
    const vcard = [
      "BEGIN:VCARD", "VERSION:3.0", "N:鎌田;エリ子;;;", "FN:鎌田 エリ子",
      "ORG:KAMADA WORKS", "TITLE:小さな事業者のDXパートナー",
      "TEL;TYPE=CELL:090-0000-0000", "EMAIL:hello@kamada-works.jp",
      "URL:https://kamada-works.jp", "ADR:;;栃木県;;;;", "END:VCARD",
    ].join("\r\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([vcard], { type: "text/vcard;charset=utf-8" }));
    link.download = "kamada-eriko.vcf";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  async function shareCard() {
    if (navigator.share) {
      await navigator.share({ title: "鎌田エリ子｜電子名刺", text: "KAMADA WORKS 鎌田エリ子の電子名刺です。", url: pageUrl });
    } else {
      await navigator.clipboard.writeText(pageUrl);
      alert("名刺のURLをコピーしました。");
    }
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const gasApiUrl = import.meta.env.VITE_GAS_API_URL;
    if (!gasApiUrl) {
      setSendError("送信先が設定されていません。メールからご連絡ください。");
      return;
    }
    setSending(true);
    setSendError("");
    try {
      const form = event.currentTarget;
      const payload = new URLSearchParams();
      new FormData(form).forEach((value, key) => payload.append(key, String(value)));
      payload.append("source", "pochitto-digital-business-card");
      await fetch(gasApiUrl, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }, body: payload });
      form.reset();
      setSent(true);
    } catch {
      setSendError("送信できませんでした。時間をおいて、もう一度お試しください。");
    } finally {
      setSending(false);
    }
  }

  return (
    <main>
      <header className="nav">
        <a className="brand" href="#top"><img src="/kamadaworks.jpg" alt="" /><span>KAMADA WORKS</span></a>
        <a className="nav-cta" href="#services">サービスを見る</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">DIGITAL BUSINESS CARD · KAMADA WORKS</p>
          <h1>現場の「困った」を、<br /><em>仕組み</em>でやさしく。</h1>
          <p className="lead">人と仕組みのあいだに立って、むずかしいことを、わかりやすく。小さな事業者さまのDXを、となりで支えます。</p>
          <p className="quiet">栃木を中心に、オンラインでもお話ししています。</p>
        </div>

        <div className="card-stage">
          <button className="profile-card" onClick={() => setCardOpen(true)} aria-haspopup="dialog">
            <span className="card-logo"><img src="/kamadaworks.jpg" alt="KAMADA WORKS" /></span>
            <span className="card-body">
              <small>KAMADA WORKS</small>
              <strong>鎌田 エリ子</strong>
              <span>DXサポーター / システム開発</span>
              <em>小さな事業者のDXパートナー</em>
            </span>
            <span className="card-footer"><span>TOCHIGI · ONLINE</span><b>名刺をひらく　↗</b></span>
          </button>
          <p className="tap-hint"><span>○</span> タップして、つながる</p>
        </div>
        <a className="scroll" href="#about">SCROLL <span>↓</span></a>
      </section>

      {cardOpen && (
        <div className="sheet-backdrop" role="presentation" onClick={() => setCardOpen(false)}>
          <section className="card-sheet" role="dialog" aria-modal="true" aria-label="電子名刺メニュー" onClick={(e) => e.stopPropagation()}>
            <button className="sheet-close" onClick={() => setCardOpen(false)} aria-label="閉じる">×</button>
            <div className="sheet-person">
              <img src="/kamadaworks.jpg" alt="KAMADA WORKS" />
              <div><small>小さな事業者のDXパートナー</small><h2>鎌田 エリ子</h2><p>栃木 · Online</p></div>
            </div>
            <div className="quick-actions">
              <button onClick={saveContact}><i>＋</i><span>保存</span></button>
              <button onClick={shareCard}><i>↗</i><span>共有</span></button>
              <a href="https://line.me/" target="_blank"><i>L</i><span>LINE</span></a>
              <a href="tel:09000000000"><i>☎</i><span>電話</span></a>
              <a href="mailto:hello@kamada-works.jp"><i>✉</i><span>メール</span></a>
            </div>
            <div className="qr-panel">
              {pageUrl && <img alt="この電子名刺のQRコード" src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&color=38433f&bgcolor=f8f6f1&data=${encodeURIComponent(pageUrl)}`} />}
              <div><strong>この名刺を手渡す</strong><p>カメラで読み取ると、いつでもこの名刺へ戻れます。</p></div>
            </div>
          </section>
        </div>
      )}

      <section className="section about" id="about">
        <div className="section-label"><span>01</span> 私について</div>
        <div className="about-grid">
          <h2>仕組みをつくる前に、<br />お話を聞かせてください。</h2>
          <div>
            <p>はじめまして、鎌田エリ子です。介護や小さな事業の現場で生まれる「もっとこうだったらいいのに」を、デジタルの力で形にしています。</p>
            <p>新しいシステムを入れることが目的ではありません。使う人がほっとできて、仕事が少し楽になることを大切にしています。</p>
            <div className="tags"><span>わかりやすく</span><span>一緒に考える</span><span>小さく始める</span></div>
          </div>
        </div>
      </section>

      <section className="section services" id="services">
        <div className="section-head">
          <div className="section-label"><span>02</span> できること</div>
          <h2>ちょうどいい仕組みを、<br />一緒につくります。</h2>
          <p>いまある仕事のやり方を大切にしながら、必要なところから少しずつ。</p>
        </div>
        <div className="service-grid">
          {services.map((service, index) => (
            <article className={`service-card service-${index + 1}`} key={service.title}>
              <div className="service-top"><span className="service-mark">{service.mark}</span><small>0{index + 1}</small></div>
              <h3>{service.title}</h3><p>{service.text}</p><a href="#contact">詳しく見る <span>→</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="section works">
        <div className="works-intro">
          <div className="section-label light"><span>03</span> KAMADA WORKS</div>
          <h2>テクノロジーを、<br />もっと人の近くへ。</h2>
          <p>現場で働く人の声から始まる、小さな開発室です。売るためではなく、毎日の仕事を心地よくするために。</p>
        </div>
        <div className="numbers">
          <div><strong>現場</strong><span>から考える</span></div>
          <div><strong>伴走</strong><span>しながら育てる</span></div>
          <div><strong>小さく</strong><span>始めて続ける</span></div>
        </div>
      </section>

      <section className="section products">
        <div className="section-label"><span>04</span> ぽちっとシリーズ</div>
        <div className="product-head"><h2>仕事を、ぽちっと<br />心地よく。</h2><p>現場にある困りごとを、シンプルな道具で解決するサービスシリーズです。</p></div>
        <div className="product-list">
          {products.map(([name, text, status], i) => <a href="#contact" key={name}><span>0{i + 1}</span><strong>{name}</strong><p>{text}</p><small className={`status ${status === "公開中" ? "live" : ""}`}>{status}</small><b>↗</b></a>)}
        </div>
      </section>

      <section className="section connect">
        <p className="eyebrow">LET&apos;S STAY CONNECTED</p>
        <h2>このご縁を、<br />次のお話へ。</h2>
        <p>気になる方法で、いつでもご連絡ください。</p>
        <div className="socials">
          <a className="social-line" href="https://line.me/" target="_blank"><i>L</i><span>LINE</span><b>↗</b></a>
          <a className="social-instagram" href="https://www.instagram.com/" target="_blank"><i>I</i><span>Instagram</span><b>↗</b></a>
          <a className="social-web" href="https://kamada-works.jp" target="_blank"><i>W</i><span>Website</span><b>↗</b></a>
          <a className="social-email" href="mailto:hello@kamada-works.jp"><i>E</i><span>Email</span><b>↗</b></a>
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="contact-copy">
          <div className="section-label light"><span>05</span> ご縁フォーム</div>
          <h2>今日困ったことを、<br />ひとつだけ。</h2>
          <p className="reassurance">相談内容がまとまっていなくても大丈夫です。<br />今日困ったことを一つだけ教えてください。</p>
          <blockquote>“まずは聞くことから。<br />一緒に、ちょうどいい答えを探します。”</blockquote>
        </div>
        <div className="form-card">
          {sent ? (
            <div className="thanks"><span>✓</span><h3>ありがとうございます。</h3><p>ご縁をいただけたことに感謝いたします。内容を確認し、後日ご連絡します。</p><button onClick={() => setSent(false)}>戻る</button></div>
          ) : (
            <form onSubmit={submitForm}>
              <label>お名前 <b>必須</b><input required name="name" placeholder="山田 太郎" /></label>
              <label>会社名・屋号<input name="company" placeholder="○○株式会社" /></label>
              <div className="form-row">
                <label>メールアドレス <b>必須</b><input required type="email" name="email" placeholder="hello@example.com" /></label>
                <label>電話番号<input type="tel" name="phone" placeholder="090-0000-0000" /></label>
              </div>
              <label>今日のお話・ご相談内容 <b>必須</b><textarea required name="message" placeholder="まだ整理できていなくても大丈夫です。" /></label>
              {sendError && <p className="form-error" role="alert">{sendError}</p>}
              <button className="submit" type="submit" disabled={sending}>{sending ? "送信中…" : "そっと送る"} <span>→</span></button>
              <small className="privacy">入力いただいた情報は、ご連絡のためだけに使用します。</small>
            </form>
          )}
        </div>
      </section>

      <footer><img src="/kamadaworks.jpg" alt="KAMADA WORKS" /><p>最後までご覧いただき、ありがとうございました。<br />このご縁が、未来につながるきっかけになれば嬉しいです。</p><small>© 2026 KAMADA WORKS</small></footer>
    </main>
  );
}
