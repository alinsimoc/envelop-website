import { IRoutes, GenerateRoutes } from '@guild-docs/server';

export function getRoutes(): IRoutes {
  const Routes: IRoutes = {
    _: {
      index: {
        $name: 'Home',
        $routes: [['index', 'Home Page']],
      },
      docs: {
        $name: 'Docs',
        $routes: [['index', 'Getting Started'], ['core', 'Core'], 'test'],
      },
    },
  };
  GenerateRoutes({
    Routes,
    folderPattern: 'docs',
    basePath: 'docs',
    basePathLabel: 'Documentation',
    labels: {
      index: 'Docs',
    },
  });

  return Routes;
}
