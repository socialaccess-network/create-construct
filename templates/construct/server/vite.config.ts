import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'

export default defineConfig({
	envDir: '../',
	envPrefix: ['SERVER_', 'CLIENT_'],

	define: {
		__ROOT__: '`' + resolve(__dirname, '..') + '`',
		__BIN__: '`' + resolve(__dirname, '../bin') + '`',
	},

	resolve: {
		alias: {
			server: resolve(__dirname),
		},
	},
})
