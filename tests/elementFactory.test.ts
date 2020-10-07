const elementFactory = require('../src/index.ts');

test('Can create a simple element', () => {
    const div = elementFactory('div');
    expect(div).toBeInstanceOf(HTMLDivElement);
})