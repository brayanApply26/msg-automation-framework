import * as dotenv from 'dotenv';
dotenv.config();

export const ENV = {
    baseURL:      process.env.BASE_URL      ?? 'https://www.whitestuff.com',
    guestEmail:   process.env.GUEST_EMAIL   ?? 'test.test@test1234.com',
    firstName:    process.env.TEST_FIRST_NAME ?? 'Test',
    lastName:     process.env.TEST_LAST_NAME  ?? 'Test',
    phone:        process.env.TEST_PHONE      ?? '8888888',
    postcode:     process.env.TEST_POSTCODE   ?? 'SW1A 1AA',
    addressLine1: process.env.TEST_ADDRESS_LINE1 ?? 'Test',
    addressLine2: process.env.TEST_ADDRESS_LINE2 ?? 'Test',
    city:         process.env.TEST_CITY       ?? 'Test',
    cardNumber:   process.env.CARD_NUMBER     ?? '4242424242424242',
    cardExpiry:   process.env.CARD_EXPIRY     ?? '09/27',
    cardCvv:      process.env.CARD_CVV        ?? '333',
};
