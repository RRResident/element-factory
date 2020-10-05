const elementFactory = function (elementStr: string): HTMLElement {
    const commands = elementStr.split('/');
    const topLevelElement = document.createElement(commands[0]);
    commands.shift();
    commands.forEach((commandStr: string) => {
        const attribute = commandStr.split('=')[0];
        const values = commandStr.split('=')[1];
        if (attribute.toLowerCase() === 'child') {
            // Create child elements
        }
        topLevelElement.setAttribute(attribute, values);
    });
    return topLevelElement;
};

console.log(
    elementFactory(
        'div/class=test wide/id=someid/data-name=something'
        )
);

// Include a content which is the textcontent