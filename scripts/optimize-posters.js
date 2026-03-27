#!/usr/bin/env node

/**
 * Optimize Movie Posters
 *
 * This script standardizes and compresses movie poster images for optimal web display.
 * It converts various formats to JPG and ensures consistent sizing and quality.
 *
 * Usage: node scripts/optimize-posters.js [year]
 * Examples:
 *   node scripts/optimize-posters.js        # Process all years
 *   node scripts/optimize-posters.js 2026   # Process only 2026
 *
 * Requirements: Install sharp package first
 * npm install sharp --save-dev
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, unlinkSync, statSync } from 'fs';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');
const ROOT = join(__dirname, '..');
const IMAGES_DIR = join(ROOT, 'static', 'images');

// Supported input formats
const SUPPORTED_FORMATS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.tif', '.tiff', '.bmp'];

// Poster optimization settings
const POSTER_CONFIG = {
	// Standard poster dimensions (2:3 aspect ratio)
	maxWidth: 600,
	maxHeight: 900,

	// Quality settings for different file sizes
	quality: {
		high: 85,    // For small files or high detail
		medium: 75,  // Standard quality
		low: 65      // For very large files
	},

	// File size thresholds (in bytes)
	thresholds: {
		small: 100 * 1024,   // 100KB
		medium: 500 * 1024,  // 500KB
		large: 1024 * 1024   // 1MB
	}
};

function getOptimalQuality(originalSize, processedSize) {
	// Start with high quality for small files
	if (originalSize <= POSTER_CONFIG.thresholds.small) {
		return POSTER_CONFIG.quality.high;
	}

	// Use medium quality for medium files
	if (originalSize <= POSTER_CONFIG.thresholds.medium) {
		return POSTER_CONFIG.quality.medium;
	}

	// For large files, start with medium and adjust if needed
	if (processedSize > POSTER_CONFIG.thresholds.medium) {
		return POSTER_CONFIG.quality.low;
	}

	return POSTER_CONFIG.quality.medium;
}

async function optimizePoster(inputPath, outputPath) {
	try {
		// Get original file size
		const originalStats = statSync(inputPath);
		const originalSize = originalStats.size;

		// Get image metadata
		const metadata = await sharp(inputPath).metadata();
		const { width, height, format } = metadata;

		// Calculate optimal dimensions maintaining 2:3 aspect ratio
		const aspectRatio = 2 / 3;
		let targetWidth = Math.min(width, POSTER_CONFIG.maxWidth);
		let targetHeight = Math.min(height, POSTER_CONFIG.maxHeight);

		// Ensure aspect ratio is maintained
		const currentRatio = targetWidth / targetHeight;
		if (currentRatio > aspectRatio) {
			// Too wide, adjust width
			targetWidth = Math.round(targetHeight * aspectRatio);
		} else if (currentRatio < aspectRatio) {
			// Too tall, adjust height
			targetHeight = Math.round(targetWidth / aspectRatio);
		}

		// Start with medium quality
		let quality = getOptimalQuality(originalSize, originalSize);

		// Process image
		let processedImage = sharp(inputPath);

		// Resize if needed
		const needsResize = width > targetWidth || height > targetHeight;
		if (needsResize) {
			processedImage = processedImage.resize(targetWidth, targetHeight, {
				fit: 'inside',
				withoutEnlargement: true
			});
		}

		// Convert to JPG with initial quality
		let outputBuffer = await processedImage
			.jpeg({
				quality: quality,
				progressive: true,
				mozjpeg: true  // Better compression
			})
			.toBuffer();

		// If file is still too large, reduce quality
		if (outputBuffer.length > POSTER_CONFIG.thresholds.medium && quality > POSTER_CONFIG.quality.low) {
			quality = POSTER_CONFIG.quality.low;
			outputBuffer = await processedImage
				.jpeg({
					quality: quality,
					progressive: true,
					mozjpeg: true
				})
				.toBuffer();
		}

		// Write optimized file
		writeFileSync(outputPath, outputBuffer);

		// Get final metadata
		const finalMetadata = await sharp(outputBuffer).metadata();
		const compressionRatio = ((originalSize - outputBuffer.length) / originalSize * 100).toFixed(1);

		return {
			success: true,
			originalSize: originalSize,
			finalSize: outputBuffer.length,
			compressionRatio: compressionRatio,
			dimensions: `${finalMetadata.width}x${finalMetadata.height}`,
			originalDimensions: `${width}x${height}`,
			wasResized: needsResize,
			wasConverted: format.toLowerCase() !== 'jpeg',
			quality: quality
		};

	} catch (error) {
		return { success: false, error: error.message };
	}
}

async function processYear(year) {
	const yearDir = join(IMAGES_DIR, year.toString());
	const postersDir = join(yearDir, 'posters');

	if (!existsSync(postersDir)) {
		console.log(`⚠️  No posters directory found for ${year}: ${postersDir}`);
		return { processed: 0, errors: 0 };
	}

	const files = readdirSync(postersDir);
	const imageFiles = files.filter(file =>
		SUPPORTED_FORMATS.includes(extname(file).toLowerCase())
	);

	if (imageFiles.length === 0) {
		console.log(`⚠️  No image files found in ${postersDir}`);
		return { processed: 0, errors: 0 };
	}

	console.log(`\n📁 Processing ${year} (${imageFiles.length} files):`);

	let processed = 0;
	let errors = 0;
	let totalOriginalSize = 0;
	let totalFinalSize = 0;

	for (const file of imageFiles) {
		const inputPath = join(postersDir, file);
		const nameWithoutExt = basename(file, extname(file));
		const outputPath = join(postersDir, `${nameWithoutExt}.jpg`);

		console.log(`  Processing: ${file}`);

		const result = await optimizePoster(inputPath, outputPath);

		if (result.success) {
			let statusLine = `    ✅ Optimized: ${nameWithoutExt}.jpg`;

			// Add dimension info
			if (result.wasResized) {
				statusLine += ` (${result.originalDimensions} → ${result.dimensions})`;
			} else {
				statusLine += ` (${result.dimensions})`;
			}

			// Add quality info
			statusLine += ` [Q${result.quality}]`;

			console.log(statusLine);
			console.log(`    📉 Size: ${(result.originalSize / 1024).toFixed(1)}KB → ${(result.finalSize / 1024).toFixed(1)}KB (${result.compressionRatio}% reduction)`);

			// Remove original if it's a different format
			if (result.wasConverted && inputPath !== outputPath) {
				try {
					unlinkSync(inputPath);
					console.log(`    🗑️  Removed: ${file}`);
				} catch (error) {
					console.log(`    ⚠️  Could not remove original: ${error.message}`);
				}
			}

			totalOriginalSize += result.originalSize;
			totalFinalSize += result.finalSize;
			processed++;
		} else {
			console.log(`    ❌ Failed: ${result.error}`);
			errors++;
		}

		console.log('');
	}

	// Year summary
	if (processed > 0) {
		const yearCompressionRatio = ((totalOriginalSize - totalFinalSize) / totalOriginalSize * 100).toFixed(1);
		console.log(`📊 ${year} Summary:`);
		console.log(`  ✅ Processed: ${processed} files`);
		if (errors > 0) console.log(`  ❌ Errors: ${errors} files`);
		console.log(`  📉 Total compression: ${yearCompressionRatio}%`);
		console.log(`  💾 Total size: ${(totalOriginalSize / 1024).toFixed(1)}KB → ${(totalFinalSize / 1024).toFixed(1)}KB`);
	}

	return { processed, errors, totalOriginalSize, totalFinalSize };
}

async function main() {
	const targetYear = process.argv[2];

	console.log('🎬 Optimizing movie posters...\n');
	console.log('Settings:');
	console.log(`  📏 Max dimensions: ${POSTER_CONFIG.maxWidth}x${POSTER_CONFIG.maxHeight}`);
	console.log(`  🎯 Quality range: ${POSTER_CONFIG.quality.low}-${POSTER_CONFIG.quality.high}`);
	console.log(`  📁 Target format: JPEG`);

	if (!existsSync(IMAGES_DIR)) {
		console.log('❌ Images directory not found:', IMAGES_DIR);
		return;
	}

	let yearsToProcess = [];

	if (targetYear) {
		// Process specific year
		if (!/^\d{4}$/.test(targetYear)) {
			console.log('❌ Invalid year format. Use 4 digits (e.g., 2026)');
			return;
		}
		yearsToProcess = [targetYear];
	} else {
		// Find all year directories
		const items = readdirSync(IMAGES_DIR);
		yearsToProcess = items.filter(item => {
			const itemPath = join(IMAGES_DIR, item);
			return statSync(itemPath).isDirectory() && /^\d{4}$/.test(item);
		}).sort();
	}

	if (yearsToProcess.length === 0) {
		console.log('❌ No year directories found in:', IMAGES_DIR);
		return;
	}

	console.log(`\nFound ${yearsToProcess.length} year(s) to process: ${yearsToProcess.join(', ')}`);

	let totalProcessed = 0;
	let totalErrors = 0;
	let grandTotalOriginal = 0;
	let grandTotalFinal = 0;

	for (const year of yearsToProcess) {
		const result = await processYear(year);
		totalProcessed += result.processed;
		totalErrors += result.errors;
		grandTotalOriginal += result.totalOriginalSize;
		grandTotalFinal += result.totalFinalSize;
	}

	// Final summary
	if (totalProcessed > 0 || totalErrors > 0) {
		const overallCompressionRatio = grandTotalOriginal > 0
			? ((grandTotalOriginal - grandTotalFinal) / grandTotalOriginal * 100).toFixed(1)
			: 0;

		console.log('\n🎉 Optimization Complete!');
		console.log('\n📊 Overall Summary:');
		console.log(`  ✅ Successfully processed: ${totalProcessed} files`);
		if (totalErrors > 0) console.log(`  ❌ Failed: ${totalErrors} files`);
		console.log(`  📉 Overall compression: ${overallCompressionRatio}%`);
		console.log(`  💾 Total size reduction: ${((grandTotalOriginal - grandTotalFinal) / 1024 / 1024).toFixed(2)}MB`);

		if (totalProcessed > 0) {
			console.log('\n💡 Next steps:');
			console.log('  1. Review the optimized poster files');
			console.log('  2. Test the website to ensure images display correctly');
			console.log('  3. Run npm run build to update the production build');
		}
	} else {
		console.log('\n⚠️  No files were processed.');
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