import { createTrip, removeTrip } from '../client/js/request';

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




