
let navbar = document.querySelector('.navbar')
let mobileMenu = document.querySelector('.mobileMenu')
let body = document.body

let resizeTimer

mobileMenu.addEventListener('click', () => {
    const visibility = navbar.getAttribute('data-visible')

    if (visibility === "false") {
        openMenu()
    } else if (visibility === "true") {
        closeMenu()
    }
})

window.addEventListener("resize", () => {
    document.body.classList.add("resize-animation-stopper")
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper")
    }, 400)
})

window.addEventListener('resize', () => {
    closeMenu()
})

window.addEventListener('orientationchange', () => {
    if (screen.width > 800) {
        closeMenu()
    }
})

function openMenu() {
    if (navbar.getAttribute('data-visible') === "false") {
        navbar.setAttribute('data-visible', "true")
        mobileMenu.setAttribute('data-active', "true")
        body.style.overflow = "hidden"
    }
}

function closeMenu() {
    if (navbar.getAttribute('data-visible') === "true") {
        navbar.setAttribute('data-visible', "false")
        mobileMenu.setAttribute('data-active', "false")
        body.style.overflow = "scroll"
    }
}