#!/usr/bin/env node

/**
 * Convert Sponsor Images to SVG
 *
 * This script converts common image formats (PNG, JPG, JPEG, GIF) to SVG format
 * for sponsor logos. It processes all images in the static/images/sponsors/ directory.
 *
 * Usage: node scripts/convert-sponsors-to-svg.js
 *
 * Requirements: Install sharp package first
 * npm install sharp --save-dev
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, unlinkSync } from 'fs';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');
const ROOT = join(__dirname, '..');
const SPONSORS_DIR = join(ROOT, 'static', 'images', 'sponsors');

// Create sponsors directory if it doesn't exist
if (!existsSync(SPONSORS_DIR)) {
	mkdirSync(SPONSORS_DIR, { recursive: true });
	console.log('Created sponsors directory:', SPONSORS_DIR);
}

// Supported input formats
const SUPPORTED_FORMATS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.tif', '.tiff'];

async function convertImageToSvg(inputPath, outputPath) {
	try {
		// Get image metadata
		const metadata = await sharp(inputPath).metadata();
		const { width, height } = metadata;

		// Resize if image is too large (optimize for sponsor logo display)
		const maxWidth = 400;
		const maxHeight = 200;
		const shouldResize = width > maxWidth || height > maxHeight;

		let processedImage = sharp(inputPath);

		if (shouldResize) {
			processedImage = processedImage.resize(maxWidth, maxHeight, {
				fit: 'inside',
				withoutEnlargement: true
			});
		}

		// Convert image to compressed PNG for embedding
		const imageBuffer = await processedImage
			.png({
				quality: 80,
				compressionLevel: 9,
				progressive: true
			})
			.toBuffer();

		// Get final dimensions after potential resize
		const finalMetadata = await sharp(imageBuffer).metadata();
		const finalWidth = finalMetadata.width;
		const finalHeight = finalMetadata.height;

		const base64 = imageBuffer.toString('base64');
		const mimeType = 'image/png';

		// Create SVG wrapper with final dimensions
		const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${finalWidth}" height="${finalHeight}" viewBox="0 0 ${finalWidth} ${finalHeight}">
	<image width="${finalWidth}" height="${finalHeight}" xlink:href="data:${mimeType};base64,${base64}"/>
</svg>`;

		// Write SVG file
		writeFileSync(outputPath, svgContent, 'utf8');

		return {
			success: true,
			width: finalWidth,
			height: finalHeight,
			originalSize: `${width}x${height}`,
			wasResized: shouldResize
		};
	} catch (error) {
		return { success: false, error: error.message };
	}
}

async function main() {
	console.log('🖼️  Converting sponsor images to SVG...\n');

	if (!existsSync(SPONSORS_DIR)) {
		console.log('❌ Sponsors directory not found:', SPONSORS_DIR);
		console.log('Please create the directory and add your sponsor images first.');
		return;
	}

	// Read all files in sponsors directory
	const files = readdirSync(SPONSORS_DIR);
	const imageFiles = files.filter(file =>
		SUPPORTED_FORMATS.includes(extname(file).toLowerCase())
	);

	if (imageFiles.length === 0) {
		console.log('❌ No supported image files found in:', SPONSORS_DIR);
		console.log('Supported formats:', SUPPORTED_FORMATS.join(', '));
		return;
	}

	console.log(`Found ${imageFiles.length} image file(s) to convert:\n`);

	let successCount = 0;
	let errorCount = 0;

	for (const file of imageFiles) {
		const inputPath = join(SPONSORS_DIR, file);
		const nameWithoutExt = basename(file, extname(file));
		const outputPath = join(SPONSORS_DIR, `${nameWithoutExt}.svg`);

		console.log(`Converting: ${file}`);

		const result = await convertImageToSvg(inputPath, outputPath);

		if (result.success) {
			let sizeInfo = `${result.width}x${result.height}`;
			if (result.wasResized) {
				sizeInfo += ` (resized from ${result.originalSize})`;
			}
			console.log(`  ✅ Created: ${nameWithoutExt}.svg (${sizeInfo})`);

			// Remove the original file
			try {
				unlinkSync(inputPath);
				console.log(`  🗑️  Removed: ${file}`);
			} catch (error) {
				console.log(`  ⚠️  Could not remove original file: ${error.message}`);
			}

			successCount++;
		} else {
			console.log(`  ❌ Failed: ${result.error}`);
			errorCount++;
		}

		console.log('');
	}

	// Summary
	console.log('📊 Conversion Summary:');
	console.log(`  ✅ Successfully converted: ${successCount} files`);
	if (errorCount > 0) {
		console.log(`  ❌ Failed conversions: ${errorCount} files`);
	}
	console.log('\n🎉 Conversion complete!');

	if (successCount > 0) {
		console.log('\n💡 Next steps:');
		console.log('  1. Review the generated SVG files');
		console.log('  2. Update your sponsors-master.csv to use .svg extensions');
		console.log('  3. Run npm run build:data to regenerate the sponsors data');
	}
}

// Check if sharp is available
try {
	await import('sharp');
} catch (error) {
	console.log('❌ Sharp package not found. Please install it first:');
	console.log('npm install sharp --save-dev\n');
	process.exit(1);
}

main().catch(console.error);