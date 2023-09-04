type Info = {
  envelope: {
    from: string;
    to: string[];
  };
  messageId: string;
  response: string;
  raw: Buffer;
};

type SendEmailResponse = Info | Error;

export { type SendEmailResponse };
