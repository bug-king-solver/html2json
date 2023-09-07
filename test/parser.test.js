const parseHTML = require('../src/parser');

test('converts basic HTML to object', () => {
    const html = '<div style="background-color: yellow">Hello, World</div>';
    const expected = {
        tag: 'div',
        text: 'Hello, World',
        style: {
            backgroundColor: 'yellow'
        }
    };
    expect(parseHTML(html)).toEqual(expected);
});