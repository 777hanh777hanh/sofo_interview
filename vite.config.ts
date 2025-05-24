import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'~': path.resolve(__dirname, 'src'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@hooks': path.resolve(__dirname, 'src/hooks'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@routes': path.resolve(__dirname, 'src/routes'),
			'@utils': path.resolve(__dirname, 'src/utils'),
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@styles': path.resolve(__dirname, 'src/styles')
		}
	},
	assetsInclude: ['**/*.ttf', '**/*.woff', '**/*.woff2'],
	build: {
		assetsInlineLimit: 0,
		rollupOptions: {
			output: {
				assetFileNames: (assetInfo) => {
					if (
						assetInfo.name &&
						/\.(ttf|woff|woff2)$/.test(assetInfo.name)
					) {
						return 'assets/fonts/[name].[hash][extname]';
					}
					return 'assets/[name].[hash][extname]';
				}
			}
		}
	},
	server: {
		port: 5000,
		open: true
	}
});
