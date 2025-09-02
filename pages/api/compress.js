import sharp from 'sharp';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import { promisify } from 'util';

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFileAsync = promisify(fs.readFile);

async function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm();
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
    
    // Handle both single file and multiple files
    let imageFile;
    if (files.image) {
      imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
    } else if (files.images) {
      // Fallback for when the field name is 'images' instead of 'image'
      const images = Array.isArray(files.images) ? files.images : [files.images];
      imageFile = images[0];
    }

    if (!imageFile) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Use filepath instead of path (newer versions of formidable)
    const filePath = imageFile.filepath || imageFile.path;
    
    if (!filePath) {
      return res.status(400).json({ error: 'File path is undefined' });
    }

    // Read the uploaded file
    const imageBuffer = await readFileAsync(filePath);
    
    // Get the original file name
    const originalName = imageFile.originalFilename || imageFile.name;
    
    // Determine the output format based on the original file type
    let outputOptions = {};
    const fileExtension = originalName.split('.').pop().toLowerCase();
    
    if (['png', 'gif', 'webp'].includes(fileExtension)) {
      // For non-JPEG formats, convert to the same format
      outputOptions = { 
        [fileExtension]: { 
          quality: Math.round(parseFloat(quality) * 100),
          compressionLevel: 9 
        } 
      };
    } else {
      // Default to JPEG for other formats
      outputOptions = { 
        jpeg: { 
          quality: Math.round(parseFloat(quality) * 100),
          mozjpeg: true 
        } 
      };
    }
    
    // Compress the image using Sharp
    const compressedImage = await sharp(imageBuffer)
      .toFormat(Object.keys(outputOptions)[0], outputOptions[Object.keys(outputOptions)[0]])
      .toBuffer();

    // Determine the appropriate content type and file extension
    const contentType = `image/${Object.keys(outputOptions)[0]}`;
    const fileExt = Object.keys(outputOptions)[0] === 'jpeg' ? 'jpg' : Object.keys(outputOptions)[0];
    
    // Set appropriate headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="compressed-${originalName.split('.')[0]}.${fileExt}"`);
    
    // Send the compressed image
    res.send(compressedImage);
  } catch (error) {
    console.error('Compression error:', error);
    res.status(500).json({ error: 'Failed to compress image' });
  }
}