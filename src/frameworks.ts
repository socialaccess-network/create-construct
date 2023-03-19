import { blue, green } from 'kolorist'
import { Framework } from './types'

export const FRAMEWORKS: Framework[] = [
	{
		name: 'vue',
		display: 'Vue',
		color: green,
		variants: [
			{
				name: 'vue-ts',
				display: 'TypeScript',
				color: blue,
			},
		],
	},
]

export const TEMPLATES = FRAMEWORKS.map(
	f => (f.variants && f.variants.map(v => v.name)) || [f.name],
).reduce((a, b) => a.concat(b), [])
