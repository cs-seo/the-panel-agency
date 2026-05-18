/**
 * Hidden static form declarations so Netlify's build-time scraper sees
 * the named forms. Must render in the HTML for forms feature to work.
 * This is a server component (no "use client"), so its inputs render
 * as pure static HTML — no hydration, no React warnings.
 */
export function NetlifyFormDeclarations() {
  return (
    <div hidden aria-hidden="true">
      <form name="newsletter" data-netlify="true" data-netlify-honeypot="bot-field">
        <input type="text" name="bot-field" />
        <input type="email" name="email" />
      </form>
      <form name="lead-magnet" data-netlify="true" data-netlify-honeypot="bot-field">
        <input type="text" name="bot-field" />
        <input type="text" name="name" />
        <input type="email" name="email" />
      </form>
      <form name="consult-request" data-netlify="true" data-netlify-honeypot="bot-field">
        <input type="text" name="bot-field" />
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="text" name="role" />
        <textarea name="brief" defaultValue="" />
      </form>
    </div>
  );
}
