const elementFactory = require('../src/index.ts');

test('Can create a simple element', () => {
    const div = elementFactory('div');
    expect(div).toBeInstanceOf(HTMLDivElement);
})

test('Throws type error if value is not a string or array', () => {
    // ...
})