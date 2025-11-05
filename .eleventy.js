const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addWatchTarget("assets/**");

    eleventyConfig.addFilter("readableDate", (dateObj) => {
        if (!dateObj) return "";
        return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("MMM dd, yyyy");
    });

    eleventyConfig.addCollection("posts", (collectionApi) => {
        return collectionApi
            .getFilteredByGlob("src/blogs/posts/**/*.{md,mdx,njk}")
            .filter((item) => item.data.published !== false)
            .sort((a, b) => b.date - a.date);
    });

    return {
        dir: {
            input: "src",
            includes: "_includes",
            layouts: "_includes/layouts",
            data: "_data",
            output: "_site"
        },
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk"
    };
};
