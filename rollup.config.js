import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/open-gallery.js',
  output: [
    {
      file: 'dist/open-gallery.min.js',
      format: 'iife',
      name: 'OpenGallery',
      plugins: [terser()],
    },
    {
      file: 'dist/open-gallery.js',
      format: 'esm',
    },
  ],
  plugins: [
    terser(),
  ],
};
