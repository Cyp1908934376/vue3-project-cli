#!/usr/bin/env node
import { execSync } from 'child_process'
import fs from 'fs/promises'
const enPath = 'locales/en.json'

try {
  await fs.access(enPath)
} catch {
  await fs.writeFile(enPath, '{}')
}
const SRC = 'src'
const DEST = 'locales/en.json' // 以英文原文当 key

// ① 用 i18next-scanner 提取
execSync(`npx i18next-scanner --config scripts/scanner.config.js ${SRC}`, { stdio: 'inherit' })

// ② 把 pot 转回 json（以原文为 key）
const pot = await fs.readFile('locales/messages.pot', 'utf8')
const en = {}
pot
  .split(/\n/)
  .filter((l) => l.startsWith('msgid "'))
  .forEach((l) => {
    const txt = l.match(/msgid "(.*)"/)[1]
    if (txt) en[txt] = txt // 原文即 key，也做默认值
  })

await fs.writeFile(DEST, JSON.stringify(en, null, 2))
console.log('✅ 扫描完成 -> locales/en.json')
