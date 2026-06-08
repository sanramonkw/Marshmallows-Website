/* ============================================================
   MARSHMALLOWS NAIL SPA — App Logic
   Language switching · Nav · Services tabs · Reveals
   ============================================================ */

/* ── Translation data ───────────────────────────────────── */
const T = {
  en: {
    "nav.services":  "Services",
    "nav.about":     "About",
    "nav.locations": "Locations",
    "nav.book":      "Book Appointment",
    "nav.book.m":    "Book Now",

    "hero.eyebrow":  "Kuwait's Premier Nail Spa",
    "hero.title":    "Elevate Your\nSelf-Care Ritual",
    "hero.sub":      "Where artistry meets serenity — crafted for the discerning woman.",
    "hero.cta":      "Book Now",
    "hero.cta2":     "Explore Services",
    "hero.badge.num":"13+",
    "hero.badge.lbl":"Years of Artistry",
    "hero.scroll":   "Scroll",

    "about.eyebrow": "Est. 2013 · Kuwait",
    "about.title":   "A Decade of\nArtistry in Kuwait",
    "about.p1":      "Born from a vision to transform nail care into an art form, Marshmallows Nail Spa has spent over a decade curating Kuwait's most refined beauty experience.",
    "about.p2":      "From our first studio to our two premier branches — in Agaila and Salmiya — we have remained devoted to one singular belief: every woman deserves to feel beautifully pampered.",
    "about.p3":      "Our team of specialist artisans brings meticulous precision and genuine care to every service, ensuring an experience that transcends the ordinary.",
    "about.s1.num":  "13+",
    "about.s1.lbl":  "Years in Kuwait",
    "about.s2.num":  "2",
    "about.s2.lbl":  "Premium Branches",
    "about.s3.num":  "∞",
    "about.s3.lbl":  "Happy Clients",

    "svc.eyebrow":   "The Services Suite",
    "svc.title":     "Three Pillars of\nLuxury Care",
    "svc.tab1":      "Salon Experience",
    "svc.tab2":      "Home Service",
    "svc.tab3":      "Party Booth",

    "svc1.title":    "Salon Experience",
    "svc1.desc":     "Step into our beautifully curated studio and surrender to a world of refined nail artistry. From signature manicures and pedicures to avant-garde extensions and hand-painted designs — every treatment is a bespoke ritual.",
    "svc1.d1":       "Manicure & Pedicure",
    "svc1.d2":       "Nail Extensions & Gel",
    "svc1.d3":       "Nail Art & Design",
    "svc1.d4":       "Spa Treatments",

    "svc2.title":    "Home Service",
    "svc2.desc":     "The Marshmallows experience, delivered to your door. Our specialist technicians bring our full suite of services — with premium products and immaculate hygiene standards — directly to the comfort of your home.",
    "svc2.d1":       "Full Manicure at Home",
    "svc2.d2":       "Pedicure & Foot Spa",
    "svc2.d3":       "Nail Extensions",
    "svc2.d4":       "Bridal Packages",

    "svc3.title":    "Party Booth",
    "svc3.desc":     "Make your celebration unforgettable with our exclusive Party Booth. Perfect for birthdays, bridal parties, and private gatherings — we bring the spa to your event with our signature arched booth.",
    "svc3.d1":       "Bridal & Henna Events",
    "svc3.d2":       "Birthday Celebrations",
    "svc3.d3":       "Corporate Events",
    "svc3.d4":       "Custom Packages",

    "nav.gallery":     "Gallery",
    "svc.explore":    "Explore Services",
    "gallery.eyebrow":"The Artistry",
    "gallery.title": "Crafted with\nPrecision",
    "gallery.cta":   "View Full Gallery",

    "loc.eyebrow":   "Find Us",
    "loc.title":     "Two Locations\nAcross Kuwait",
    "loc.phone.lbl": "Call for Appointments",
    "loc.call":      "Call Us",
    "loc.maps":      "View on Maps",
    "loc1.name":     "Agaila Branch",
    "loc1.addr":     "Sama Mall, First Floor",
    "loc1.area":     "Agaila, Kuwait",
    "loc2.name":     "Salmiya Branch",
    "loc2.addr":     "Symphony Mall, Mezzanine, Shop 12",
    "loc2.area":     "Salmiya, Kuwait",

    "foot.tagline":  "Where luxury meets artistry — since 2013.",
    "foot.nav.head": "Navigation",
    "foot.con.head": "Contact",
    "foot.fol.head": "Follow",
    "foot.n1":       "Services",
    "foot.n2":       "About",
    "foot.n3":       "Locations",
    "foot.n4":       "Book Appointment",
    "foot.wa":       "WhatsApp Us",
    "foot.phone":    "+965 2220 9072",
    "foot.ig":       "Instagram",
    "foot.snap":     "Snapchat",
    "foot.copy":     "© 2025 Marshmallows Nail Spa. All rights reserved.",
    "foot.lic":      "Commercial License: 2015/3739"
  },

  ar: {
    "nav.services":  "الخدمات",
    "nav.about":     "من نحن",
    "nav.locations": "فروعنا",
    "nav.book":      "حجز موعد",
    "nav.book.m":    "احجزي الآن",

    "hero.eyebrow":  "صالون الأظافر الأول في الكويت",
    "hero.title":    "ارتقِ بطقوسك في\nالعناية بنفسك",
    "hero.sub":      "حيث يلتقي الفن بالسكينة — مُصمَّم للمرأة الراقية.",
    "hero.cta":      "احجزي الآن",
    "hero.cta2":     "استكشفي الخدمات",
    "hero.badge.num":"13+",
    "hero.badge.lbl":"سنوات من الإبداع",
    "hero.scroll":   "تمرير",

    "about.eyebrow": "منذ 2013 · الكويت",
    "about.title":   "عقد من الفن\nوالإبداع في الكويت",
    "about.p1":      "وُلدت من رؤية تحويل العناية بالأظافر إلى فن حقيقي، وقد أمضت مارشمالوز ناي سبا أكثر من عقد في تقديم تجربة تجميل هي الأكثر رقياً في الكويت.",
    "about.p2":      "من أول استوديو لنا إلى فرعينا الرئيسيين في العقيلة والسالمية، بقينا وفيين لقناعة واحدة راسخة: كل امرأة تستحق أن تشعر بالدلال والاهتمام.",
    "about.p3":      "فريقنا من الفنيين المتخصصين يُقدم دقة ورعاية حقيقية في كل خدمة، لضمان تجربة تسمو فوق المألوف.",
    "about.s1.num":  "+13",
    "about.s1.lbl":  "سنة في الكويت",
    "about.s2.num":  "2",
    "about.s2.lbl":  "فرعان رئيسيان",
    "about.s3.num":  "∞",
    "about.s3.lbl":  "عملاء سعداء",

    "svc.eyebrow":   "مجموعة الخدمات",
    "svc.title":     "ثلاثة محاور من\nالرعاية الفاخرة",
    "svc.tab1":      "خدمة الصالون",
    "svc.tab2":      "خدمة المنزل",
    "svc.tab3":      "بوث الحفلات",

    "svc1.title":    "خدمة الصالون",
    "svc1.desc":     "ادخلي إلى استوديونا المُصمَّم بعناية وانغمسي في عالم من فن الأظافر الراقي. من مانيكير وباديكير مميز إلى تمديد الأظافر وتصاميم مرسومة بالكامل — كل خدمة هي طقس مخصص.",
    "svc1.d1":       "مانيكير وباديكير",
    "svc1.d2":       "تمديد الأظافر والجل",
    "svc1.d3":       "رسم الأظافر والتصميم",
    "svc1.d4":       "علاجات السبا",

    "svc2.title":    "خدمة المنزل",
    "svc2.desc":     "تجربة مارشمالوز تصلك إلى بابك. فنياتنا المتخصصات يحملن معهن المنتجات الفاخرة ومعايير النظافة الراقية مباشرة إلى راحة منزلك.",
    "svc2.d1":       "مانيكير كامل بالمنزل",
    "svc2.d2":       "باديكير وسبا القدمين",
    "svc2.d3":       "تمديد الأظافر",
    "svc2.d4":       "باقات العروس",

    "svc3.title":    "بوث الحفلات",
    "svc3.desc":     "اجعلي احتفالك لا يُنسى مع خدمة البوث الحصرية. مثالية للأعياد وحفلات العروس والفعاليات الخاصة — نحضر السبا إليك مع بوثنا المميز.",
    "svc3.d1":       "حفلات العروس والحناء",
    "svc3.d2":       "حفلات أعياد الميلاد",
    "svc3.d3":       "الفعاليات المؤسسية",
    "svc3.d4":       "باقات مخصصة",

    "nav.gallery":     "معرض الأعمال",
    "svc.explore":    "استكشفي خدماتنا",
    "gallery.eyebrow":"الإبداع الفني",
    "gallery.title": "مُصنَّع بدقة\nمتناهية",
    "gallery.cta":   "عرض المعرض كاملاً",

    "loc.eyebrow":   "أين تجدوننا",
    "loc.title":     "فرعان في\nالكويت",
    "loc.phone.lbl": "اتصلي لحجز المواعيد",
    "loc.call":      "اتصلي بنا",
    "loc.maps":      "عرض على الخريطة",
    "loc1.name":     "فرع العقيلة",
    "loc1.addr":     "سما مول، الدور الأول",
    "loc1.area":     "العقيلة، الكويت",
    "loc2.name":     "فرع السالمية",
    "loc2.addr":     "سيمفوني مول، الميزانين، محل 12",
    "loc2.area":     "السالمية، الكويت",

    "foot.tagline":  "حيث يلتقي الفخامة بالفن — منذ 2013.",
    "foot.nav.head": "التصفح",
    "foot.con.head": "تواصل معنا",
    "foot.fol.head": "تابعينا",
    "foot.n1":       "الخدمات",
    "foot.n2":       "من نحن",
    "foot.n3":       "فروعنا",
    "foot.n4":       "حجز موعد",
    "foot.wa":       "تواصل عبر واتساب",
    "foot.phone":    "+965 2220 9072",
    "foot.ig":       "إنستغرام",
    "foot.snap":     "سناب شات",
    "foot.copy":     "© 2025 مارشمالوز ناي سبا. جميع الحقوق محفوظة.",
    "foot.lic":      "السجل التجاري: 2015/3739"
  }
};

