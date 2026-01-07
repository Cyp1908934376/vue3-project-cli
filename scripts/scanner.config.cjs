module.exports = {
  input: ['src/**/*.{js,vue,ts,tsx}'],
  output: 'locales/',
  options: {
    debug: false,
    removeUnusedKeys: false, // 第一次先保留全部
    sort: true,
    attr: {
      list: ['data-i18n'], // 也扫描自定义属性
      extensions: ['.js', '.vue', '.ts', '.tsx'],
    },
    func: {
      list: ['t', '$t'], // 识别 t('xxx') 或 $t('xxx')
      extensions: ['.js', '.vue', '.ts', '.tsx'],
    },
    lngs: ['en'], // 只抽原文，不生成多语言
    defaultLng: 'en',
    resource: {
      loadPath: 'locales/{{lng}}.json',
      savePath: 'locales/messages.pot', // 仅输出 pot
    },
    keySeparator: false,
    nsSeparator: false,
  },
}
