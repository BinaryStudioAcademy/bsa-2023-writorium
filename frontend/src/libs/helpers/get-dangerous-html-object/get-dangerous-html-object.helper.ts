import { sanitizeHtml } from '~/libs/helpers/helpers.js';

type DangerousHTMLObject = {
  __html: string;
};

const getDangerousHtmlObject = (htmlContent: string): DangerousHTMLObject => {
  return { __html: sanitizeHtml(htmlContent) };
};

export { getDangerousHtmlObject };
