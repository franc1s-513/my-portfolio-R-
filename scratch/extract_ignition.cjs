const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const contentMdPath = 'C:\\Users\\franc\\.gemini\\antigravity-ide\\brain\\1ec98ae2-3b70-49f4-a423-249a6d04de32\\.system_generated\\steps\\769\\content.md';
const raw = fs.readFileSync(contentMdPath, 'utf8');

const jsonStart = raw.indexOf('{');
const jsonEnd = raw.lastIndexOf('}');
if (jsonStart === -1 || jsonEnd === -1) {
  console.error('Could not find JSON in content.md');
  process.exit(1);
}

const jsonStr = raw.substring(jsonStart, jsonEnd + 1);
const data = JSON.parse(jsonStr);

console.log('Parsed bundle id:', data.id);
console.log('Files count:', data.files.length);

const baseDir = path.resolve(__dirname, '..');

for (const file of data.files) {
  const targetPath = path.resolve(baseDir, file.path);
  console.log('Processing file:', file.path);
  console.log('Target path:', targetPath);
  console.log('Expected SHA256:', file.sha256);

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, file.code, 'utf8');

  // Verify SHA256 of written content
  const actualSha256 = crypto.createHash('sha256').update(file.code, 'utf8').digest('hex');
  console.log('Computed SHA256:', actualSha256);
  if (actualSha256.toLowerCase() === file.sha256.toLowerCase()) {
    console.log('✓ SHA256 MATCH for ' + file.path);
  } else {
    console.error('✗ SHA256 MISMATCH for ' + file.path);
  }
}
