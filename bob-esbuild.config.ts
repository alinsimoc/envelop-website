export const config: import('bob-esbuild').BobConfig = {
  tsc: {
    dirs: ['packages/*', 'packages/plugins/*'],
  },
  verbose: true,
};
