import { defineConfig, fontProviders } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightOpenAPI, { createOpenAPISidebarGroup } from 'starlight-openapi';

const apiSidebarGroup = createOpenAPISidebarGroup();

export default defineConfig({
  site: 'https://grimmory.org',
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Segoe UI', 'system-ui', 'sans-serif'],
    },
  ],
  integrations: [
    starlight({
      title: 'Grimmory',
      favicon: '/favicon.png',
      customCss: ['./src/styles/tokens.css', './src/styles/openapi.css', './src/styles/search.css'],
      components: {
        Head: './src/components/Head.astro',
        Hero: './src/components/Hero.astro',
        SiteTitle: './src/components/SiteTitle.astro',
        Footer: './src/components/Footer.astro',
        Sidebar: './src/components/Sidebar.astro',
        TwoColumnContent: './src/components/TwoColumnContent.astro',
        PageSidebar: './src/components/PageSidebar.astro',
      },
      plugins: [
        starlightOpenAPI([
          {
            base: 'api',
            schema: 'https://github.com/grimmory-tools/grimmory/releases/latest/download/openapi.json',
            sidebar: {
              label: 'API Reference',
              group: apiSidebarGroup,
              collapsed: true,
              operations: {
                badges: true,
                labels: 'summary',
              },
            },
            snippets: {
              operation: {
                clients: {
                  c: ['libcurl'],
                  csharp: ['httpclient'],
                  go: ['nethttp'],
                  java: ['nethttp', 'okhttp'],
                  javascript: ['axios', 'fetch'],
                  kotlin: ['okhttp'],
                  rust: ['reqwest'],
                  shell: ['curl', 'wget'],
                },
                default: { target: 'shell', client: 'curl' },
              },
              requestBody: true,
              response: true,
            },
          },
        ]),
      ],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/grimmory-tools/grimmory' },
        { icon: 'discord', label: 'Discord', href: 'https://discord.gg/vNsB8CTebs' },
        { icon: 'openCollective', label: 'Sponsor', href: 'https://opencollective.com/grimmory' },
      ],

      sidebar: [
        {
          label: 'Docs',
          items: [
            { autogenerate: { directory: 'start' } },
            { label: 'Library', items: [{ autogenerate: { directory: 'library' } }] },
            { label: 'Bookdrop', items: [{ autogenerate: { directory: 'bookdrop' } }] },
            { label: 'Books & Collections', items: [{ autogenerate: { directory: 'books' } }] },
            { label: 'Metadata', items: [{ autogenerate: { directory: 'metadata' } }] },
            { label: 'Reader & Display', items: [{ autogenerate: { directory: 'readers' } }] },
            { label: 'Integrations', items: [{ autogenerate: { directory: 'integration' } }] },
            { label: 'Authentication', items: [{ autogenerate: { directory: 'authentication' } }] },
            { label: 'Administration', items: [{ autogenerate: { directory: 'administration' } }] },
            { label: 'Customization', items: [{ autogenerate: { directory: 'customization' } }] },
          ],
        },
        {
          label: 'API',
          items: [apiSidebarGroup],
        },
      ],
    }),
  ],
});