/* ── Language engine ─────────────────────────────────────── */
let lang = localStorage.getItem("mm-lang") || "en";

function applyLang(l) {
  lang = l;
  const html = document.documentElement;
  html.setAttribute("lang",      l);
  html.setAttribute("dir",       l === "ar" ? "rtl" : "ltr");
  html.setAttribute("data-lang", l);

  /* Swap every [data-key] element */
  document.querySelectorAll("[data-key]").forEach(el => {
    const v = T[l][el.dataset.key];
    if (v !== undefined) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = v;
      } else {
        el.textContent = v;
      }
    }
  });

  /* Update active lang button */
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.l === l);
  });

  localStorage.setItem("mm-lang", l);
}

/* ── Navigation ─────────────────────────────────────────── */
function initNav() {
  const nav    = document.getElementById("nav");
  const burger = document.getElementById("nav-burger");
  const mobile = document.getElementById("nav-mobile");

  /* Scroll-driven background */
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Burger toggle */
  burger.addEventListener("click", () => {
    const open = mobile.classList.toggle("open");
    burger.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  });

  /* Close mobile nav on link click */
  mobile.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      mobile.classList.remove("open");
      burger.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  /* Smooth-scroll anchor links */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/* ── Services Tabs ───────────────────────────────────────── */
function initTabs() {
  const tabs   = document.querySelectorAll(".svc-tab");
  const panels = document.querySelectorAll(".svc-panel");

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      panels[i].classList.add("active");
    });
  });
}

