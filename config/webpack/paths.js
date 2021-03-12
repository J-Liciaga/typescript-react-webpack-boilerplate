const path = require("path");

module.exports = {
    // Source files.
    src: path.resolve(__dirname, "../../src"),
    // Static files that will get copied to the build folder.
    public: path.resolve(__dirname, "../../public"),
    static: path.resolve(__dirname, "../../static"),
    // Production build files.
    build: path.resolve(__dirname, "../../dist"),
};
