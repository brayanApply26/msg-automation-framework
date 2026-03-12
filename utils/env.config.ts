import * as dotenv from 'dotenv';
import * as path from 'node:path';

// Load the correct .env file based on TEST_ENV variable
// Usage: TEST_ENV=dev | staging | prod (defaults to prod)
const environment = process.env.TEST_ENV ?? 'prod';
const envFile = path.resolve(process.cwd(), `.env.${environment}`);

dotenv.config({ path: envFile });

console.log(`\n🌍 Running tests against environment: [${environment.toUpperCase()}] → ${process.env.BASE_URL ?? 'https://www.whitestuff.com'}\n`);

export const ENV = {
    environment,
    baseURL:      process.env.BASE_URL          ?? 'https://www.whitestuff.com',
    guestEmail:   process.env.GUEST_EMAIL        ?? 'test.test@test1234.com',
    firstName:    process.env.TEST_FIRST_NAME    ?? 'Test',
    lastName:     process.env.TEST_LAST_NAME     ?? 'Test',
    phone:        process.env.TEST_PHONE         ?? '8888888',
    postcode:     process.env.TEST_POSTCODE      ?? 'SW1A 1AA',
    addressLine1: process.env.TEST_ADDRESS_LINE1 ?? 'Test',
    addressLine2: process.env.TEST_ADDRESS_LINE2 ?? 'Test',
    city:         process.env.TEST_CITY          ?? 'Test',
    cardNumber:   process.env.CARD_NUMBER        ?? '4242424242424242',
    cardExpiry:   process.env.CARD_EXPIRY        ?? '09/27',
    cardCvv:      process.env.CARD_CVV           ?? '333',
};

