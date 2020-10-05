var elementFactory = function (elementStr) {
    var commands = elementStr.split('/');
    var topLevelElement = document.createElement(commands[0]);
    commands.shift();
    commands.forEach(function (commandStr) {
        var attribute = commandStr.split('=')[0];
        var values = commandStr.split('=')[1];
        switch (attribute.toLowerCase()) {
            case 'child':
                // Create child elements
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
// export default elementFactory;
