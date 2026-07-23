"use client";

import { FormEvent, useState } from "react";

const services = [
  { mark: "介", title: "介護DX", text: "介護の現場に寄り添い、記録や情報共有の負担をやさしく整えます。" },
  { mark: "整", title: "業務改善", text: "毎日の「ちょっと面倒」を見つけ、無理なく続く仕組みに変えます。" },
  { mark: "開", title: "システム開発", text: "小さな困りごとから、現場にちょうどいいツールを一緒につくります。" },
  { mark: "AI", title: "AI活用支援", text: "むずかしい言葉を使わず、仕事で本当に役立つAIの使い方をご提案します。" },
];

const products = [
  ["ぽちっと相棒", "毎日の仕事と行動をそっと支える"],
  ["ぽちっと名刺管理", "出会いのあとまで、ご縁を育てる"],
  ["ぽちっと勤怠", "働く時間を、かんたん・正確に"],
  ["ぽちっと介護", "介護の現場を、もっとやさしく"],
  ["ぽちっと建設", "現場の情報を、ひとつにつなぐ"],
];

export default function Home() {
  const [sent, setSent] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  function saveContact() {
    const vcard = [
      "BEGIN:VCARD", "VERSION:3.0", "N:鎌田;エリ子;;;", "FN:鎌田 エリ子",
      "ORG:かまだWorks", "TITLE:DXサポーター / システム開発",
      "EMAIL:hello@kamada-works.jp", "URL:https://kamada-works.jp", "END:VCARD",
    ].join("\r\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([vcard], { type: "text/vcard;charset=utf-8" }));
    link.download = "kamada-eriko.vcf";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const gasApiUrl = import.meta.env.VITE_GAS_API_URL;
    if (!gasApiUrl) {
      setSendError("送信先が設定されていません。管理者へお問い合わせください。");
      return;
    }

    setSending(true);
    setSendError("");
    try {
      const form = event.currentTarget;
      const payload = new URLSearchParams();
      new FormData(form).forEach((value, key) => payload.append(key, String(value)));
      payload.append("source", "pochitto-digital-business-card");
      await fetch(gasApiUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: payload,
      });
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
        <a className="brand" href="#top"><span>ぽ</span> ぽちっと電子名刺</a>
        <a className="nav-cta" href="#contact">相談してみる</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">KAMADA WORKS · DIGITAL BUSINESS CARD</p>
          <h1>現場の「困った」を、<br /><em>仕組み</em>で解決します。</h1>
          <p className="lead">人と仕組みの間に立って、むずかしいことを、わかりやすく。小さな事業者さまのDXを、となりで支えます。</p>
          <div className="actions">
            <a className="button primary" href="#contact">まずは話してみる <b>↗</b></a>
            <button className="button secondary" onClick={saveContact}>連絡先を保存 <b>＋</b></button>
          </div>
          <p className="quiet">相談だけでも大丈夫です。お気軽にどうぞ。</p>
        </div>
        <div className="portrait" aria-label="鎌田エリ子のプロフィール">
          <div className="portrait-shape"><span>EK</span></div>
          <div className="name-card">
            <div><small>DX SUPPORTER</small><strong>鎌田 エリ子</strong><p>エリ子さん、と呼んでください。</p></div>
            <i>◌</i>
          </div>
        </div>
        <a className="scroll" href="#about">SCROLL <span>↓</span></a>
      </section>

      <section className="section about" id="about">
        <div className="section-label"><span>01</span> 私について</div>
        <div className="about-grid">
          <h2>仕組みをつくる前に、<br />お話を聞かせてください。</h2>
          <div>
            <p>はじめまして、鎌田エリ子です。介護や小さな事業の現場で生まれる「もっとこうだったらいいのに」を、デジタルの力で形にしています。</p>
            <p>新しいシステムを入れることが目的ではありません。使う人がほっとできて、仕事が少し楽になること。その先に生まれる時間や笑顔を大切にしています。</p>
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
            <article className="service-card" key={service.title}>
              <div className="service-top"><span className="service-mark">{service.mark}</span><small>0{index + 1}</small></div>
              <h3>{service.title}</h3><p>{service.text}</p><a href="#contact">相談する <span>→</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="section works">
        <div className="works-intro">
          <div className="section-label light"><span>03</span> かまだWorks</div>
          <h2>テクノロジーを、<br />もっと人の近くへ。</h2>
          <p>かまだWorksは、現場で働く人の声から始まる小さな開発室です。売るためではなく、毎日の仕事を心地よくするために。</p>
        </div>
        <div className="numbers">
          <div><strong>現場</strong><span>から考える</span></div>
          <div><strong>伴走</strong><span>しながら育てる</span></div>
          <div><strong>小さく</strong><span>始めて続ける</span></div>
        </div>
      </section>

      <section className="section products">
        <div className="section-label"><span>04</span> ぽちっとシリーズ</div>
        <div className="product-head"><h2>仕事を、ぽちっと<br />心地よく。</h2><p>それぞれの現場にある困りごとを、シンプルな道具で解決するサービスシリーズです。</p></div>
        <div className="product-list">
          {products.map(([name, text], i) => <a href="#contact" key={name}><span>0{i + 1}</span><strong>{name}</strong><p>{text}</p><b>↗</b></a>)}
        </div>
      </section>

      <section className="section connect">
        <p className="eyebrow">LET&apos;S STAY CONNECTED</p>
        <h2>このご縁を、<br />次のお話へ。</h2>
        <p>気になる方法で、いつでもご連絡ください。</p>
        <div className="socials">
          <a href="https://line.me/" target="_blank">LINE <span>↗</span></a>
          <a href="https://www.instagram.com/" target="_blank">Instagram <span>↗</span></a>
          <a href="https://kamada-works.jp" target="_blank">Website <span>↗</span></a>
          <a href="mailto:hello@kamada-works.jp">Email <span>↗</span></a>
        </div>
        <button className="qr-button" onClick={() => setShowQr(!showQr)}>▦ この名刺のQRコードを表示</button>
        {showQr && <div className="qr"><img alt="この電子名刺のQRコード" src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(typeof window === "undefined" ? "" : window.location.href)}`} /><small>スマートフォンのカメラで読み取れます</small></div>}
      </section>

      <section className="section contact" id="contact">
        <div className="contact-copy">
          <div className="section-label light"><span>05</span> ご縁フォーム</div>
          <h2>お話の続きを、<br />聞かせてください。</h2>
          <p>まだ相談内容がまとまっていなくても大丈夫です。今日お話ししたことや、気になっていることをひとことだけでも。</p>
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
              <label>今日のお話・ご相談内容 <b>必須</b><textarea required name="message" placeholder="気になっていることを、ご自由にどうぞ。" /></label>
              {sendError && <p className="form-error" role="alert">{sendError}</p>}
              <button className="submit" type="submit" disabled={sending}>{sending ? "送信中…" : "内容を送る"} <span>→</span></button>
              <small className="privacy">入力いただいた情報は、ご連絡のためだけに使用します。</small>
            </form>
          )}
        </div>
      </section>

      <footer><div className="brand"><span>ぽ</span> ぽちっと電子名刺</div><p>最後までご覧いただき、ありがとうございました。<br />このご縁が、未来につながるきっかけになれば嬉しいです。</p><small>© 2026 KAMADA WORKS</small></footer>
    </main>
  );
}
