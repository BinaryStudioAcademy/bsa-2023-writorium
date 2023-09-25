import reactPlugin from '@vitejs/plugin-react';
import { type ConfigEnv, defineConfig, loadEnv } from 'vite';
import tsconfigPathsPlugin from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import pluginRewriteAll from 'vite-plugin-rewrite-all';

const config = ({ mode }: ConfigEnv): ReturnType<typeof defineConfig> => {
  const {
    VITE_APP_PROXY_SERVER_URL,
    VITE_APP_API_ORIGIN_URL,
    VITE_APP_DEVELOPMENT_PORT,
    VITE_SOCKET_SERVER,
    VITE_SOCKET_PATH,
  } = loadEnv(mode, process.cwd());

  return defineConfig({
    build: {
      outDir: 'build',
    },
    plugins: [tsconfigPathsPlugin(), reactPlugin(), svgr(), pluginRewriteAll()],
    server: {
      port: Number(VITE_APP_DEVELOPMENT_PORT),
      proxy: {
        [VITE_APP_API_ORIGIN_URL]: {
          target: VITE_APP_PROXY_SERVER_URL,
          changeOrigin: true,
        },
        [VITE_SOCKET_PATH]: {
          target: VITE_SOCKET_SERVER,
          ws: true,
        },
      },
    },
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, './src/assets'),
      },
    },
  });
};

export default config;
