import { createTrip, removeTrip, getCountdown } from '../client/js/request';

describe('Testing the createTrip function', () => {

    test('Testing createTrip() , is it defined?', async () => {
        expect(createTrip).toBeDefined();
    });

    test('Testing the createTrip(), is it function?', async () => {
        expect(typeof createTrip).toBe('function');
    });

});

describe('Testing the removeTrip function', () => {

    test('Testing removeTrip() , is it defined?', async () => {
        expect(removeTrip).toBeDefined();
    });

    test('Testing the removeTrip(), is it function?', async () => {
        expect(typeof removeTrip).toBe('function');
    });

});



describe('Testing the getCountdown function', () => {

    test('Testing getCountdown() , is it defined?', async () => {
        expect(getCountdown).toBeDefined();
    });

    test('Testing the getCountdown(), is it function?', async () => {
        expect(typeof getCountdown).toBe('function');
    });

    test('Testing the getCountdown(), is it return number?', async () => {
        expect(typeof getCountdown('2020-12-20')).toBe('number');
    });
});


