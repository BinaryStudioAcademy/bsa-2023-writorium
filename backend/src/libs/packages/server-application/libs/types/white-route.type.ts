import { type HttpMethod } from '~/libs/packages/http/http.js';

type WhiteRoute = {
  routerPath: string;
  methods: HttpMethod[];
};

export { type WhiteRoute };
