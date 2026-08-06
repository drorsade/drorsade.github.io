/* ============================================================
   קלפי משפטים מחזקים — דרור שדה
   ============================================================ */

/* ------------------------------------------------------------
   1. קישור הרכישה
   ------------------------------------------------------------
   כשיהיה קישור התשלום ממורנינג (חשבונית ירוקה) — מדביקים אותו כאן,
   בין הגרשיים, וזהו. כל כפתורי הרכישה בעמוד יתעדכנו אוטומטית.

   כל עוד הוא ריק, הכפתורים מובילים להזמנה בוואטסאפ.
   ------------------------------------------------------------ */
const MORNING_URL = "https://mrng.to/MHtizi79HV";

if (MORNING_URL) {
  document.querySelectorAll("[data-buy]").forEach(el => { el.href = MORNING_URL; });
}

/* ------------------------------------------------------------
   2. הקלפים
   ------------------------------------------------------------
   להוספת קלף: שומרים את תמונת הקלף בתיקיית assets ומוסיפים כאן
   שורה עם שם הקובץ ועם נוסח הקלף.

   ה-alt הוא לא קישוט: הוא מה שקורא מסך מקריא, ומה שמופיע אם
   התמונה לא נטענת. לכן הוא מכיל את הנוסח המלא של הקלף.
   ------------------------------------------------------------ */
/* CARDS[0] must match the card hard-coded in index.html, since `current`
   starts at 0 — otherwise the first draw can repeat the visible card. */
const CARDS = [
  {
    img: "assets/card-derech.jpg",
    alt: "קלף ובו הכיתוב: אני בדרך הנכונה. גם אם לעיתים מרגיש שערפל כבד מסתיר את שדה הראיה, הוא יתפזר. אני בכיוון הנכון! כל צעד שאני עושה יחד עם אהבה עצמית מקדם אותי ומקצר את הדרך אל היעד."
  },
  {
    img: "assets/card-maarich.jpg",
    alt: "קלף ובו הכיתוב: אני מעריכה אותי. יש לי ערך, אני שווה, אני רלוונטית, אני נשמעת, אני חשובה."
  },
  {
    img: "assets/card-chaim-ohavim.jpg",
    alt: "קלף ובו הכיתוב: החיים אוהבים אותי. היקום תומך בתהליכים שאני עוברת. דברים קורים ומסתדרים באופן מושלם בשבילי."
  },
  {
    img: "assets/card-bria.jpg",
    alt: "קלף ובו הכיתוב: אני בריאה ונהיית יותר ויותר בריאה מדי יום. אני אוהבת את הגוף החזק והבריא שלי, אוהבת את איך שאני נראית, מקבלת אותי באהבה ללא תנאי. אני מחזקת את תהליך ההתפתחות וההבראה של הגוף שלי על ידי אהבה."
  }
];

const drawBtn = document.getElementById("draw");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const cardEl  = document.getElementById("card");
const baseImg = document.getElementById("card-img");

/* שכבת הקלף השנייה נוצרת כאן ולא ב-HTML, והמיקום שלה נקבע בסגנון ישיר.
   כך אי אפשר להגיע למצב שבו התמונה השנייה מוצגת בלי העיצוב שלה. */
const overlay = document.createElement("img");
overlay.alt = "";
overlay.setAttribute("aria-hidden", "true");
Object.assign(overlay.style, {
  position: "absolute",
  inset: "0",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  opacity: "0"
});

let front = baseImg;    // הקלף שמוצג כרגע
let back  = overlay;    // השכבה שאליה נטען הקלף הבא

let current = 0;
let busy    = false;

if (cardEl && baseImg) {
  cardEl.style.position = "relative";
  cardEl.appendChild(overlay);
  if (!reduceMotion) {
    baseImg.style.transition = "opacity .5s ease";
    overlay.style.transition = "opacity .5s ease";
  }
}

/* טוענים מראש את כל הקלפים, כדי שהמעבר ביניהם יהיה מיידי וללא הבהוב */
CARDS.forEach(c => { const pre = new Image(); pre.src = c.img; });

/* מוודא שהתמונה נטענה לפני שמתחילים את המעבר, כדי שלא ייראה רגע ריק.
   בכוונה משתמשים כאן ב-onload ולא ב-decode(): decode() לא בהכרח מסתיים
   בכרום כשהתמונה אינה מוצגת על המסך, וזה תקע את הכפתור לגמרי.
   כל הקלפים נטענים מראש בעליית העמוד, ולכן בפועל אין כאן שום המתנה. */
function preloadCard(src) {
  const pre = new Image();
  pre.src = src;
  if (pre.complete) return Promise.resolve();   // כבר במטמון

  return new Promise(resolve => {
    pre.onload = pre.onerror = resolve;
    setTimeout(resolve, 800);                   // רשת אחרונה, שלא ייתקע
  });
}

async function drawCard() {
  if (busy) return;               // התעלמות מלחיצות בזמן המעבר
  busy = true;

  try {
    // תמיד קלף אחר מזה שמוצג כרגע
    let next = current;
    while (next === current) next = Math.floor(Math.random() * CARDS.length);
    current = next;

    await preloadCard(CARDS[current].img);

    back.src = CARDS[current].img;
    back.alt = CARDS[current].alt;

    front.alt = "";
    front.setAttribute("aria-hidden", "true");
    back.removeAttribute("aria-hidden");

    back.style.opacity  = "1";
    front.style.opacity = "0";

    [front, back] = [back, front];  // מחליפים תפקידים
  } finally {
    busy = false;                   // תמיד משתחרר, גם אם משהו נכשל באמצע
  }
}

if (drawBtn) drawBtn.addEventListener("click", drawCard);

/* ------------------------------------------------------------
   3. הסרטון — נטען רק בלחיצה
   ------------------------------------------------------------ */
const videoBox = document.getElementById("video");

if (videoBox) {
  videoBox.querySelector(".video__play").addEventListener("click", () => {
    const video = document.createElement("video");
    video.src         = videoBox.dataset.src;
    video.poster      = videoBox.dataset.poster;
    video.controls    = true;
    video.playsInline = true;
    video.preload     = "auto";
    videoBox.replaceChildren(video);

    // הלחיצה עצמה מתירה ניגון עם קול. אם הדפדפן בכל זאת חוסם —
    // מנגנים בהשתקה, וכך הסרטון תמיד מתחיל.
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });
  });
}

/* ------------------------------------------------------------
   4. חשיפה בגלילה + סרגל הרכישה הדביק
   ------------------------------------------------------------ */
if (!reduceMotion && "IntersectionObserver" in window) {
  const revealables = document.querySelectorAll(".band .split, .band .uses, .band .gallery, .band--close .wrap");
  revealables.forEach(el => el.classList.add("reveal"));

  const revealer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      revealer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealables.forEach(el => revealer.observe(el));
}

const stickyBuy = document.getElementById("stickyBuy");
const hero      = document.querySelector(".hero");

if (stickyBuy && hero && "IntersectionObserver" in window) {
  stickyBuy.hidden = false;

  new IntersectionObserver(([entry]) => {
    stickyBuy.classList.toggle("is-visible", !entry.isIntersecting);
  }, { threshold: 0 }).observe(hero);
}
