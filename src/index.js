var elementFactory = function (elementStr) {
    var commands = elementStr.split('/');
    console.log(commands[0]);
};
elementFactory('div/class=test');
