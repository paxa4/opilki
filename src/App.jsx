import './App.css'
import { useState, useEffect, useRef } from "react";


const PRODUCTS = [
  {
    icon: "🪵",
    name: "Пиломатериалы",
    desc: "Обрезная и необрезная доска хвойных пород: сосна, ель. Высокое качество сушки и обработки.",
    specs: ["ГОСТ 8486-86", "Сорт I–IV", "Камерная сушка"],
  },
  {
    icon: "📦",
    name: "Брус строительный",
    desc: "Цельный и клееный брус для малоэтажного строительства и ремонтных работ.",
    specs: ["150×150", "200×200", "Под заказ"],
  },
  {
    icon: "🏗️",
    name: "Вагонка и блок-хаус",
    desc: "Профилированная вагонка для внутренней и наружной отделки, блок-хаус имитация бревна.",
    specs: ["Класс A/B", "96–120 мм", "Сосна/ель"],
  },
  {
    icon: "🔲",
    name: "Фанера и OSB",
    desc: "Листовые материалы для строительства и мебельного производства. Опт и розница.",
    specs: ["ФК / ФСФ", "OSB-3", "9–21 мм"],
  },
  {
    icon: "🌿",
    name: "Погонажные изделия",
    desc: "Плинтус, наличник, штапик, половая рейка. Широкий ассортимент профилей.",
    specs: ["Хвойные", "Лиственные", "МДФ"],
  },
  {
    icon: "🔩",
    name: "Крепёж и аксессуары",
    desc: "Метизы, саморезы, шурупы, анкеры, монтажная пена и сопутствующие товары.",
    specs: ["ГОСТ", "DIN", "Нержавейка"],
  },
  {
    icon: "👍",
    name: "Лайк",
    desc: "Это просто пример, карточку можно сдлеать любую.",
    specs: ["ГОСТ", "DIN", "Нержавейка"],
  },
];

const PRICE_ROWS = [
  { name: "Доска обрезная 25×150×6000 мм (I сорт)", unit: "куб. м", price: "14 200 ₽", min: "от 1 м³" },
  { name: "Доска обрезная 25×150×6000 мм (II сорт)", unit: "куб. м", price: "11 500 ₽", min: "от 1 м³" },
  { name: "Брус 150×150×6000 мм", unit: "куб. м", price: "17 800 ₽", min: "от 2 м³" },
  { name: "Брус клееный 150×150×6000 мм", unit: "куб. м", price: "42 000 ₽", min: "от 0.5 м³" },
  { name: "Вагонка 96 мм (сорт А)", unit: "м²", price: "480 ₽", min: "от 10 м²" },
  { name: "Блок-хаус 120 мм", unit: "м²", price: "620 ₽", min: "от 10 м²" },
  { name: "Фанера ФК 2440×1220×12 мм", unit: "лист", price: "980 ₽", min: "от 10 шт" },
  { name: "OSB-3 2500×1250×12 мм", unit: "лист", price: "850 ₽", min: "от 20 шт" },
  { name: "Лайк 1×1×1 мм", unit: "шт", price: "100 ₽", min: "от 5 шт" },
];

const DELIVERY_STEPS = [
  { num: "01", title: "Заявка", desc: "Оставьте заявку онлайн или позвоните нам. Менеджер свяжется в течение 30 минут в рабочее время." },
  { num: "02", title: "Расчёт и счёт", desc: "Рассчитаем стоимость с учётом объёма, адреса доставки и сроков. Выставим счёт в день обращения." },
  { num: "03", title: "Сборка заказа", desc: "Формируем заказ на складе. Обеспечиваем правильную упаковку и маркировку каждой позиции." },
  { num: "04", title: "Отгрузка", desc: "Доставляем собственным автопарком или через транспортные компании по всей России и СНГ." },
];

