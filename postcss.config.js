const csso = require("postcss-csso")({ comments: false });

module.exports = () => {
    const prod = process.env.NODE_ENV === "production";
    return {
        plugins: [
            require("tailwindcss"),
            require("autoprefixer"),
            require("postcss-fixes"),
            require("postcss-import"),
            prod ? csso : undefined // keep csso after purgecss, or it will break
        ]
    }
}