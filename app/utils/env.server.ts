import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const ENV = {
  SHOPIFY_STOREFRONT_API_URL: process.env.SHOPIFY_STOREFRONT_API_URL || '',
  SHOPIFY_STOREFRONT_API_TOKEN: process.env.SHOPIFY_STOREFRONT_API_TOKEN || '',
  SHOPIFY_ADMIN_API_TOKEN: process.env.SHOPIFY_ADMIN_API_TOKEN || '',
  SHOPIFY_ADMIN_API_URL: process.env.SHOPIFY_ADMIN_API_URL || '',
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || ''
};

// Validación de variables requeridas
const requiredEnvVars = [
  'SHOPIFY_STOREFRONT_API_URL',
  'SHOPIFY_STOREFRONT_API_TOKEN',
  'SHOPIFY_ADMIN_API_TOKEN',
  'SHOPIFY_ADMIN_API_URL',
  'SMTP_USER',
  'SMTP_PASS',
];

for (const envVar of requiredEnvVars) {
  if (!ENV[envVar as keyof typeof ENV]) {
    throw new Error(`Variable de entorno requerida ${envVar} no está definida`);
  }
}

export default ENV; 