/* ── Scroll reveals ─────────────────────────────────────── */
function initReveals() {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

/* ── Hero Frame — Nail-Design Slideshow with varied transitions ── */
function initHeroSlides() {
  const stage = document.getElementById('heroSlides');
  if (!stage) return;
  const slides = Array.from(stage.querySelectorAll('.hero-slide'));
  if (slides.length < 2) return;

  const EFFECTS  = ['enter-zoom', 'enter-wipe', 'enter-tilt', 'enter-drift'];
  const ENTER_MS = 1350;
  const INTERVAL = 4600;

  let i = 0, fx = 0, animating = false;
  slides[0].classList.add('resting');

  const advance = () => {
    if (animating) return;
    animating = true;

    const prev = slides[i];
    i = (i + 1) % slides.length;
    const next = slides[i];
    const effect = EFFECTS[fx % EFFECTS.length];
    fx++;

    // outgoing
    prev.classList.remove('resting', 'is-active');
    prev.classList.add('leaving');

    // incoming — force reflow so the animation restarts cleanly
    next.classList.remove('leaving', 'resting',
      'enter-zoom', 'enter-wipe', 'enter-tilt', 'enter-drift');
    void next.offsetWidth;
    next.classList.add('is-active', effect);

    setTimeout(() => {
      prev.classList.remove('leaving');
      next.classList.remove(effect);
      next.classList.add('resting');
      animating = false;
    }, ENTER_MS);
  };

  let timer = setInterval(advance, INTERVAL);

  /* Pause cycling when the tab is hidden, resume on return */
  document.addEventListener('visibilitychange', () => {
    clearInterval(timer);
    if (!document.hidden) timer = setInterval(advance, INTERVAL);
  });
}

/* ── Hero Frame — Living motion: organic idle float + pointer parallax ── */
function initHeroLife() {
  const right  = document.querySelector('.hero-right');
  const stage  = document.querySelector('.hero-ornate-stage');
  if (!right || !stage) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* Pointer target (-1..1), eased toward each frame for smoothness */
  let tx = 0, ty = 0;   // target tilt
  let px = 0, py = 0;   // current (eased) tilt
  let pointerInside = false;

  const onMove = e => {
    const r = right.getBoundingClientRect();
    tx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
    ty = ((e.clientY - r.top)  / r.height - 0.5) * 2;
    pointerInside = true;
  };
  right.addEventListener('pointermove', onMove, { passive: true });
  right.addEventListener('pointerleave', () => { tx = 0; ty = 0; pointerInside = false; });

  /* Hand off from the focus-pull entrance, then ease the life in */
  const HANDOFF = 2150;          // ms — entrance (260 delay + 1800) + breath
  const RAMP    = 1400;          // ms — amplitude ease-in so motion blooms gently
  let begin = 0;

  const frame = now => {
    if (!begin) begin = now;
    const t   = (now - begin) / 1000;                 // seconds
    const env = Math.min(1, (now - begin) / RAMP);     // 0→1 amplitude envelope
    const ease = env * env * (3 - 2 * env);            // smoothstep

    /* Layered sines at incommensurate periods → never a mechanical loop */
    const floatY = (Math.sin(t * 0.62)        * 5
                  + Math.sin(t * 0.27 + 1.3)  * 3) * ease;
    const floatX = (Math.sin(t * 0.35 + 2.1)  * 3) * ease;
    const floatR = (Math.sin(t * 0.42 + 0.7)  * 0.5
                  + Math.sin(t * 0.19)        * 0.28) * ease;

    /* Ease pointer tilt toward target */
    px += (tx - px) * 0.055;
    py += (ty - py) * 0.055;
    const rotY = px * 5.5;        // tilt left/right toward cursor
    const rotX = -py * 4.5;       // tilt up/down toward cursor
    const transX = floatX + px * 9;
    const transY = floatY + py * 7;

    stage.style.transform =
      `translate3d(${transX.toFixed(2)}px, ${transY.toFixed(2)}px, 0) ` +
      `rotateX(${(rotX).toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) ` +
      `rotate(${floatR.toFixed(2)}deg)`;

    requestAnimationFrame(frame);
  };

  setTimeout(() => requestAnimationFrame(frame), HANDOFF);
}

/* ── Boot ────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initTabs();
  initReveals();
  initHeroSlides();
  initHeroLife();
  applyLang(lang);

  /* Language toggle buttons */
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => applyLang(btn.dataset.l));
  });
});
