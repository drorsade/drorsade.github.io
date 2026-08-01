/* ============================================================
   פרטי הקשר של העסק — במקום אחד
   ============================================================
   לעדכון כתובת המייל או הטלפון — משנים כאן בלבד,
   וכל העמודים באתר מתעדכנים.

   כתובת המייל מורכבת מחלקים ולא נכתבת במלואה ב-HTML,
   כדי שרובוטים שאוספים כתובות מייל לצורך ספאם לא ימצאו אותה.
   בני אדם (וקוראי מסך) רואים קישור רגיל לגמרי.
   ============================================================ */

const CONTACT = {
  mailUser:   "drorsade",
  mailDomain: "gmail.com",
  phone:      "972556605765",     // בפורמט בינלאומי, לקישורי וואטסאפ
  phoneLocal: "055-6605765",      // כפי שמוצג באתר
  instagram:  "dror_sade"
};

/* אייקון מעטפה — בסגנון של אייקוני הוואטסאפ והאינסטגרם בפוטר */
const MAIL_ICON = `
  <svg class="icon" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"
       fill="none" stroke="currentColor" stroke-width="1.9"
       stroke-linecap="round" stroke-linejoin="round">
    <rect x="2.5" y="4.6" width="19" height="14.8" rx="2.6"/>
    <path d="M3.4 7.2 12 13.4l8.6-6.2"/>
  </svg>`;

/* כל אלמנט עם data-mail הופך לקישור מייל אמיתי.
   data-mail="icon" מוסיף גם את אייקון המעטפה (בפוטר בלבד) */
document.querySelectorAll("[data-mail]").forEach(el => {
  const address = CONTACT.mailUser + "@" + CONTACT.mailDomain;
  const link = document.createElement("a");
  link.href = "mailto:" + address;

  if (el.dataset.mail === "icon") {
    // הקישור נשאר RTL כדי שהאייקון יישב מימין לטקסט, כמו שאר האייקונים
    // בפוטר. רק הכתובת עצמה מסומנת כ-LTR.
    link.innerHTML = MAIL_ICON;

    const label = document.createElement("span");
    label.className = "visually-hidden";
    label.textContent = "אימייל";

    const text = document.createElement("span");
    text.setAttribute("dir", "ltr");
    text.textContent = address;

    link.append(label, text);
  } else {
    link.setAttribute("dir", "ltr");
    link.textContent = address;
  }

  el.replaceWith(link);
});
