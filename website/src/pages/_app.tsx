import 'remark-admonitions/styles/infima.css';
import 'prism-themes/themes/prism-atom-dark.css';
import '../../public/style.css';
import '../../public/admonitions.css';

import { appWithTranslation } from 'next-i18next';
import { ReactNode, useMemo, useState } from 'react';
import { Footer, GlobalStyles, Header, SearchBar, Subheader } from 'the-guild-components';

import { ChakraProvider, extendTheme, theme as chakraTheme } from '@chakra-ui/react';

import {
  DocsContainer,
  DocsNavigation,
  DocsSearch,
  DocsTitle,
  ExtendComponents,
  iterateRoutes,
  MdxInternalProps,
  MDXNavigation,
  NextNProgress,
} from '@guild-docs/client';

import type { AppProps } from 'next/app';

import { handleRoute } from '../../next-helpers';

export function ChakraThemeProvider({ children }: { children: ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}

ExtendComponents({
  HelloWorld() {
    return <p>Hello World!</p>;
  },
});

const theme = extendTheme({
  fonts: {
    heading: '"Poppins", sans-serif',
    body: '"Poppins", sans-serif',
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
} as typeof chakraTheme);

const serializedMdx = process.env.SERIALIZED_MDX_ROUTES;
let mdxRoutesData = serializedMdx && JSON.parse(serializedMdx);

function App({ Component, pageProps, router }: AppProps) {
  const accentColor = '#1CC8EE';
  const isDocs = router.asPath.includes('docs');
  const mdxRoutes: MdxInternalProps['mdxRoutes'] | undefined = pageProps.mdxRoutes;
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);

  const Navigation = useMemo(() => {
    const paths = mdxRoutes === 1 ? mdxRoutesData : (mdxRoutesData = mdxRoutes || mdxRoutesData);
    return <MDXNavigation paths={iterateRoutes(paths)} accentColor={accentColor} />;
  }, [mdxRoutes]);

  return (
    <>
      <NextNProgress />
      <GlobalStyles />
      <Header accentColor={accentColor} activeLink="/open-source" />
      <Subheader
        activeLink={router.asPath}
        product={{
          title: 'Envelop',
          description: 'Lorem ipsum dolor sit amet',
          image: {
            src: 'https://the-guild.dev/static/shared-logos/products/envelop.svg',
            alt: 'Envelop Logo',
          },
          onClick: e => handleRoute('/', e, router),
        }}
        links={[
          {
            children: 'Home',
            href: '/',
            title: 'The Guild Envelop',
            onClick: e => handleRoute('/', e, router),
          },
          {
            children: 'Marketplace',
            href: '/marketplace',
            title: 'Browse the Marketplace',
            onClick: e => handleRoute('/marketplace', e, router),
          },
          {
            children: 'API & Docs',
            href: '/docs',
            title: 'Read more about Envelop',
            onClick: e => handleRoute('/docs', e, router),
          },
          {
            children: 'GitHub',
            href: 'https://github.com/dotansimha/envelop',
            target: '_blank',
            rel: 'noopener norefereer',
            title: "Head to the project's GitHub",
          },
        ]}
        cta={{
          children: 'Get Started',
          href: '/docs',
          title: 'Start using Envelop',
          onClick: e => handleRoute('/docs', e, router),
        }}
      />

      {!isDocs ? (
        <Component {...pageProps} />
      ) : (
        <ChakraThemeProvider>
          <DocsContainer>
            <DocsNavigation zIndex={isSearchModalOpen ? '300' : '1'} transition={isSearchModalOpen ? '0s 0s' : '0s 0.3s'}>
              <DocsTitle>Documentation</DocsTitle>
              <DocsSearch>
                <SearchBar
                  isFull
                  placeholder="Search..."
                  title="Documentation"
                  accentColor={accentColor}
                  onHandleModal={setSearchModalOpen}
                />
              </DocsSearch>
              {Navigation}
            </DocsNavigation>
            <Component {...pageProps} />
          </DocsContainer>
        </ChakraThemeProvider>
      )}
      <Footer />
    </>
  );
}

export default appWithTranslation(App);
