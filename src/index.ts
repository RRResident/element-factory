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
            throw TypeError('Commands need to be of type string or array')
        }
        // Check if the item is a string and is a valid boolean attribute, if so, add the attribute
        const isBooleanAttribute = typeof command === 'string' && booleanAttributes.includes(command);
        if (isBooleanAttribute) {
            topLevelElement.setAttribute(command as string, '');
            return;
        }
        
        // If the command isn't an array, set the attributes to the values on the element
        if (!Array.isArray(command)) {
            // TODO: error handling for invalid attributes and values
            const attribute = command.match(/^[a-zA-z-]*(?==)/)[0];
            const value = command.match(/(^[a-zA-z-]*=)(.*)/)[2];
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
            // The command is an array and therefore describs child elements
            // TODO: add support for incrementation of attribute values
            /*
            ** ['div']                         - creates a child <div> element
            ** ['span', 'class=foo','id=bar']  - creates a child <span class="foo" id="bar">
            ** ['li*5']                        - creates 5 child <li>
            ** ['li*5', 'class=test']          - creates 5 child <li class="test">
            ** ['li*5', 'class=test$$']        - creates 5 child <li class="test1"> where the number increments
            */
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
// @ts-ignore cannot find name module
module.exports = elementFactory;
