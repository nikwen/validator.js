const pkg = require('./package.json');
const fs = require('fs');
const rollup = require('rollup').rollup;
const babel = require('rollup-plugin-babel');

// Build with `npm run build:browser`

rollup({
  entry: 'src/lib/isEmail.js',
  plugins: [
    babel({
      presets: ['es2015-rollup'],
      babelrc: false,
    }),
  ],
}).then(bundle => (
  bundle.write({
    dest: 'validator.isEmail.js',
    format: 'umd',
    moduleName: 'isEmail',
    banner: (
      '/*!\n' +
      String(fs.readFileSync('./LICENSE')).trim().split('\n').map(l => ` * ${l}`).join('\n') +
      '\n */'
    ),
  })
)).catch(e => {
  process.stderr.write(e.message + '\n');
  process.exit(1);
});
