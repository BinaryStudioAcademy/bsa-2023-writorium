import { type HttpMethod } from '~/libs/packages/http/http.js';

type WhiteRoute<T extends string | RegExp = RegExp> = {
  routerPath: T;
  methods: HttpMethod[];
};

export { type WhiteRoute };
