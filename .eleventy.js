const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
    // Add CSS and images passthrough
    eleventyConfig.addPassthroughCopy("src/styles.css");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/admin");
    
    // Add collection for blog posts
    eleventyConfig.addCollection("posts", function(collection) {
        return collection.getFilteredByGlob("src/posts/*.md").sort((a, b) => {
            return b.date - a.date;
        });
    });
    
    // Add date filter (FIXED - use luxon)
    eleventyConfig.addFilter("postDate", function(dateObj) {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_FULL);
    });
    
    // Add filter for reading time
    eleventyConfig.addFilter("readtime", function(content) {
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        return Math.ceil(wordCount / wordsPerMinute);
    });
    
    // Add filter for slug
    eleventyConfig.addFilter("slug", function(str) {
        return str
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    });
    
    // Add short date filter (for meta)
    eleventyConfig.addFilter("shortDate", function(dateObj) {
        return DateTime.fromJSDate(dateObj).toFormat("MMMM d, yyyy");
    });
    
    // Add ISO date filter
    eleventyConfig.addFilter("isoDate", function(dateObj) {
        return DateTime.fromJSDate(dateObj).toISO();
    });
    
    // Add current year filter for footer
    eleventyConfig.addFilter("getCurrentYear", function() {
        return new Date().getFullYear().toString();
    });
    
    // Return configuration
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