// client/vite.config.ts
import { defineConfig, loadEnv } from "file:///home/director/repositories/socialaccess-network/create-construct/templates/construct/node_modules/vite/dist/node/index.js";
import Pages from "file:///home/director/repositories/socialaccess-network/create-construct/templates/construct/node_modules/vite-plugin-pages/dist/index.mjs";
import Components from "file:///home/director/repositories/socialaccess-network/create-construct/templates/construct/node_modules/unplugin-vue-components/dist/vite.mjs";
import vue from "file:///home/director/repositories/socialaccess-network/create-construct/templates/construct/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import Layouts from "file:///home/director/repositories/socialaccess-network/create-construct/templates/construct/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import { ConstructComponentResolver } from "file:///home/director/repositories/socialaccess-network/create-construct/templates/construct/node_modules/@sa-net/components/dist/index.js";
var __vite_injected_original_dirname = "/home/director/repositories/socialaccess-network/create-construct/templates/construct/client";
var vite_config_default = defineConfig((env) => {
  const envDir = "../";
  const envPrefix = "CLIENT_";
  const envars = loadEnv(env.mode, envDir, [envPrefix, "SERVER_"]);
  const clientURL = new URL(envars.CLIENT_URL ?? "http://localhost:3000");
  const clientPort = Number(clientURL.port);
  const serverURL = new URL(envars.SERVER_URL ?? "http://localhost:3001");
  return {
    envDir,
    envPrefix,
    resolve: {
      alias: {
        client: resolve(__vite_injected_original_dirname)
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "sassy";',
          includePaths: [resolve(__vite_injected_original_dirname, "styles")]
        }
      }
    },
    server: {
      port: clientPort,
      proxy: {
        "/api": {
          target: serverURL.origin,
          changeOrigin: true
        }
      }
    },
    plugins: [
      vue(),
      Layouts({
        layoutsDirs: "layouts",
        importMode: () => "sync"
      }),
      Pages({
        dirs: ["pages"],
        importMode: "sync"
      }),
      Components({
        dirs: ["components"],
        dts: "types/components.d.ts",
        deep: true,
        directoryAsNamespace: true,
        resolvers: [ConstructComponentResolver]
      })
    ]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY2xpZW50L3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvZGlyZWN0b3IvcmVwb3NpdG9yaWVzL3NvY2lhbGFjY2Vzcy1uZXR3b3JrL2NyZWF0ZS1jb25zdHJ1Y3QvdGVtcGxhdGVzL2NvbnN0cnVjdC9jbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2RpcmVjdG9yL3JlcG9zaXRvcmllcy9zb2NpYWxhY2Nlc3MtbmV0d29yay9jcmVhdGUtY29uc3RydWN0L3RlbXBsYXRlcy9jb25zdHJ1Y3QvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2RpcmVjdG9yL3JlcG9zaXRvcmllcy9zb2NpYWxhY2Nlc3MtbmV0d29yay9jcmVhdGUtY29uc3RydWN0L3RlbXBsYXRlcy9jb25zdHJ1Y3QvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcbmltcG9ydCBQYWdlcyBmcm9tICd2aXRlLXBsdWdpbi1wYWdlcydcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xuaW1wb3J0IExheW91dHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWxheW91dHMnXG5pbXBvcnQgeyBDb25zdHJ1Y3RDb21wb25lbnRSZXNvbHZlciB9IGZyb20gJ0BzYS1uZXQvY29tcG9uZW50cydcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyhlbnYgPT4ge1xuXHRjb25zdCBlbnZEaXIgPSAnLi4vJ1xuXHRjb25zdCBlbnZQcmVmaXggPSAnQ0xJRU5UXydcblxuXHRjb25zdCBlbnZhcnMgPSBsb2FkRW52KGVudi5tb2RlLCBlbnZEaXIsIFtlbnZQcmVmaXgsICdTRVJWRVJfJ10pXG5cblx0Y29uc3QgY2xpZW50VVJMID0gbmV3IFVSTChlbnZhcnMuQ0xJRU5UX1VSTCA/PyAnaHR0cDovL2xvY2FsaG9zdDozMDAwJylcblx0Y29uc3QgY2xpZW50UG9ydCA9IE51bWJlcihjbGllbnRVUkwucG9ydClcblxuXHRjb25zdCBzZXJ2ZXJVUkwgPSBuZXcgVVJMKGVudmFycy5TRVJWRVJfVVJMID8/ICdodHRwOi8vbG9jYWxob3N0OjMwMDEnKVxuXG5cdHJldHVybiB7XG5cdFx0ZW52RGlyLFxuXHRcdGVudlByZWZpeCxcblxuXHRcdHJlc29sdmU6IHtcblx0XHRcdGFsaWFzOiB7XG5cdFx0XHRcdGNsaWVudDogcmVzb2x2ZShfX2Rpcm5hbWUpLFxuXHRcdFx0fSxcblx0XHR9LFxuXG5cdFx0Y3NzOiB7XG5cdFx0XHRwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG5cdFx0XHRcdHNjc3M6IHtcblx0XHRcdFx0XHRhZGRpdGlvbmFsRGF0YTogJ0BpbXBvcnQgXCJzYXNzeVwiOycsXG5cdFx0XHRcdFx0aW5jbHVkZVBhdGhzOiBbcmVzb2x2ZShfX2Rpcm5hbWUsICdzdHlsZXMnKV0sXG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdH0sXG5cblx0XHRzZXJ2ZXI6IHtcblx0XHRcdHBvcnQ6IGNsaWVudFBvcnQsXG5cblx0XHRcdHByb3h5OiB7XG5cdFx0XHRcdCcvYXBpJzoge1xuXHRcdFx0XHRcdHRhcmdldDogc2VydmVyVVJMLm9yaWdpbixcblx0XHRcdFx0XHRjaGFuZ2VPcmlnaW46IHRydWUsXG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdH0sXG5cblx0XHRwbHVnaW5zOiBbXG5cdFx0XHR2dWUoKSxcblx0XHRcdExheW91dHMoe1xuXHRcdFx0XHRsYXlvdXRzRGlyczogJ2xheW91dHMnLFxuXHRcdFx0XHRpbXBvcnRNb2RlOiAoKSA9PiAnc3luYycsXG5cdFx0XHR9KSxcblx0XHRcdFBhZ2VzKHtcblx0XHRcdFx0ZGlyczogWydwYWdlcyddLFxuXHRcdFx0XHRpbXBvcnRNb2RlOiAnc3luYycsXG5cdFx0XHR9KSxcblx0XHRcdENvbXBvbmVudHMoe1xuXHRcdFx0XHRkaXJzOiBbJ2NvbXBvbmVudHMnXSxcblx0XHRcdFx0ZHRzOiAndHlwZXMvY29tcG9uZW50cy5kLnRzJyxcblx0XHRcdFx0ZGVlcDogdHJ1ZSxcblx0XHRcdFx0ZGlyZWN0b3J5QXNOYW1lc3BhY2U6IHRydWUsXG5cdFx0XHRcdHJlc29sdmVyczogW0NvbnN0cnVjdENvbXBvbmVudFJlc29sdmVyXSxcblx0XHRcdH0pLFxuXHRcdF0sXG5cdH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXNjLFNBQVMsY0FBYyxlQUFlO0FBQzVlLE9BQU8sV0FBVztBQUNsQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLFNBQVM7QUFDaEIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sYUFBYTtBQUNwQixTQUFTLGtDQUFrQztBQU4zQyxJQUFNLG1DQUFtQztBQVN6QyxJQUFPLHNCQUFRLGFBQWEsU0FBTztBQUNsQyxRQUFNLFNBQVM7QUFDZixRQUFNLFlBQVk7QUFFbEIsUUFBTSxTQUFTLFFBQVEsSUFBSSxNQUFNLFFBQVEsQ0FBQyxXQUFXLFNBQVMsQ0FBQztBQUUvRCxRQUFNLFlBQVksSUFBSSxJQUFJLE9BQU8sY0FBYyx1QkFBdUI7QUFDdEUsUUFBTSxhQUFhLE9BQU8sVUFBVSxJQUFJO0FBRXhDLFFBQU0sWUFBWSxJQUFJLElBQUksT0FBTyxjQUFjLHVCQUF1QjtBQUV0RSxTQUFPO0FBQUEsSUFDTjtBQUFBLElBQ0E7QUFBQSxJQUVBLFNBQVM7QUFBQSxNQUNSLE9BQU87QUFBQSxRQUNOLFFBQVEsUUFBUSxnQ0FBUztBQUFBLE1BQzFCO0FBQUEsSUFDRDtBQUFBLElBRUEsS0FBSztBQUFBLE1BQ0oscUJBQXFCO0FBQUEsUUFDcEIsTUFBTTtBQUFBLFVBQ0wsZ0JBQWdCO0FBQUEsVUFDaEIsY0FBYyxDQUFDLFFBQVEsa0NBQVcsUUFBUSxDQUFDO0FBQUEsUUFDNUM7QUFBQSxNQUNEO0FBQUEsSUFDRDtBQUFBLElBRUEsUUFBUTtBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BRU4sT0FBTztBQUFBLFFBQ04sUUFBUTtBQUFBLFVBQ1AsUUFBUSxVQUFVO0FBQUEsVUFDbEIsY0FBYztBQUFBLFFBQ2Y7QUFBQSxNQUNEO0FBQUEsSUFDRDtBQUFBLElBRUEsU0FBUztBQUFBLE1BQ1IsSUFBSTtBQUFBLE1BQ0osUUFBUTtBQUFBLFFBQ1AsYUFBYTtBQUFBLFFBQ2IsWUFBWSxNQUFNO0FBQUEsTUFDbkIsQ0FBQztBQUFBLE1BQ0QsTUFBTTtBQUFBLFFBQ0wsTUFBTSxDQUFDLE9BQU87QUFBQSxRQUNkLFlBQVk7QUFBQSxNQUNiLENBQUM7QUFBQSxNQUNELFdBQVc7QUFBQSxRQUNWLE1BQU0sQ0FBQyxZQUFZO0FBQUEsUUFDbkIsS0FBSztBQUFBLFFBQ0wsTUFBTTtBQUFBLFFBQ04sc0JBQXNCO0FBQUEsUUFDdEIsV0FBVyxDQUFDLDBCQUEwQjtBQUFBLE1BQ3ZDLENBQUM7QUFBQSxJQUNGO0FBQUEsRUFDRDtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
