#!/usr/bin/env node
import * as deepl from 'deepl-node'
import fs from 'fs/promises'
import dotenv from 'dotenv'
dotenv.config()

const authKey = process.env.DEEPL_AUTH_KEY // 内网需代理可在 axios 层加
const translator = new deepl.Translator(authKey)

const SRC = 'locales/en.json'
const DEST = 'locales/zh.json'

const en = JSON.parse(await fs.readFile(SRC, 'utf8'))
let zh = {}
try {
  zh = JSON.parse(await fs.readFile(DEST, 'utf8'))
} catch {}

// 仅翻译新增或变更的句子
const toTranslate = Object.keys(en).filter((k) => !(k in zh))
if (!toTranslate.length) {
  console.log('✅ 无新增文案')
  process.exit(0)
}

const result = await translator.translateText(toTranslate, 'en', 'zh')

toTranslate.forEach((k, i) => {
  zh[k] = result[i].text
})
await fs.writeFile(DEST, JSON.stringify(zh, null, 2))
console.log(`✅ 已翻译 ${toTranslate.length} 条 → ${DEST}`)
