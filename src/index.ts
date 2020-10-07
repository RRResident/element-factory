export {};

const booleanAttributes = [
    "allowfullscreen",
    "allowpaymentrequest",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "defer",
    "disabled",
    "formnovalidate",
    "hidden",
    "ismap",
    "itemscope",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "readonly",
    "required",
    "reversed",
    "selected",
    "typemustmatch"
];

const elementFactory = function (...commands: string[]): HTMLElement {
    // Create the top level element from the first item in the array
    const topLevelElement = document.createElement(commands.shift());
    commands.forEach((command: string | string[]) => {
        // Throw an error if type of command is invalid
        if (typeof command !== 'string' && !Array.isArray(command)) {
            throw TypeError(`Commands need to be of type string or array, you supplied: ${typeof command}`)
        }
        console.log('fr');
        

        // If the command isn't an array, set the attributes to the values on the element
        if (!Array.isArray(command)) {
            // Check if the command is a single string, and if so, it is a valid boolean attribute
            const isSingleString = !command.split('').includes('=');
            const isBooleanAttribute = booleanAttributes.includes(command);
            if (isSingleString && isBooleanAttribute) {
                topLevelElement.setAttribute(command, '');
                return;
            } else if (isSingleString) {
                throw TypeError(`Command ${command} is not a valid boolean attribute, and has no '=value'`);
            }

            const attribute = command.match(/^[a-zA-z-]*(?==)/)[0];
            if (!attribute) {
                throw TypeError(`Attribute from ${command} is invalid, it should be formatted as 'attribute=value'`);
            }
            let value = command.match(/(^[a-zA-z-]*=)(.*)/)[2];

            switch(attribute.toLowerCase()) {
                case 'text':
                    topLevelElement.textContent = value;
                    break;
                case 'html':
                    topLevelElement.innerHTML = value;
                    break;
                default:
                    topLevelElement.setAttribute(attribute, value);
                }
        } else {
            if (!command[0].match(/\*/)) {
               // If no duplicate child elements, create the child element with elementFactory and append it to the top level element
                const childElement = elementFactory(...command);
                topLevelElement.appendChild(childElement);
            } else {
               // If duplicate elements, create the required amount with elementFactory and append them all to the top level element
                const numberOfChildren = Number(command[0].match(/\*(\d*)/)[1]);
                const tag = command[0].match(/[a-z-]*(?=\*)/)[0];
                command.shift();
                command.unshift(tag);
                for (let i = 0; i < numberOfChildren; i++) {
                const childElement = elementFactory(...command);
                topLevelElement.appendChild(childElement);
                }
            }
        }
    });
    return topLevelElement;
};

module.exports = elementFactory;
