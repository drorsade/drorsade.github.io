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

/* כל אלמנט עם data-mail הופך לקישור מייל אמיתי */
document.querySelectorAll("[data-mail]").forEach(el => {
  const address = CONTACT.mailUser + "@" + CONTACT.mailDomain;
  const link = document.createElement("a");
  link.href = "mailto:" + address;
  link.textContent = address;
  link.setAttribute("dir", "ltr");
  el.replaceWith(link);
});
