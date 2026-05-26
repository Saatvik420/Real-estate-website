const fs = require('fs');
const path = require('path');
const dir = 'E:/Development Projects/Real-estate/Real-estate/src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const fp = path.join(dir, file);
  let content = fs.readFileSync(fp, 'utf8');
  let original = content;

  // Revert 'section reveal-inner' back to 'section-inner'
  content = content.replace(/className=\"section reveal-inner\"/g, 'className=\"section-inner\"');
  
  // Revert any other mangled classes like 'section reveal-[something]'
  content = content.replace(/className=\"section reveal-([^\"]+)\"/g, 'className=\"section-$1\"');

  if (content !== original) {
    fs.writeFileSync(fp, content);
    console.log('Fixed', file);
  }
});
