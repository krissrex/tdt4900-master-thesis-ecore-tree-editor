module.exports = {
  // This can be bad for browser caching,
  // BUT it allows copying the dist directly into the vscode extension
  // without updating filenames in the extension source code.
  filenameHashing: false,
  chainWebpack(config) {
    config.devtool("eval-source-map");
    config.resolve.symlinks(false);
  },
};
