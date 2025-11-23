#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, '..', 'docs', 'Projects');
const outFile = path.join(__dirname, '..', 'docs', 'projects.json');

function scan() {
  let list = [];
  try {
    if (!fs.existsSync(projectsDir)) {
      fs.mkdirSync(projectsDir, { recursive: true });
    } else {
      const stat = fs.statSync(projectsDir);
      if (!stat.isDirectory()) {
        // If a file exists with this name, remove it and create a directory
        fs.unlinkSync(projectsDir);
        fs.mkdirSync(projectsDir, { recursive: true });
      }
    }

    const files = fs.readdirSync(projectsDir);
    list = files.filter(f => f.toLowerCase().endsWith('.html'));
  } catch (err) {
    console.error('Failed to scan Projects directory:', err.message);
    process.exitCode = 1;
  }

  const payload = { projects: list };
  fs.writeFileSync(outFile, JSON.stringify(payload, null, 2), 'utf8');
  console.log('Wrote', outFile, 'with', list.length, 'project(s)');
}

scan();
