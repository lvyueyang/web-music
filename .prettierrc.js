module.exports = {
  proseWrap: 'never',
  endOfLine: 'auto',
  printWidth: 80, // 换行字符串阈值, 这个会和 vue 的 max-attributes-per-line 冲突
  tabWidth: 2, // 设置工具每一个水平缩进的空格数
  useTabs: false,
  semi: true, // 句末是否加分号
  vueIndentScriptAndStyle: false,
  bracketSameLine: false,
  jsxBracketSameLine: false, // jsx > 是否另起一行
  singleQuote: true, // 用单引号
  trailingComma: 'all', // 最后一个对象元素加逗号
  bracketSpacing: true, // 对象，数组加空格
  arrowParens: 'always', // (x) => {} 是否要有小括号
  requirePragma: false, // 不需要写文件开头的 @prettier
  insertPragma: false, // 不需要自动在文件开头插入 @prettier
  jsxSingleQuote: false,
};
