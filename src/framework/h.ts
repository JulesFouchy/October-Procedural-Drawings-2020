export default (tag, props, children) => {
    let html = "<" + tag 
    for (const [key, value] of Object.entries(props)) {
        html += " " + key + "=\"" + value + "\""
    }
    html += ">"
    if (children) {
        if (Array.isArray(children)) {
            children.forEach(child => {
                html += child
            })
        }
        else {
            html += children
        }
    }
    html += "</" + tag + ">"
    return html
}