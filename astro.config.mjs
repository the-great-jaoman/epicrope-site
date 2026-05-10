// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://the-great-jaoman.github.io',
  base: '/epicrope-site',
  vite: {
    plugins: [tailwindcss()]
  }
});
