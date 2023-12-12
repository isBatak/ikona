import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import pandacss from '@pandacss/astro';

export default defineConfig({
  integrations: [react(), pandacss()],
});
