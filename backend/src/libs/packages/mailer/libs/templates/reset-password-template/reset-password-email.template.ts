import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { type default as Mail } from 'nodemailer/lib/mailer/index.js';
import pug from 'pug';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getResetPasswordEmailTemplate = ({
  sender,
  recipient,
  resetLink,
}: {
  sender: string;
  recipient: string;
  resetLink: string;
}): Mail.Options => {
  const compiledFunction = pug.compileFile(
    __dirname + '/reset-password-template.pug',
  );

  return {
    from: `Writorium Team ${sender}`,
    to: recipient,

    subject: 'Reset your password',
    html: compiledFunction({ resetLink }),
    text: `We believe you requested a Writorium password reset. If so, simply hit the provided link and it will open a secure web page where you can enter a new password. Link : ${resetLink}`,
  };
};

export { getResetPasswordEmailTemplate };
