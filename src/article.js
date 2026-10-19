import { marked } from 'marked'
import DOMPurify from 'dompurify'

export function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character])
}

export function renderArticle(markdown) {
  // The panel already displays the original title and source link.
  const body = markdown.replace(/^# [^\r\n]+\r?\n\s*Source: https?:\/\/[^\r\n]+\r?\n\s*/, '')
  return DOMPurify.sanitize(marked.parse(body, { gfm: true }), {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ['style', 'form', 'input', 'button'],
    FORBID_ATTR: ['style', 'id', 'name'],
  })
}
