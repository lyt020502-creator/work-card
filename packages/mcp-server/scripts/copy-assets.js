#!/usr/bin/env node
/**
 * 构建前将 packages/work-card 的规范文件复制到 packages/mcp-server/data/
 * 这样发布 npm 包时可以把文件一起打进去
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, "../../work-card");
const DEST = path.resolve(__dirname, "../data");

const COPY_LIST = [
  "components/ui/work-card.tsx",
  "components/icons/ICON_LIST.md",
  "components/work-card-examples/EXAMPLES.md",
  "theme.css",
];

// 递归复制整个目录
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

// 清空并重建 data/
if (fs.existsSync(DEST)) fs.rmSync(DEST, { recursive: true });
fs.mkdirSync(DEST, { recursive: true });

// 复制单文件
for (const rel of COPY_LIST) {
  const src = path.join(SRC, rel);
  const dest = path.join(DEST, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`✓ ${rel}`);
}

// 复制整个 work-card-examples 目录（含 shared/ 和所有 HTML）
copyDir(
  path.join(SRC, "components/work-card-examples"),
  path.join(DEST, "components/work-card-examples")
);
console.log("✓ components/work-card-examples/ (全部)");

console.log(`\n资源已复制到 ${DEST}`);
