import fs from 'node:fs';
import path from 'node:path';

const srcDir = 'gallery_images';
const destDir = path.join('public', 'media', 'gallery');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Function to read jpeg dimensions
function getJpegDimensions(buffer) {
  let i = 0;
  if (buffer[i] !== 0xFF || buffer[i+1] !== 0xD8) return { width: 1200, height: 800 };
  i += 2;
  while (i < buffer.length) {
    if (buffer[i] !== 0xFF) { i++; continue; }
    const marker = buffer[i+1];
    if (marker === 0xC0 || marker === 0xC1 || marker === 0xC2) {
      const height = buffer.readUInt16BE(i + 5);
      const width = buffer.readUInt16BE(i + 7);
      return { width, height };
    }
    const len = buffer.readUInt16BE(i + 2);
    i += 2 + len;
  }
  return { width: 1200, height: 800 };
}

const allSourceFiles = fs.readdirSync(srcDir);
console.log('Source files count:', allSourceFiles.length);

const renameRules = (name) => {
  if (name === '01_villa_palmier.jpg') return 'villa-palmier.jpg';
  if (name === '02_cour_eau.jpg') return 'cour-eau.jpg';
  if (name === '03_hotel_lagune.jpg') return 'hotel-lagune.jpg';
  if (name === '04_appartement.jpg') return 'appartement.jpg';
  if (name === '05_jardin.jpg') return 'jardin.jpg';
  if (name === '06_laterite.jpg') return 'laterite.jpg';
  if (name === '07_bois_lumiere.jpg') return 'bois-lumiere.jpg';
  if (name === '08_bassin.jpg') return 'bassin.jpg';
  if (name === '09_mobilier.jpg') return 'mobilier.jpg';
  if (name === '10_cour_palmes.jpg') return 'cour-palmes.jpg';
  if (name === '11_pierre.jpg') return 'pierre.jpg';
  if (name === '12_hotel_hall.jpg') return 'hotel-hall.jpg';
  if (name === '13_residence.jpg') return 'residence.jpg';
  if (name === '20_lumiere_golfe.jpg') return 'lumiere-golfe.jpg';

  if (name.includes('Waterproof')) return 'cuisine-marbre-platine.jpg';
  if (name.includes('Refrigerator')) return 'cuisine-poignees-textile.jpg';
  if (name.startsWith('bureau pc')) return 'bureau-espace-travail.jpg';
  if (name.startsWith('cuisine famille')) return 'cuisine-familiale.jpg';
  if (name.startsWith('cuisiniere')) return 'cuisiniere-piano-cuisson.jpg';
  if (name.startsWith('douche')) return 'salle-de-bain-douche.jpg';
  if (name.startsWith('enclos')) return 'enclos-claustra-exterieur.jpg';
  if (name.startsWith('Escalier')) return 'escalier-bois-metal.jpg';
  if (name.startsWith('garage')) return 'espace-garage-atelier.jpg';
  if (name.startsWith('Hallway')) return 'couloir-circulation-galerie.jpg';
  if (name.includes('Elefante')) return 'table-appoint-elefante.jpg';
  if (name.startsWith('lampee')) return 'lampe-sculpturale-ambiance.jpg';
  if (name.includes('Sheesham')) return 'horloge-murale-sheesham.jpg';
  if (name.startsWith('lavabo 2')) return 'vasque-marbre-bain.jpg';
  if (name.startsWith('lavabo cuisine')) return 'evier-cuisine-robinetterie.jpg';
  if (name.startsWith('lit (2)')) return 'chambre-lit-bois.jpg';
  if (name === 'lit.jpg') return 'suite-parentale-lit.jpg';
  if (name.includes('Lustre LED')) return 'lustre-led-suspension.jpg';
  if (name.startsWith('maison')) return 'villa-facade-contemporaine.jpg';
  if (name.includes('Block Wall Clock')) return 'horloge-bloc-bois.jpg';
  if (name.includes('Corner Clock')) return 'horloge-d-angle-moderne.jpg';
  if (name.includes('Floating Stairs')) return 'escalier-flottant-industriel.jpg';
  if (name.startsWith('my kitchen')) return 'cuisine-ilot-central.jpg';
  if (name.startsWith('rideau')) return 'habillage-voilage-baie.jpg';
  if (name.startsWith('Sala rack')) return 'meuble-tv-boiserie-salon.jpg';
  if (name.startsWith('salon tele (2)')) return 'salon-contemporain-alcove.jpg';
  if (name.startsWith('salon tele')) return 'salon-ecran-claustra.jpg';
  if (name === 'salon.jpg') return 'salon-lounge-lumineux.jpg';
  if (name.startsWith('SHEIN')) return 'composition-murale-deco.jpg';
  if (name.includes('Square Ceiling')) return 'plafond-coffrage-luminaire.jpg';
  if (name.includes('Cloud')) return 'suspension-ceramique-cloud.jpg';
  if (name.startsWith('table basse')) return 'table-basse-bois-pierre.jpg';
  if (name.startsWith('table manger')) return 'table-a-manger-chene.jpg';
  if (name.startsWith('Tara')) return 'interieur-tara-sejour.jpg';
  if (name.includes('télécharger')) return 'detail-finition-texture.jpg';
  if (name.includes('pot de fleur')) return 'pot-vegetal-sculptural.jpg';
  if (name.includes('Minimal Wall')) return 'mur-minimaliste-lattes-bois.jpg';

  // fallback sanitized
  return name.toLowerCase().replace(/[^a-z0-9.]+/g, '-');
};

const processed = [];

for (const file of allSourceFiles) {
  const targetName = renameRules(file);
  const srcPath = path.join(srcDir, file);
  const destPath = path.join(destDir, targetName);
  fs.copyFileSync(srcPath, destPath);
  const buf = fs.readFileSync(srcPath);
  const dims = getJpegDimensions(buf);
  processed.push({
    original: file,
    filename: targetName,
    src: `/media/gallery/${targetName}`,
    width: dims.width,
    height: dims.height,
  });
}

console.log(`Copied ${processed.length} files successfully!`);
fs.writeFileSync('scripts/gallery-items.json', JSON.stringify(processed, null, 2));
