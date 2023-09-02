import sanitizeHtmlInternal from 'sanitize-html';

const sanitizeHtml = (html: string): string => sanitizeHtmlInternal(html);

export { sanitizeHtml };
