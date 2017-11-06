export default {
  entry: 'dist/index.js',
  dest: 'bundles/core.umd.js',
  format: 'umd',
  sourceMap: 'inline',
  moduleName: 'utilities',
  globals: {
    '@angular/core': 'ng.core'
  }
};
