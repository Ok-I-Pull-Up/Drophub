/**
 * Skrypt do optymalizacji obrazów w projekcie DropHub
 *
 * Ten skrypt konwertuje obrazy PNG/JPG do formatu WebP, optymalizuje je
 * i tworzy różne rozmiary dla responsywnego wyświetlania
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { execSync } = require('child_process');

// Ścieżki do folderów
const SOURCE_DIR = path.join(__dirname, '..', 'public');
const OPTIMIZED_DIR = path.join(__dirname, '..', 'public', 'optimized');
const LOGO_DIR = path.join(__dirname, '..', 'public');

// Upewnij się, że folder docelowy istnieje
if (!fs.existsSync(OPTIMIZED_DIR)) {
	fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });
}

// Funkcja do generowania blurhash dla obrazu
// Aby używać tej funkcji, najpierw zainstaluj: npm install blurhash sharp
async function generateBlurhash(imagePath) {
	try {
		// Użyj node-blurhash jeśli jest dostępny, inaczej zwróć domyślny hash
		const { encode } = require('blurhash');
		const sharp = require('sharp');

		const { data, info } = await sharp(imagePath)
			.raw()
			.ensureAlpha()
			.resize(32, 32, { fit: 'inside' })
			.toBuffer({ resolveWithObject: true });

		return encode(data, info.width, info.height, 4, 4);
	} catch (err) {
		console.error('Błąd generowania blurhash:', err);
		// Zwróć domyślny blurhash, który wygląda jak szaro-niebieski gradient
		return 'LEHV6nWB2yk8pyo0adR*.7kCMdnj';
	}
}

// Funkcja do optymalizacji obrazu za pomocą Sharp
async function optimizeWithSharp(sourcePath, outputDir, options = {}) {
	try {
		const sharp = require('sharp');
		const filename = path.basename(sourcePath);
		const fileBaseName = path.basename(filename, path.extname(filename));

		// Domyślne opcje
		const opts = {
			quality: 85,
			width: null,
			height: null,
			...options,
		};

		// Wczytaj obrazek
		let sharpInstance = sharp(sourcePath);

		// Jeśli podano wymiary, zmień rozmiar
		if (opts.width || opts.height) {
			sharpInstance = sharpInstance.resize(opts.width, opts.height);
		}

		// Zapisz jako PNG zoptymalizowany
		await sharpInstance
			.png({ quality: opts.quality })
			.toFile(path.join(outputDir, `${fileBaseName}${opts.suffix || ''}.png`));

		// Zapisz jako WebP
		await sharpInstance
			.webp({ quality: opts.quality })
			.toFile(path.join(outputDir, `${fileBaseName}${opts.suffix || ''}.webp`));

		console.log(`Zoptymalizowano ${filename} do formatu PNG i WebP`);
		return true;
	} catch (err) {
		console.error(`Błąd optymalizacji z Sharp:`, err);
		return false;
	}
}

// Funkcja do optymalizacji obrazu za pomocą natywnych narzędzi (alternatywa)
function optimizeWithNative(sourcePath, outputDir) {
	try {
		const filename = path.basename(sourcePath);
		const outputPath = path.join(outputDir, filename);

		// Kopiuj plik (możesz tutaj użyć narzędzi systemowych)
		fs.copyFileSync(sourcePath, outputPath);

		console.log(`Skopiowano ${filename} (bez optymalizacji)`);
		return true;
	} catch (err) {
		console.error('Błąd podczas kopiowania pliku:', err);
		return false;
	}
}

// Funkcja do optymalizacji logo
async function optimizeLogo() {
	try {
		const logoSizes = [192, 96, 48];
		const logoFiles = ['logo192.png', 'logo512.png'];

		for (const logoFile of logoFiles) {
			const logoPath = path.join(LOGO_DIR, logoFile);

			if (!fs.existsSync(logoPath)) {
				console.warn(`Logo ${logoFile} nie istnieje. Pomijam.`);
				continue;
			}

			// Spróbuj użyć Sharp do optymalizacji
			const sharpSuccess = await optimizeWithSharp(logoPath, OPTIMIZED_DIR);

			// Jeśli Sharp zawiedzie, użyj alternatywnej metody
			if (!sharpSuccess) {
				optimizeWithNative(logoPath, OPTIMIZED_DIR);
			}

			// Tworzenie różnych rozmiarów logo
			for (const size of logoSizes) {
				const baseName = path.basename(logoFile, path.extname(logoFile));
				if (size >= parseInt(baseName.replace('logo', ''))) continue;

				try {
					// Optymalizuj z konkretnym rozmiarem
					await optimizeWithSharp(logoPath, OPTIMIZED_DIR, {
						width: size,
						height: size,
						suffix: size,
					});

					console.log(`Utworzono logo${size}.png i logo${size}.webp`);
				} catch (err) {
					console.error(`Błąd przetwarzania logo${size}:`, err);
				}
			}

			// Wygeneruj blurhash dla logo
			try {
				const blurhash = await generateBlurhash(logoPath);

				// Zapisz blurhash do pliku JSON
				const blurhashFilePath = path.join(OPTIMIZED_DIR, 'blurhash.json');
				let existingData = {};

				if (fs.existsSync(blurhashFilePath)) {
					existingData = JSON.parse(fs.readFileSync(blurhashFilePath, 'utf8'));
				}

				existingData[logoFile] = blurhash;

				fs.writeFileSync(
					blurhashFilePath,
					JSON.stringify(existingData, null, 2),
					'utf8'
				);

				console.log(`Wygenerowano blurhash dla ${logoFile}: ${blurhash}`);
			} catch (err) {
				console.error(`Błąd generowania blurhash dla ${logoFile}:`, err);
			}
		}
	} catch (err) {
		console.error('Błąd podczas optymalizacji logo:', err);
	}
}

// Główna funkcja
async function main() {
	try {
		console.log('Rozpoczynam optymalizację obrazów...');

		// Optymalizuj logo
		await optimizeLogo();

		console.log('Optymalizacja obrazów zakończona pomyślnie!');
	} catch (err) {
		console.error('Błąd podczas optymalizacji obrazów:', err);
		process.exit(1);
	}
}

// Uruchom główną funkcję
main();
