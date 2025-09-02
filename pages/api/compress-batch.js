import sharp from 'sharp';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import { promisify } from 'util';
import JSZip from 'jszip';

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFileAsync = promisify(fs.readFile);

async function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fields, files } = await parseForm(req);
    const { quality } = fields;
    
    // Check if files.images exists and handle both single and multiple files
    let imageFiles = [];
    if (files.images) {
      imageFiles = Array.isArray(files.images) ? files.images : [files.images];
    }

    if (!imageFiles || imageFiles.length === 0) {
      return res.status(400).json({ error: 'No image files provided' });
    }

    const zip = new JSZip();
    const compressionQuality = Math.round(parseFloat(quality) * 100);

    // Process all images
    for (const imageFile of imageFiles) {
      try {
        // Use filepath instead of path in newer versions of formidable
        const filePath = imageFile.filepath || imageFile.path;
        
        if (!filePath) {
          console.error('File path is undefined for:', imageFile);
          continue;
        }

        const imageBuffer = await readFileAsync(filePath);
        const compressedImage = await sharp(imageBuffer)
          .jpeg({ 
            quality: compressionQuality,
            mozjpeg: true 
          })
          .toBuffer();

        // Use originalFilename instead of name
        const originalName = imageFile.originalFilename || imageFile.name;
        const cleanName = originalName.replace(/\.[^/.]+$/, "");
        zip.file(`compressed-${cleanName}.jpg`, compressedImage);
      } catch (error) {
        console.error(`Error processing ${imageFile.originalFilename || imageFile.name}:`, error);
        // Continue with other images even if one fails
      }
    }

    // Generate zip file
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    // Set headers for zip download
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="compressed-images.zip"');

    // Send the zip file
    res.send(zipBuffer);
  } catch (error) {
    console.error('Batch compression error:', error);
    res.status(500).json({ error: 'Failed to compress images' });
  }
}