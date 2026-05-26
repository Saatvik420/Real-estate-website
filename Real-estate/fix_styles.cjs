const fs = require('fs');
const path = require('path');
const dir = 'E:/Development Projects/Real-estate/Real-estate/src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const fp = path.join(dir, file);
  let content = fs.readFileSync(fp, 'utf8');
  let original = content;

  // 1. Add 'reveal' to top-level containers
  // Match <div className="section" or <div className="section-full" and append reveal if not there
  // Not matching if 'reveal' is already inside the quotes
  // We should be careful about loader sections which we saw in PlotsView and RentalsView. Let's skip them if they have padding: '100px 0' and loader-dots.
  if (!content.includes('loader-dots')) {
    content = content.replace(/className=\"(section-full|section)(?!\s*reveal)([^\"']*)\"/g, 'className=\"$1 reveal$2\"');
  }

  // 2. Fix hardcoded gridTemplateColumns
  // 1fr 1fr -> repeat(auto-fit, minmax(min(100%, 250px), 1fr))
  content = content.replace(/gridTemplateColumns:\s*['"]1fr 1fr['"]/g, `gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))'`);
  
  // 1.5fr 1fr -> repeat(auto-fit, minmax(min(100%, 300px), 1fr))
  content = content.replace(/gridTemplateColumns:\s*['"]1\.5fr 1fr['"]/g, `gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))'`);

  // minmax(400px, 1fr) -> minmax(min(100%, 400px), 1fr) (make sure not to double wrap if min(100%, X) is already there)
  content = content.replace(/minmax\((\d+px),\s*1fr\)/g, 'minmax(min(100%, $1), 1fr)');

  // 3. Fix Flex wrap
  // Some inline flex might need stacking. If there is flexDirection: 'row' without wrap, maybe?
  // Let's rely on the user instructions specifically about hardcoded flex/grid styles.

  if (content !== original) {
    fs.writeFileSync(fp, content);
    console.log('Updated', file);
  }
});
