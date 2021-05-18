const details = document.getElementById("Drop");
details.onmouseover = e => {
    if (typeof target == "undefined") {
        details.open = true
    } else {
        details.open = false
    }
}
document.addEventListener('mouseover', (mouseEvent) => {
    if (details.matches(':hover')) {
        return
    }
    details.open = false
})