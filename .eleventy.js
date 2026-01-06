module.exports = function (eleventyConfig) {
  // Allow CMS + images to pass through unchanged
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/images");

  // Blog post collection
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("src/posts/*.md").reverse();
  });

  eleventyConfig.addFilter("readtime", function(content) {
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        return Math.ceil(wordCount / wordsPerMinute);
    });

  return {
        dir: {
            input: "src",
            output: "dist",
            includes: "_includes",
            data: "_data"
        },
        templateFormats: ["md", "njk", "html"],
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk"
    };
};