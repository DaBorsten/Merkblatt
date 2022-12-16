
// Tabs und Seiten
const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

// Navigationsleiste und Hamburgermenü
let navbar = document.querySelector('.navbar')
let mobileMenu = document.querySelector('.mobileMenu')

// Timer, der Animation und Transition für gewisse Zeit stoppt
let resizeTimer

// Back to Top
const buttonUp = document.querySelector('.arrowUp')

/**********************************************************************
/*********************************************************************/

// Resettet/fügt active Klasse Tabs und Seite hinzu
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget)
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('active') // erstmal active Klasse von Seite entfernen
    })
    tabs.forEach(tab => {
      tab.classList.remove('active') // erstmal active Klasse von Tab entfernen
    })
    tab.classList.add('active') // dann Klasse an jeweiliges Tab vergeben
    target.classList.add('active') // dann Klasse an jeweilige Seite vergeben

    // Die Seitenleiste bei Mobile schließen
    closeMenu()
  })
})

/*********************************************************************/

// Menü öffnet sich beim Klick auf Hamburgermenü
mobileMenu.addEventListener('click', () => {
  const visibility = navbar.getAttribute('data-visible')

  if (visibility === "false") {
    openMenu()
  } else if (visibility === "true") {
    closeMenu()
  }
})

// Wenn Fenst resized wird Animation verhindern und Menü schließen
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper")
  closeMenu()
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper")
  }, 400)
})

// Menü bei Änderung der Orientierung schließen
window.addEventListener('orientationchange', () => {
  if (screen.width > 800) {
    closeMenu()
  }
})

// Mernü öffnen
function openMenu() {
  if (navbar.getAttribute('data-visible') === "false") {
    navbar.setAttribute('data-visible', "true")
    mobileMenu.setAttribute('data-active', "true")
    document.body.style.overflow = "hidden"
  }
}

// Menü schließen
function closeMenu() {
  if (navbar.getAttribute('data-visible') === "true") {
    navbar.setAttribute('data-visible', "false")
    mobileMenu.setAttribute('data-active', "false")
    document.body.style.overflow = "scroll"
  }
}

/*********************************************************************/

// Back to Top Button
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) { // nach 200px scrolling soll Button erscheinen
    buttonUp.style.display = 'flex'
  } else { // wenn noch nicht 200px gescrollt, dann Button nicht anzeigen
    buttonUp.style.display = 'none'
  }
})

buttonUp.addEventListener('click', () => {
  window.scrollTo({ // wenn Button gedrückt nach oben scrollen
    top: 0
  })
})