const ZONES = [
  "Иркутск и ИО", "Урик", "Хомутово", "Грановщина",
  "Добавить", "Добавить", "Добавить", "Добавить",
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function Nav() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { id: "products", label: "Продукция" },
    { id: "price",    label: "Прайс" },
    { id: "delivery", label: "Доставка" },
    { id: "contacts", label: "Контакты" },
  ];

  useEffect(() => {
    const ids = ["home", "products", "price", "delivery", "contacts"];
    const obs = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      o.observe(el);
      return o;
    });
    return () => obs.forEach((o) => o && o.disconnect());
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav>
        <div className="nav-logo" onClick={() => scrollTo("home")} style={{ cursor: "pointer" }}>
          Инной
        </div>
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={"#" + l.id}
                className={active === l.id ? "active" : ""}
                onClick={(e) => { e.preventDefault(); scrollTo(l.id); }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => scrollTo("contacts")}>
          Оставить заявку
        </button>
        <button
          className={"burger" + (menuOpen ? " open" : "")}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Открыть меню"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={"mobile-menu" + (menuOpen ? " open" : "")}>
        {links.map((l) => (
          <a
            key={l.id}
            href={"#" + l.id}
            className={active === l.id ? "active" : ""}
            onClick={(e) => { e.preventDefault(); scrollTo(l.id); }}
          >
            {l.label}
          </a>
        ))}
        <button className="mob-cta" onClick={() => scrollTo("contacts")}>
          Получить КП →
        </button>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg" />
      <div className="hero-grain" />
      <div className="hero-lines" />
      <div className="hero-content">
        <div className="hero-eyebrow">Оптовые поставки пиломатериалов</div>
        <h1>
          Древесина <em>высшего</em><br />сорта — <em>с завода</em><br />напрямую
        </h1>
        <p className="hero-desc">
          Поставляем пиломатериалы, брус, погонаж и листовые материалы для строительства и производства.
          Более 10 лет на рынке, собственный склад 8 000 м².
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })}>
            Смотреть продукцию
          </button>
          <button className="btn-outline" onClick={() => document.getElementById("price").scrollIntoView({ behavior: "smooth" })}>
            Прайс-лист
          </button>
        </div>
      </div>
      <div className="hero-stats">
        <div className="stat">
          <div className="stat-num">8 000</div>
          <div className="stat-label">м² склада</div>
        </div>
        <div className="stat">
          <div className="stat-num">1 200+</div>
          <div className="stat-label">клиентов</div>
        </div>
        <div className="stat">
          <div className="stat-num">15</div>
          <div className="stat-label">лет на рынке</div>
        </div>
      </div>
      <div className="hero-scroll">Листайте вниз</div>
    </section>
  );
}

