type DefaultApiHandlerOptions = {
  body?: unknown;
  query?: unknown;
  params?: unknown;
  fileBuffer?: Buffer | null;
};

type ApiHandlerOptions<
  T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
  body: T['body'];
  query: T['query'];
  params: T['params'];
  fileBuffer: T['fileBuffer'];
};

export { type ApiHandlerOptions };
