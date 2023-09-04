import sanitizeHtmlInternal from 'sanitize-html';

const sanitizeHtml = (html: string): string => {
  return sanitizeHtmlInternal(html, {
    allowedAttributes: {
      ...sanitizeHtmlInternal.defaults.allowedAttributes,
      '*': ['style'],
    },
  });
};

export { sanitizeHtml };
