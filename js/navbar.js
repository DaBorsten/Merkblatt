
let navbar = document.querySelector('.navbar')
let mobileMenu = document.querySelector('.mobileMenu')
let body = document.body

mobileMenu.addEventListener('click', () => {
    const visibility = navbar.getAttribute('data-visible')

    if (visibility === "false") {
        openMenu()
    } else if (visibility === "true") {
        closeMenu()
    }
})

window.addEventListener('orientationchange', () => {
    if (screen.width > 800) {
        closeMenu()
    }
})

function openMenu() {
    navbar.setAttribute('data-visible', "true")
    mobileMenu.setAttribute('data-active', "true")
    body.style.overflow = "hidden"
}

function closeMenu() {
    navbar.setAttribute('data-visible', "false")
    mobileMenu.setAttribute('data-active', "false")
    body.style.overflow = "scroll"
}