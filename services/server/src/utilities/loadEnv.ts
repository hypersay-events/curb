import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

export function loadEnv() {
  const basePath = path.join(__dirname, '..', '..');
  let prodEnv;
  let devEnv;
  let localEnv;
  const envConfig = dotenv.config().parsed || {};

  const finalConfig: dotenv.DotenvParseOutput = {};

  for (const k in envConfig) {
    finalConfig[k] = envConfig[k];
  }

  if (process.env.NODE_ENV === 'production') {
    try {
      prodEnv = dotenv.parse(
        fs.readFileSync(path.join(basePath, '.env.production')),
      );
      for (const k in prodEnv) {
        finalConfig[k] = prodEnv[k];
      }
    } catch (e) {
      // nothing to do
    }
  } else if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    try {
      devEnv = dotenv.parse(
        fs.readFileSync(path.join(basePath, '.env.development')),
      );
      for (const k in devEnv) {
        finalConfig[k] = devEnv[k];
      }
    } catch (e) {
      // nothing to do
    }
  }

  try {
    localEnv = dotenv.parse(fs.readFileSync(path.join(basePath, '.env.local')));
    for (const k in localEnv) {
      finalConfig[k] = localEnv[k];
    }
  } catch (e) {
    // nothing to do
  }

  for (const k in finalConfig) {
    if (!(k in process.env)) {
      process.env[k] = finalConfig[k];
    }
  }
}
