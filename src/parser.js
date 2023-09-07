function parseHTML(htmlString) {
    const regex = /<(\w+)([^>]*)>([^<]*)<\/\1>/g;
    let match;
    const output = [];
    
    while ((match = regex.exec(htmlString)) !== null) {
        const tag = match[1];
        const attributes = match[2];
        const innerText = match[3].trim();

        const parsedAttributes = parseAttributes(attributes);
        const child = {
            tag,
            ...parsedAttributes,
        };
        if (innerText) {
            child.text = innerText;
        }

        output.push(child);
    }

    return output[0];  // Assuming the root node is always a single element.
}

function parseAttributes(attributes) {
    const styleRegex = /style="([^"]*)"/;
    const idRegex = /id="([^"]*)"/;
    const classRegex = /class="([^"]*)"/;

    const styleMatch = styleRegex.exec(attributes);
    const idMatch = idRegex.exec(attributes);
    const classMatch = classRegex.exec(attributes);

    const output = {};

    if (styleMatch) {
        output.style = parseStyle(styleMatch[1]);
    }

    if (idMatch) {
        output.id = idMatch[1];
    }

    if (classMatch) {
        output.class = classMatch[1];
    }

    return output;
}

function parseStyle(style) {
    const styles = style.split(';').filter(Boolean);
    const parsedStyles = {};

    for (let s of styles) {
        const [property, value] = s.split(':').map(str => str.trim());
        parsedStyles[camelCase(property)] = value;
    }

    return parsedStyles;
}

function camelCase(string) {
    return string.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
}

module.exports = parseHTML;