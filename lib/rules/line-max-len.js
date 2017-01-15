var Issue = require('../issue');

module.exports = {
  name: 'line-max-len',
  on: ['line']
};

module.exports.lint = function (line, opts) {
  var maxLength = opts[this.name];
  var ignoreRegExp = opts[this.name + '-ignore-regex'];
  var lineText;
  var len;
  var pos;

  lineText = line.line.replace(/(\r\n|\n|\r)$/, '');

  if (ignoreRegExp && ignoreRegExp.test(lineText)) {
    return [];
  }

  len = lineText.length;

  if (len <= maxLength) {
    return [];
  }

  pos = [line.row, len];

  return new Issue('E040', pos, { maxlength: maxLength, length: len });
};
