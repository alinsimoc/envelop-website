import fs from 'fs-extra';
import Head from 'next/head';

import { DocsContent, DocsTOC, MDXPage } from '@guild-docs/client';
import { MDXPaths, MDXProps } from '@guild-docs/server';

import { getRoutes } from '../../../routes';

import type { GetStaticPaths, GetStaticProps } from 'next';

export default MDXPage(function PostPage({ content, TOC, MetaHead, BottomNavigation }) {
  return (
    <>
      <Head>{MetaHead}</Head>
      <DocsContent>{content}</DocsContent>
      <DocsTOC>
        <TOC />
        <BottomNavigation />
      </DocsTOC>
    </>
  );
});

export const getStaticProps: GetStaticProps = ctx => {
  return MDXProps(
    ({ readMarkdownFile, getArrayParam }) => {
      return readMarkdownFile('docs/', getArrayParam('slug'));
    },
    ctx,
    {
      getRoutes,
    }
  );
};

export const getStaticPaths: GetStaticPaths = async ctx => {
  await Promise.all([fs.copy('../README.md', 'docs/index.md'), fs.copy('../packages/core/README.md', 'docs/core.md')]);

  return MDXPaths('docs', { ctx });
};
