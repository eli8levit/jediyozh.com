module.exports = function (config) {
  config.addPassthroughCopy('src/styles');
  config.addPassthroughCopy('src/assets');
  config.addPassthroughCopy('src/fonts');
  config.addPassthroughCopy('src/index.js');
  config.addPassthroughCopy('src/scripts');
  config.addPassthroughCopy({ "src/other": "/" });

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: 'includes',
      layouts: 'layouts',
    },
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: false,
    htmlTemplateEngine: 'njk',
    passthroughFileCopy: true,
    templateFormats: ['md', 'html', 'njk', 'jpg', 'png', 'svg'],
  };
};
