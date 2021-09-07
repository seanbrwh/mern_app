const { src, dest, series } = require("gulp");
const fs = require("fs");

function checkViewDir() {
  return src("./src/server/views/index.ejs").pipe(dest("./dist/server/views"));
}

function ensureDBDirExsists(cb) {
  ensureExists("./dist/mongo_data", 0744, function (err) {
    if (err) {
      console.error({ folderCreationError: err });
    } else {
      cb();
    }
  });
}

exports.default = series(checkViewDir, ensureDBDirExsists);

function ensureExists(path, mask, cb) {
  if (typeof mask == "function") {
    cb = mask;
    mask = 0777;
  }
  fs.mkdir(path, mask, function (err) {
    if (err) {
      if (err.code == "EEXIST") cb(null);
      else cb(err);
    } else cb(null);
  });
}
