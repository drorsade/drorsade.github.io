/* ============================================================
   מדידת תנועה — Cloudflare Web Analytics
   ============================================================
   כדי להפעיל: מדביקים כאן את הטוקן מ-Cloudflare, בין הגרשיים.
   כל עוד הוא ריק, לא נטען שום דבר ולא נשלחת שום בקשה.

   השירות אינו משתמש בעוגיות ואינו אוסף מידע מזהה, ולכן אין צורך
   בבאנר הסכמה. שימו לב: עם ההפעלה יש לעדכן את סעיף 3 במדיניות
   הפרטיות (privacy.html), שמצהיר כרגע שאין באתר כלי מדידה.
   ============================================================ */

const CF_ANALYTICS_TOKEN = "";

if (CF_ANALYTICS_TOKEN) {
  const beacon = document.createElement("script");
  beacon.defer = true;
  beacon.src = "https://static.cloudflareinsights.com/beacon.min.js";
  beacon.setAttribute("data-cf-beacon", JSON.stringify({ token: CF_ANALYTICS_TOKEN }));
  document.head.appendChild(beacon);
}
