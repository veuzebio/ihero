#!/usr/bin/env node

/**
 * PostToolUse hook — runs tsc after Bash commands that delete .ts files or index.ts barrels.
 *
 * Triggered when a Bash call contains "rm" to catch broken imports left behind
 * by barrel removals or file moves that tsc-check.js (Write/Edit only) cannot see.
 */

'use strict';

const { execSync } = require('child_process');
const path = require('path');

let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => (raw += chunk));
process.stdin.on('end', () => {
  const input = JSON.parse(raw);
  const command = input?.tool_input?.command ?? '';

  const affectsTs = /rm\b.*\.(ts|html)\b|rm\b.*index\.ts/.test(command);
  if (!affectsTs) {
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
      feedback: `tsc reported errors after deleting files — broken imports likely remain. Fix before proceeding:\n\n${output}`,
    });
  }
});

function reply(obj) {
  process.stdout.write(JSON.stringify(obj));
}
