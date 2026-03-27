#!/usr/bin/env node

/**
 * Compress Sponsor SVG Images
 *
 * This script compresses and optimizes existing SVG files in the sponsors directory.
 * It extracts embedded images from SVGs, compresses them, and re-embeds them.
 *
 * Usage: node scripts/compress-sponsor-svgs.js
 *
 * Requirements: Install sharp package first
 * npm install sharp --save-dev
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');
const ROOT = join(__dirname, '..');
const SPONSORS_DIR = join(ROOT, 'static', 'images', 'sponsors');

async function compressEmbeddedImage(base64Data, mimeType) {
	try {
		// Convert base64 back to buffer
		const imageBuffer = Buffer.from(base64Data, 'base64');

		// Get image metadata
		const metadata = await sharp(imageBuffer).metadata();
		const { width, height } = metadata;

		// Resize if image is too large (optimize for sponsor logo display)
		const maxWidth = 400;
		const maxHeight = 200;
		const shouldResize = width > maxWidth || height > maxHeight;

		let processedImage = sharp(imageBuffer);

		if (shouldResize) {
			processedImage = processedImage.resize(maxWidth, maxHeight, {
				fit: 'inside',
				withoutEnlargement: true
			});
		}

		// Compress the image
		const compressedBuffer = await processedImage
			.png({
				quality: 80,
				compressionLevel: 9,
				progressive: true
			})
			.toBuffer();

		// Get final dimensions after potential resize
		const finalMetadata = await sharp(compressedBuffer).metadata();
		const finalWidth = finalMetadata.width;
		const finalHeight = finalMetadata.height;

		const compressedBase64 = compressedBuffer.toString('base64');

		return {
			success: true,
			base64: compressedBase64,
			width: finalWidth,
			height: finalHeight,
			originalSize: `${width}x${height}`,
			wasResized: shouldResize,
			originalLength: base64Data.length,
			compressedLength: compressedBase64.length
		};
	} catch (error) {
		return { success: false, error: error.message };
	}
}

async function compressSvg(inputPath, outputPath) {
	try {
		// Read the SVG file
		const svgContent = readFileSync(inputPath, 'utf8');

		// Find embedded image data
		const imageRegex = /xlink:href="data:(image\/[^;]+);base64,([^"]+)"/;
		const match = svgContent.match(imageRegex);

		if (!match) {
			return { success: false, error: 'No embedded image found in SVG' };
		}

		const mimeType = match[1];
		const base64Data = match[2];

		// Compress the embedded image
		const result = await compressEmbeddedImage(base64Data, mimeType);

		if (!result.success) {
			return { success: false, error: result.error };
		}

		// Update SVG dimensions and image data
		let newSvgContent = svgContent;

		// Update SVG viewBox and dimensions
		newSvgContent = newSvgContent.replace(
			/width="[^"]*"/,
			`width="${result.width}"`
		);
		newSvgContent = newSvgContent.replace(
			/height="[^"]*"/,
			`height="${result.height}"`
		);
		newSvgContent = newSvgContent.replace(
			/viewBox="[^"]*"/,
			`viewBox="0 0 ${result.width} ${result.height}"`
		);

		// Update image element dimensions
		newSvgContent = newSvgContent.replace(
			/<image[^>]*>/,
			`<image width="${result.width}" height="${result.height}" xlink:href="data:${mimeType};base64,${result.base64}"/>`
		);

		// Write the compressed SVG
		writeFileSync(outputPath, newSvgContent, 'utf8');

		const compressionRatio = ((result.originalLength - result.compressedLength) / result.originalLength * 100).toFixed(1);

		return {
			success: true,
			width: result.width,
			height: result.height,
			originalSize: result.originalSize,
			wasResized: result.wasResized,
			compressionRatio: compressionRatio,
			originalLength: result.originalLength,
			compressedLength: result.compressedLength
		};
	} catch (error) {
		return { success: false, error: error.message };
	}
}

async function main() {
	console.log('🗜️  Compressing sponsor SVG images...\n');

	if (!existsSync(SPONSORS_DIR)) {
		console.log('❌ Sponsors directory not found:', SPONSORS_DIR);
		console.log('Please create the directory and add your SVG files first.');
		return;
	}

	// Read all SVG files in sponsors directory
	const files = readdirSync(SPONSORS_DIR);
	const svgFiles = files.filter(file => extname(file).toLowerCase() === '.svg');

	if (svgFiles.length === 0) {
		console.log('❌ No SVG files found in:', SPONSORS_DIR);
		return;
	}

	console.log(`Found ${svgFiles.length} SVG file(s) to compress:\n`);

	let successCount = 0;
	let errorCount = 0;
	let totalOriginalSize = 0;
	let totalCompressedSize = 0;

	for (const file of svgFiles) {
		const inputPath = join(SPONSORS_DIR, file);
		const nameWithoutExt = basename(file, extname(file));
		const outputPath = join(SPONSORS_DIR, `${nameWithoutExt}.svg`);

		console.log(`Compressing: ${file}`);

		const result = await compressSvg(inputPath, outputPath);

		if (result.success) {
			let sizeInfo = `${result.width}x${result.height}`;
			if (result.wasResized) {
				sizeInfo += ` (resized from ${result.originalSize})`;
			}

			console.log(`  ✅ Compressed: ${file} (${sizeInfo})`);
			console.log(`  📉 Compression: ${result.compressionRatio}% reduction`);

			totalOriginalSize += result.originalLength;
			totalCompressedSize += result.compressedLength;
			successCount++;
		} else {
			console.log(`  ❌ Failed: ${result.error}`);
			errorCount++;
		}

		console.log('');
	}

	// Summary
	const totalCompressionRatio = totalOriginalSize > 0
		? ((totalOriginalSize - totalCompressedSize) / totalOriginalSize * 100).toFixed(1)
		: 0;

	console.log('📊 Compression Summary:');
	console.log(`  ✅ Successfully compressed: ${successCount} files`);
	if (errorCount > 0) {
		console.log(`  ❌ Failed compressions: ${errorCount} files`);
	}
	console.log(`  📉 Total compression: ${totalCompressionRatio}% reduction`);
	console.log(`  💾 Original size: ${(totalOriginalSize / 1024).toFixed(1)}KB`);
	console.log(`  💾 Compressed size: ${(totalCompressedSize / 1024).toFixed(1)}KB`);
	console.log('\n🎉 Compression complete!');

	if (successCount > 0) {
		console.log('\n💡 Next steps:');
		console.log('  1. Review the compressed SVG files');
		console.log('  2. Test the website to ensure images display correctly');
		console.log('  3. Run npm run build to update the production build');
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