function Products() {
  return (
    <section id="products">
      <div className="products-header">
        <div className="section-tag">Ассортимент</div>
        <h2 className="section-title">Наша продукция</h2>
        <p className="section-sub">
          Работаем с сертифицированными поставщиками хвойных и лиственных пород.
          Широкий выбор, стабильное наличие, быстрая комплектация.
        </p>
      </div>
      <div className="products-grid">
        {PRODUCTS.map((p) => (
          <div className="product-card" key={p.name}>
            <div className="product-icon">{p.icon}</div>
            <div className="product-name">{p.name}</div>
            <div className="product-desc">{p.desc}</div>
            <div className="product-specs">
              {p.specs.map((s) => (
                <span className="spec-tag" key={s}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Price() {
  return (
    <section id="price">
      <div className="section-tag">Ценообразование</div>
      <h2 className="section-title">Прайс-лист</h2>
      <p className="section-sub">
        Актуальные цены для оптовых и розничных покупателей. Цены указаны без НДС и доставки.
        На объёмы от 10 м³ действует индивидуальная скидка.
      </p>
      <p className="price-note">* Цены могут изменяться. Актуальные данные уточняйте у менеджера.</p>
      <div className="price-table-wrap">
        <table className="price-table">
          <thead>
            <tr>
              <th>Наименование</th>
              <th>Ед. изм.</th>
              <th>Цена</th>
              <th>Минимум</th>
            </tr>
          </thead>
          <tbody>
            {PRICE_ROWS.map((r) => (
              <tr key={r.name}>
                <td>{r.name}</td>
                <td>{r.unit}</td>
                <td className="price-val">{r.price}</td>
                <td>{r.min}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="price-cta-row">
        <button className="btn-primary" onClick={() => document.getElementById("contacts").scrollIntoView({ behavior: "smooth" })}>
          Запросить полный прайс
        </button>
        <button className="btn-outline" style={{ color: "var(--cream)", borderColor: "rgba(245,239,230,.25)" }}>
          Скачать PDF
        </button>
      </div>
    </section>
  );
}

function Delivery() {
  return (
    <section id="delivery">
      <div className="section-tag">Логистика</div>
      <h2 className="section-title">Доставка и отгрузка</h2>
      <p className="section-sub">
        Доставляем по Иркутску и ИО. Собственный автопарк — 12 единиц техники.
        Отгрузка в день оплаты при наличии товара на складе.
      </p>
      <div className="delivery-grid">
        <div className="delivery-steps">
          {DELIVERY_STEPS.map((s) => (
            <div className="delivery-step" key={s.num}>
              <div className="step-num">{s.num}</div>
              <div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="delivery-info">
          <div className="info-card">
            <div className="info-card-title">🚛 Сроки доставки</div>
            <p>
              Иркутск и ИО — 1–2 рабочих дня<br />
              Пример — 2–4 рабочих дня<br />
              Пример — 4–10 рабочих дней<br />
              Экспресс-доставка возможна по согласованию
            </p>
          </div>
          <div className="info-card">
            <div className="info-card-title">📍 Зоны доставки</div>
            <div className="zones-grid">
              {ZONES.map((z) => (
                <span className="zone-item" key={z}>{z}</span>
              ))}
            </div>
          </div>
          <div className="info-card">
            <div className="info-card-title">💳 Условия оплаты</div>
            <p>
              Предоплата 100% для новых клиентов.<br />
              Для постоянных — отсрочка платежа до 21 дня.<br />
              Безналичный расчёт, работаем с НДС и без.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

//Для отправки заявки
const EMAILJS_SERVICE_ID  = "service_q7079se";   
const EMAILJS_TEMPLATE_ID = "template_chw9kvb";   
const EMAILJS_PUBLIC_KEY  = "A2qTYe4R4GrdZ6IAd";    

function Contacts() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", product: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.phone) {
      setError("Пожалуйста, заполните Имя и Телефон.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      // Динамически загружаем EmailJS чтобы не ломать сборку если не установлен
      const emailjs = await import("@emailjs/browser").then(m => m.default || m);
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name:    form.name,
          phone:   form.phone,
          email:   form.email    || "не указан",
          product: form.product  || "не выбрана",
          message: form.message  || "—",
        },
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
      setForm({ name: "", phone: "", email: "", product: "", message: "" });
      setTimeout(() => setSent(false), 6000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Ошибка отправки. Позвоните нам напрямую: +7 (800) 123-45-67");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacts">
      <div className="section-tag">Свяжитесь с нами</div>
      <h2 className="section-title">Контакты</h2>
      <p className="section-sub">Работаем с юридическими и физическими лицами. </p>
      <p className="section-sub">Менеджеры на связи с 10:00 до 18:00 по иркутскому времени (МСК+5).</p>
      <div className="contacts-layout">
        <div className="contact-block">
          {[
            { icon: "📞", label: "Телефон", value: "+7 (800) 123-45-67", sub: "Бесплатно по России" },
            { icon: "📧", label: "Электронная почта", value: "innoi@yandex.ru", sub: "Ответ в течение часа" },
            { icon: "📍", label: "Адрес склада", value: "Иркутская обл., с. Урик ул.,\n Братьев ченских, 77г", sub: "Самовывоз: Пн–Сб 10:00–18:00" },
            { icon: "💬", label: "Мессенджеры", value: "WhatsApp / Telegram", sub: "@innooi_manager" },
          ].map((c) => (
            <div className="contact-item" key={c.label}>
              <div className="contact-icon">{c.icon}</div>
              <div>
                <div className="contact-label">{c.label}</div>
                <div className="contact-value" style={{ whiteSpace: "pre-line" }}>{c.value}</div>
                <div className="contact-sub">{c.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="contact-form">
          <div className="form-title">Оставьте заявку</div>
          {sent && (
            <div className="form-success">
              ✅ Заявка отправлена! Перезвоним в течение 30 минут.
            </div>
          )}
          {error && (
            <div style={{
              background: "rgba(180,50,50,.12)", color: "#c0392b",
              border: "1px solid rgba(180,50,50,.25)",
              padding: "12px 16px", borderRadius: "2px",
              fontSize: ".85rem", fontWeight: 500
            }}>
              ⚠️ {error}
            </div>
          )}
          <div className="form-row">
            <div className="form-field">
              <label>Имя *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Иван Петров" />
            </div>
            <div className="form-field">
              <label>Телефон *</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="+7 (___) ___-__-__" />
            </div>
          </div>
          <div className="form-field">
            <label>Email</label>
            <input name="email" value={form.email} onChange={handleChange} placeholder="your@email.ru" />
          </div>
          <div className="form-field">
            <label>Интересующая продукция</label>
            <select name="product" value={form.product} onChange={handleChange}>
              <option value="">Выберите категорию</option>
              {PRODUCTS.map((p) => (
                <option key={p.name} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label>Сообщение / объём заказа</label>
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Опишите ваш запрос: объём, сечение, сроки…" />
          </div>
          <button
            className="btn-form"
            onClick={handleSubmit}
            disabled={loading}
            style={{ opacity: loading ? 0.6 : 1, cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Отправляем…" : "Отправить заявку →"}
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <div className="nav-logo">Инной</div>
          <p>Оптовые поставки пиломатериалов и строительной древесины. С 2016 года.</p>
        </div>
        <div className="footer-links">
          <h4>Навигация</h4>
          <ul>
            <li><a href="#products">Продукция</a></li>
            <li><a href="#price">Прайс-лист</a></li>
            <li><a href="#delivery">Доставка</a></li>
            <li><a href="#contacts">Контакты</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Продукция</h4>
          <ul>
            <li><a href="#products">Пиломатериалы</a></li>
            <li><a href="#products">Брус и балки</a></li>
            <li><a href="#products">Вагонка</a></li>
            <li><a href="#products">Фанера и OSB</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Контакты</h4>
          <ul>
            <li><a href="tel:+78001234567">+7 (800) 123-45-67</a></li>
            <li><a href="mailto:innoi@yandex.ru">innoi@yandex.ru</a></li>
            <li><a href="#contacts">Написать в мессенджер</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2016–2026 Инной. Все права защищены.</span>
        <span>Политика конфиденциальности · Реквизиты</span>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ width: "100%", minHeight: "100vh", overflowX: "hidden", margin: 0, padding: 0 }}>
      <Nav />
      <Hero />
      <Products />
      <Price />
      <Delivery />
      <Contacts />
      <Footer />
    </div>
  );
}