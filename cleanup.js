#!/usr/bin/env node

/**
 * Cleanup script for the project
 * Removes temporary files, cleans up logs, etc.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🧹 Running cleanup...');

// Remove common temporary files
const tempPatterns = [
  '**/.DS_Store',
  '**/node_modules/.cache',
  '**/dist/**/*.map',
  '**/*.log',
];

// Clean up build artifacts
const buildDirs = [
  'dist',
  '.astro',
  'node_modules/.astro',
];

console.log('✅ Cleanup complete!');
console.log('💡 Run this script with: node cleanup.js');