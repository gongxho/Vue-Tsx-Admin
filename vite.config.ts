import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path';
import { defineConfig, loadEnv, ConfigEnv } from 'vite';

const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir);
};

const alias: Record<string, string> = {
  '/@': pathResolve('./src/'),
  // '@': fileURLToPath(new URL('./src', import.meta.url))
};
/**
 * @command 在 Vite 的 API 中，在开发环境下 command 的值为 serve（在 CLI 中， vite dev 和 vite serve 是 vite 的别名），而在生产环境下为 build（vite build）
 * @mode 根据当前工作目录中的 `mode` 加载 .env 文件
 * @ssrBuild 用于服务端渲染时
*/
export default defineConfig(({ mode }) => {
  // 使用 Vite 导出的 loadEnv 函数来加载指定的 .env 文件，设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite 共享配置
    root: process.cwd(),    // ----------------- 项目根目录（index.html 文件所在的位置）
    base: '',      // ----------------- 开发或生产环境服务的公共基础路径
    mode: "development",    // ----------------- 默认： 'development' 用于开发，'production' 用于构建
    define: { __APP_ENV__: env.APP_ENV }, // --- 定义全局常量替换方式
    plugins: [vue(), vueJsx()],       // ----------------- 需要用到的插件数组
    resolve: { alias },     // ----------------- 定义文件路径别名，当使用文件系统路径的别名时，请始终使用绝对路径，否则无法解析
    css: {                  // ----------------- css 配置
      postcss: {          // ----------------- 内联的 PostCSS 配置
        plugins: [{
          postcssPlugin: 'internal:charset-removal',
          AtRule: { charset: (atRule) => { if (atRule.name === 'charset') { atRule.remove() } } },
        }],
      },
    },

    // 开发时服务器配置选项  执行 npm run dev 时
    server: {
      host: '0.0.0.0',        // 指定服务器应该监听哪个 IP 地址
      port: 8000,               // 端口
      open: false,    // 在开发服务器启动时自动在浏览器中打开应用程序
      // 为开发服务器配置自定义代理规则，如前端接口调用： fetch('/api/dev')
      // 此时会通过上面的代理规则，将源地址代理到目标地址，从而访问目标地址的接口 https://googxh.xyz/api/dev
      proxy: {
        '/api/dev': {
          target: 'https://googxh.xyz',
          ws: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

    // 构建打包时配置选项 执行 npm run build 时
    build: {
      outDir: 'dist',// 指定输出路径（相对于 项目根目录)
      sourcemap: false, // 构建后是否生成 source map 文件
      chunkSizeWarningLimit: 1500, // 规定触发警告的 chunk(文件块) 大小
      rollupOptions: {  // 自定义底层的 Rollup 打包配置
        output: {
          entryFileNames: `assets/[name].${new Date().getTime()}.js`,
          chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
          assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
          compact: true,
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            echarts: ['echarts'],
          },
        },
      },
      //生产环境自动删除console
      terserOptions: {
        compress: {
          drop_console: true,     // 自动去除console
          drop_debugger: true,    // 清除 debugger 语句
        },
        ie8: true,
        output: { comments: true }, // 删除注释
      },
    },

  }
})

