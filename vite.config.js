import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        marketplace: resolve(__dirname, 'marketplace.html'),
        projectDetail: resolve(__dirname, 'project-detail.html'),
        projectDetail2: resolve(__dirname, 'project-detail-2.html'),
        partner: resolve(__dirname, 'partner.html'),
        portfolio: resolve(__dirname, 'portfolio.html'),
        certifications: resolve(__dirname, 'certifications.html'),
        catalog: resolve(__dirname, 'catalog.html'),
        login: resolve(__dirname, 'login.html'),
        signup: resolve(__dirname, 'signup.html')
      }
    }
  }
});
