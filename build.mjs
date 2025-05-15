import { build } from 'esbuild';

build({
  entryPoints: ['index.js'],
  outfile: 'dist/index.js',
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: ['node18'],
  banner: {
    js: '#!/usr/bin/env node',
  },
}).catch(() => process.exit(1));
