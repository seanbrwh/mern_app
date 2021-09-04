const { src, dest } = require("gulp");

exports.default = function () {
  return src("./src/server/views/index.ejs").pipe(dest("./dist/server/views"));
};
