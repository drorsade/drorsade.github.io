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
   להוספת קלף: מוסיפים עוד { title, text } לרשימה.
   בתוך text אפשר להשתמש ב-<br> כדי לשבור שורה.
   ------------------------------------------------------------ */
const PHRASES = [
  {
    title: "אני תומכת בי",
    text: "יש לי גב, אני איתי,<br>אני המקור ליציבות ולביטחון שלי,<br>אני לא לבד — יש לי אותי."
  },
  {
    title: "החיים אוהבים אותי",
    text: "היקום תומך בתהליכים שאני עוברת.<br>דברים קורים ומסתדרים<br>באופן מושלם בשבילי."
  },
  {
    title: "אני בדרך הנכונה",
    text: "גם אם לעיתים מרגיש שערפל כבד<br>מסתיר את שדה הראייה, הוא יתפזר.<br>אני בכיוון הנכון!<br>כל צעד שאני עושה יחד עם אהבה עצמית<br>מקדם אותי ומקצר את הדרך אל היעד."
  },
  {
    title: "אני סולחת לעבר באהבה ומשתחררת",
    text: "אני בוחרת לא להחזיק בתוכי<br>רגשות שלא מיטיבים איתי.<br>אני מחבקת את העבר באהבה וסולחת.<br>הבחירה לסלוח מביאה ריפוי לחיים שלי."
  },
  {
    title: "אני בריאה ונהיית יותר ויותר בריאה מדי יום",
    text: "אני אוהבת את הגוף החזק והבריא שלי,<br>מקבלת אותי באהבה ללא תנאי.<br>אני מחזקת את תהליך ההבראה<br>של הגוף שלי על ידי אהבה."
  },
  {
    title: "אני מלאת סיפוק ושמחה בעשייה שלי",
    text: "העשייה שלי ממלאת אותי במשמעות,<br>בהתרגשות ובאהבה.<br>אני נהנית מהדרך, מהיצירה<br>ומההשפעה שלי על העולם."
  }
];

const card      = document.getElementById("card");
const cardTitle = document.getElementById("card-title");
const cardText  = document.getElementById("card-text");
const drawBtn   = document.getElementById("draw");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let current = 0;

function drawCard() {
  // תמיד קלף אחר מזה שמוצג כרגע
  let next = current;
  while (next === current) next = Math.floor(Math.random() * PHRASES.length);
  current = next;

  const render = () => {
    cardTitle.textContent = PHRASES[current].title;
    cardText.innerHTML    = PHRASES[current].text;
    card.classList.remove("is-turning");
  };

  if (reduceMotion) { render(); return; }

  card.classList.add("is-turning");
  setTimeout(render, 220);
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
    video.autoplay    = true;
    videoBox.replaceChildren(video);
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
