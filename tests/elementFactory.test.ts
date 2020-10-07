const elementFactory = require('../src/index');

test('Can create a simple element', () => {
    const div = elementFactory('div');
    expect(div).toBeInstanceOf(HTMLDivElement);
})