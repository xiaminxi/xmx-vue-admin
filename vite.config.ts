import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createProxy } from './src/config/proxy';
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'


export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		AutoImport({
			imports: [
				'vue',
				'vue-router',
				'pinia',
				{
					axios: [['default', 'axios']]
				}
			],
			dts: 'src/auto-imports.d.ts',
			eslintrc: {
				enabled: true,
				filepath: './.eslintrc-auto-import.json',
				globalsPropValue: true
			}
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	server: {
		port: 81,
		host: true,
		open: true,
		proxy: { ...createProxy() }
	}
})