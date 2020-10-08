const elementFactory = require('../src/index.ts');

test('Can create a simple element', () => {
    const div = elementFactory(['div']);
    expect(div).toBeInstanceOf(HTMLDivElement);
})

test('Throws type error if argument is not a string or array', () => {
    expect(() => {
        elementFactory(1)
    }).toThrow(TypeError);
})

test('Throws type error if array items are invalid value', () => {
    expect(() => {
        elementFactory([1])
    }).toThrow(TypeError);
})

test('Can create an element with multiple attributes and content', () => {
    const div = elementFactory(['div', 'class=c', 'data-test=d', 'text=t'])
    expect(div.className).toBe('c');
    expect(div.dataset.test).toBe('d');
    expect(div.textContent).toBe('t');
})

test('Can accept boolean attributes', () => {
    const input = elementFactory(['input', 'disabled']);
    expect(input.disabled).toBeTruthy();
})

test('Single string invalid boolean arributes throw type error', () => {
    expect(() => {
        elementFactory(['div', 'invalidattribute']);
    }).toThrow(TypeError);
})

test('Throws type error if cannot pull out a valid attribute', () => {
    expect(() => {
        elementFactory(['div', '.=.']);
    }).toThrow(TypeError);
})

test('Can set inner HTML', () => {
    const div = elementFactory(['div', 'html=<span></span>']);
    expect(div.children[0]).toBeInstanceOf(HTMLSpanElement);
})

test('Can create an element with a child', () => {
    const ul = elementFactory(['ul', ['li']]);
    expect(ul.children[0]).toBeInstanceOf(HTMLLIElement);
})

test('Can create an element with a given amount of children', () => {
    const ul = elementFactory(['ul', ['li*5']]);
    expect(ul.children.length).toBe(5);
})

test('Can create an element with a grandchild', () => {
    const grandparent = elementFactory(['div', ['div', ['div', 'class=grandchild']]]);
    expect(grandparent.children[0].children[0].className).toBe('grandchild');
})