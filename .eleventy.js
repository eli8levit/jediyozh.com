const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

module.exports = function (config) {
  config.addCollection('enPosts', function (collection) {
    return collection.getFilteredByGlob('./src/posts/en/**/*.md');
  });

  config.addCollection('ruPosts', function (collection) {
    return collection.getFilteredByGlob('./src/posts/ru/**/*.md');
  });

  config.addCollection('projects', function (collection) {
    return collection.getFilteredByGlob('./src/projects/*.md');
  });

  config.addFilter('formatDate', (value, locale) => {
    if (!value) return '';
    return value
      .toLocaleString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      .replace(' г.', '');
  });

  config.addFilter('reverseArticles', (articles) => {
    return articles.reverse();
  });

  config.addFilter('isoDate', (value) => {
    if (!value) return '';
    return value.toISOString();
  });

  let markdownLibrary = markdownIt({
    html: true,
  }).use(markdownItAnchor, {
    level: 2,
    slugify: () => 'section',
  });
  config.setLibrary('md', markdownLibrary);

  config.addPassthroughCopy('src/styles');
  config.addPassthroughCopy('src/assets');
  config.addPassthroughCopy('src/fonts');
  config.addPassthroughCopy('src/index.js');
  config.addPassthroughCopy('src/scripts');
  config.addPassthroughCopy({ 'src/other/.htmlnanorc': '/.htmlnanorc' });
  config.addPassthroughCopy('src/other');
  config.addPassthroughCopy('src/site.webmanifest');

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: 'includes',
      layouts: 'layouts',
      data: 'global',
    },
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    passthroughFileCopy: true,
    templateFormats: ['md', 'njk'],
  };
};
