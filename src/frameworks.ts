import { blue, green, lightBlue, red, yellow } from 'kolorist'
import { Framework } from './types'

export const FRAMEWORKS: Framework[] = [
	{
		name: 'construct',
		display: 'Construct',
		color: red,
		variants: [
			{
				name: 'construct',
				display: 'Base',
				color: blue,
			},
		],
	},
	{
		name: 'vanilla',
		display: 'Vanilla',
		color: yellow,
		variants: [
			{
				name: 'vanilla-ts',
				display: 'TypeScript',
				color: blue,
			},
		],
	},
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
	{
		name: 'react',
		display: 'React',
		color: lightBlue,
		variants: [
			{
				name: 'react-ts',
				display: 'TypeScript',
				color: blue,
			},
		],
	},
]

export const TEMPLATES = FRAMEWORKS.map(
	f => (f.variants && f.variants.map(v => v.name)) || [f.name],
).reduce((a, b) => a.concat(b), [])
