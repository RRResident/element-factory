const elementFactory = function (elementStr: string): void {
    const commands = elementStr.split('/');
    console.log(commands[0]);
};

elementFactory('div/class=test');
