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
const MORNING_URL = "";

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
const CARDS = [
  {
    img: "assets/card-tov-matok.jpg",
    alt: "קלף ובו הכיתוב: רק טוב מתוק מונח לפניי. ההווה והעתיד שלי מלאים ברכה ושפע. הכל מתכנס לטובתי העליונה ולהגשמת כל חלומותיי ורצונותיי בדרכים מושלמות."
  },
  {
    img: "assets/card-chaim-ohavim.jpg",
    alt: "קלף ובו הכיתוב: החיים אוהבים אותי. היקום תומך בתהליכים שאני עוברת. דברים קורים ומסתדרים באופן מושלם בשבילי."
  },
  {
    img: "assets/card-bria.jpg",
    alt: "קלף ובו הכיתוב: אני בריאה ונהיית יותר ויותר בריאה מדי יום. אני אוהבת את הגוף החזק והבריא שלי, אוהבת את איך שאני נראית, מקבלת אותי באהבה ללא תנאי. אני מחזקת את תהליך ההתפתחות וההבראה של הגוף שלי על ידי אהבה."
  },
  {
    img: "assets/card-derech.jpg",
    alt: "קלף ובו הכיתוב: אני בדרך הנכונה. גם אם לעיתים מרגיש שערפל כבד מסתיר את שדה הראיה, הוא יתפזר. אני בכיוון הנכון! כל צעד שאני עושה יחד עם אהבה עצמית מקדם אותי ומקצר את הדרך אל היעד."
  }
];

const card    = document.getElementById("card");
const cardImg = document.getElementById("card-img");
const drawBtn = document.getElementById("draw");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let current = 0;

/* טוענים מראש את שאר הקלפים, כדי שהמעבר ביניהם יהיה מיידי */
CARDS.forEach(c => { const pre = new Image(); pre.src = c.img; });

function drawCard() {
  // תמיד קלף אחר מזה שמוצג כרגע
  let next = current;
  while (next === current) next = Math.floor(Math.random() * CARDS.length);
  current = next;

  const render = () => {
    cardImg.src = CARDS[current].img;
    cardImg.alt = CARDS[current].alt;
    card.classList.remove("is-turning");
  };

  if (reduceMotion) { render(); return; }

  card.classList.add("is-turning");
  setTimeout(render, 200);
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
