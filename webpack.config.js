const ExtensionReloader = require('webpack-extension-reloader');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const archiver = require('archiver');
const fs = require('fs');

// Customized from https://github.com/Jasmin2895/extension-build-webpack-plugin
class ExtensionDistBundler {
  apply(compiler) {
    compiler.hooks.afterEmit.tap('ExtensionDistBundler', () => {
      let dirName = 'dist';
      fs.access(`./${dirName}`, (error) => {
        if (error) {
          console.log('Extension Plugin ERR: directory missing');
        } else {
          this.createzipFile(dirName, 'agento.bundle.zip');
        }
      });
    });
  }
  createzipFile(dirName, outputFileName) {
    let output = fs.createWriteStream(outputFileName);
    let archive = archiver('zip');

    output.on('close', function () {
      console.log(`${archive.pointer()} total bytes`);
      console.log('archiver has been finalized and the output file descriptor has closed.');
    });

    archive.on('error', function (err) {
      throw err;
    });

    archive.pipe(output);

    archive.directory(`${dirName}/`, dirName);
    archive.file('manifest.json');
    console.log(`${dirName}.zip file created in root directory`);

    archive.finalize();
  }
}

let config = {
  entry: {
    'content-script': './src/inject.js',
    background: './src/background.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/index.html', to: 'index.html' },
        { from: 'src/index.css', to: 'index.css' },
        { from: './icon128.png', to: 'icon128.png' },
      ],
    }),
    new ExtensionReloader({
      port: 9039,
      reloadPage: true,
      entries: {
        contentScript: 'content-script',
        background: 'background',
      },
    }), // development 모드에서만 켜짐
  ],
};

module.exports = (env, args) => {
  if (args.mode === 'development') {
    config.watch = true;
  }

  if (args.mode === 'production') {
    config.plugins.push(new ExtensionDistBundler());
  }

  return config;
};
