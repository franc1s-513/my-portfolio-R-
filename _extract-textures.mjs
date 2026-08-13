import { NodeIO } from '@gltf-transform/core';
import fs from 'fs';
import path from 'path';

const outDir = process.argv[2];
fs.mkdirSync(outDir, { recursive: true });

const io = new NodeIO();
for (const f of ['Castle.glb', 'Castle 2.glb', 'mystic_stones_of_the_sky.glb']) {
  const doc = await io.read('public/' + f);
  const texs = doc.getRoot().listTextures();
  const safe = f.replace(/[^a-z0-9]/gi, '');
  texs.forEach((t, i) => {
    const ext = t.getMimeType() === 'image/jpeg' ? 'jpg' : 'png';
    const p = path.join(outDir, `${safe}-${i}.${ext}`);
    fs.writeFileSync(p, t.getImage());
    console.log(p);
  });
}
console.log('DONE');
