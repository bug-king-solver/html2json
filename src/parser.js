function parseHTML(htmlString) {
    const regex = /<(\w+)([^>]*)>([\s\S]*?)<\/\1>/g;
    let match;
    let output = null;

    const children = [];

    while ((match = regex.exec(htmlString)) !== null) {
        const tag = match[1];
        const attributes = match[2];
        const innerContent = match[3].trim();
        const parsedAttributes = parseAttributes(attributes);

        const child = {
            tag,
            ...parsedAttributes
        };

        // Check if innerContent has other tags or is just text
        if (/<(\w+)([^>]*)>([\s\S]*?)<\/\1>/.test(innerContent)) {
            child.children = parseHTML(innerContent);
        } else {
            child.text = innerContent;
        }

        children.push(child);
    }

    if (children.length === 1 && !output) {
        output = children[0];
    } else {
        output = { children };
    }

    // Extract any text that's outside of child tags
    const remainingText = htmlString.replace(regex, '').trim();
    if (remainingText) {
        output.text = remainingText;
    }

    return output;
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