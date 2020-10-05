var elementFactory = function (elementStr) {
    var commands = elementStr.split('/');
    var topLevelElement = document.createElement(commands[0]);
    commands.shift();
    commands.forEach(function (commandStr) {
        var attribute = commandStr.split('=')[0];
        var values = commandStr.split('=')[1];
        if (attribute.toLowerCase() === 'child') {
            // Create child elements
        }
        topLevelElement.setAttribute(attribute, values);
    });
    return topLevelElement;
};
console.log(elementFactory('div/class=test wide/id=someid/data-name=something'));
// Include a content which is the textcontent
