#!/usr/bin/env node

/**
 * PostToolUse hook — runs tsc after Write/Edit on TypeScript files.
 *
 * Claude passes the event as JSON on stdin.
 * We reply on stdout with { continue: true, feedback?: string }.
 * Non-zero exit or { continue: false } blocks the tool (PreToolUse only).
 */

'use strict';

const { execSync } = require('child_process');
const path = require('path');

let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => (raw += chunk));
process.stdin.on('end', () => {
  const input = JSON.parse(raw);
  const filePath = input?.tool_input?.file_path ?? '';
  const isTypeScript = filePath.endsWith('.ts') || filePath.endsWith('.html');

  if (!isTypeScript) {
    reply({ continue: true });
    return;
  }

  const projectRoot = path.resolve(__dirname, '../..');

  try {
    execSync('npx tsc -p tsconfig.app.json --noEmit', {
      cwd: projectRoot,
      stdio: 'pipe',
    });
    reply({ continue: true });
  } catch (err) {
    const output = (err.stdout?.toString() ?? '') + (err.stderr?.toString() ?? '');
    reply({
      continue: true,
      feedback: `tsc reported errors after your last edit — fix them before proceeding:\n\n${output}`,
    });
  }
});

function reply(obj) {
  process.stdout.write(JSON.stringify(obj));
}
