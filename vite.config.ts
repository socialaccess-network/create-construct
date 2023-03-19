import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		outDir: 'dist',
		lib: {
			entry: {
				'create-construct': 'src/create-construct.ts',
			},
			formats: ['es'],
		},
	},
})
