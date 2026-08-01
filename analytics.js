/* ============================================================
   מדידת תנועה — Cloudflare Web Analytics
   ============================================================
   כדי להפעיל: מדביקים כאן את הטוקן מ-Cloudflare, בין הגרשיים.
   כל עוד הוא ריק, לא נטען שום דבר ולא נשלחת שום בקשה.

   השירות אינו משתמש בעוגיות ואינו אוסף מידע מזהה, ולכן אין צורך
   בבאנר הסכמה. שימו לב: עם ההפעלה יש לעדכן את סעיף 3 במדיניות
   הפרטיות (privacy.html), שמצהיר כרגע שאין באתר כלי מדידה.
   ============================================================ */

const CF_ANALYTICS_TOKEN = "cfc6086c73844d829ab3107796a1db96";

if (CF_ANALYTICS_TOKEN) {
  const beacon = document.createElement("script");
  beacon.type = "module";   // beacon.min.js is an ES module, as in Cloudflare's own snippet
  beacon.src = "https://static.cloudflareinsights.com/beacon.min.js";
  beacon.setAttribute("data-cf-beacon", JSON.stringify({ token: CF_ANALYTICS_TOKEN }));
  document.head.appendChild(beacon);
}
