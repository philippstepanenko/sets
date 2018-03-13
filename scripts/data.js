var data = {
    select: {
        tag: "select",
        onchange: "execute()"
    },
    input: {
        tag: "input",
        type: "text",
        onkeydown: "resize(this)",
        onkeyup: "resize(this)"
    },
    button: {
        tag: "button"
    },
    button_del: {
        tag: "button",
        class: "del",
        onclick: "del(this)",
        html: "x" //✘, ☓
    },
    div: {
        tag: "div"
    },
    option: {
        tag: "option"
    },
    a: {
        tag: "a"
    },
    b: {
        tag: "b"
    },
    br: {
        tag: "br"
    }
};