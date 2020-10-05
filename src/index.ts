const elementFactory = function (elementStr: string): HTMLElement {
    // TODO: How to deal with something like 'class=te=st
    // Maybe make a map of attributes? https://www.w3schools.com/tags/ref_attributes.asp
    const commands = elementStr.split('/');
    const topLevelElement = document.createElement(commands[0]);
    commands.shift();
    commands.forEach((commandStr: string) => {
        const attribute = commandStr.split('=')[0];
        const values = commandStr.split('=')[1];
        switch(attribute.toLowerCase()) {
            case 'child':
                // TODO: Create child elements with:
                /*
                ** child=div                    - creates a child <div> element
                ** child=span{class=foo/id=bar} - creates a child <span class="foo" id="bar">
                ** child=li*5                   - creates 5 child <li>
                ** child=li*5{class=test}       - creates 5 child <li class="test">
                ** child=li*5{class=test$$}     - creates 5 child <li class="test1"> where the number increments
                */
                break;
            case 'content':
                topLevelElement.textContent = values;
                break;
            default:
                topLevelElement.setAttribute(attribute, values);
        }
    });
    return topLevelElement;
};
// @ts-ignore cannot find name module
module.exports = elementFactory;
