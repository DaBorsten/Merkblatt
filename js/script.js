// Mobile Top Bar
let mobileTopBar = document.querySelector('.mobileTopBar')

// Navigationsleiste und Hamburgermenü
let navbar = document.querySelector('.navbar')
let mobileMenu = document.querySelector('.mobileMenu')

// Einstellungen
let settingsMenus = document.querySelectorAll('.settingsMenu')
let settingsContent = document.querySelector('.settingsContent')



// Tabs und Seiten
const tabs = document.querySelectorAll('[data-tab-target]') // Navigationsbuttons / Tabs
const tabContents = document.querySelectorAll('[data-tab-content]') // Tatsächliche Seiten

// Name des aktiven Tabs in Mobile Top Bar anzeigen
let siteName = document.querySelector('#siteName')

// Timer, der Animation und Transition für Menü für gewisse Zeit stoppt beim Resizen
let resizeTimer

// Back to Top
const buttonUp = document.querySelector('.arrowUp')

// Smooth Scrolling
let scrolling

// Color Values
let root = document.querySelector(':root') // Root Element für CSS Variablen

const primaryColor = document.getElementById('primary-color')

// HSL-Werte von Root lesen
let hueValue = getComputedStyle(root).getPropertyValue('--h')
let saturationValue = getComputedStyle(root).getPropertyValue('--s')
let lightnessValue = getComputedStyle(root).getPropertyValue('--l')

/*********************************************************************/
// Settings
/*********************************************************************/

// Defaults

// Wenn nicht zu den Primary Colors in Local Storage steht, dann die Standardwerte im CSS verwenden
if ((localStorage.getItem('primary-hue') === null)
  && (localStorage.getItem('primary-saturation') === null)
  && (localStorage.getItem('primary-lightness') === null)) {

  localStorage.setItem('primary-hue', hueValue)
  localStorage.setItem('primary-saturation', saturationValue)
  localStorage.setItem('primary-lightness', lightnessValue)
  localStorage.setItem('primary-color-hex', '#009970')
}

// Back To Top Button ausblenden
if (localStorage.getItem('back-to-top-button') === null) {
  localStorage.setItem('back-to-top-button', 'true')
}

// Smooth Scrolling for Back To Top Button deaktivieren
if (localStorage.getItem('smooth-scrolling') === null) {
  localStorage.setItem('smooth-scrolling', 'true')
}

// Standardseite ändern
if (localStorage.getItem('default-landingpage') === null) {
  localStorage.setItem('default-landingpage', 'html')
}

/*********************************************************************/
/*********************************************************************/

// Wert der Checkbox im Local Storage auslesen, wenn Seite geladen wird und auf Root anwenden
root.style.setProperty('--h', localStorage.getItem('primary-hue'))
root.style.setProperty('--s', localStorage.getItem('primary-saturation'))
root.style.setProperty('--l', localStorage.getItem('primary-lightness'))
// Hex Wert wird für Color Input gebraucht
primaryColor.value = localStorage.getItem('primary-color-hex')


const backToTopCheckbox = document.getElementById('back-to-top-checkbox')
// Wert der Checkbox im Local Storage auslesen, wenn Seite geladen wird
const backToTopCheckboxValue = localStorage.getItem('back-to-top-button')


const smoothScrollingCheckbox = document.getElementById('smooth-scrolling-checkbox')
// Wert der smoothScrollingCheckbox im Local Storage auslesen, wenn Seite geladen wird
const smoothScrollingCheckboxValue = localStorage.getItem('smooth-scrolling')


const defaultLandingpageSelect = document.getElementById('defaultLandingpageSelect')
// Wert der defaultLandingpageSelect im Local Storage auslesen, wenn Seite geladen wird
const defaultLandingpageSelectValue = localStorage.getItem('default-landingpage')


/**********************************************************************
/*********************************************************************/
// Menü öffnen
function openMenu() {
  closeSettingsMenu()
  if (navbar.getAttribute('data-visible') === "false") {
    navbar.setAttribute('data-visible', "true")
    mobileMenu.setAttribute('data-active', "true")
    document.body.style.overflow = "hidden"
  }
}
/*********************************************************************/
// Menü schließen
function closeMenu() {
  if (navbar.getAttribute('data-visible') === "true") {
    navbar.setAttribute('data-visible', "false")
    mobileMenu.setAttribute('data-active', "false")
    document.body.style.overflow = "scroll"
  }
}
/*********************************************************************/
// Menü öffnen / schließen bei Klick auf Hamburgermenü
mobileMenu.addEventListener('click', () => {
  const visibility = navbar.getAttribute('data-visible')

  if (visibility === "false") {
    openMenu()
  } else if (visibility === "true") {
    closeMenu()
  }
})
/*********************************************************************/
// Wenn Fenst resized wird Animation verhindern und Menü schließen
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper")
  closeMenu()
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper")
  }, 400)
})
/*********************************************************************/
// Menü bei Änderung der Orientierung schließen
window.addEventListener('orientationchange', () => {
  if (screen.width > 768) {
    closeMenu()
  }
})
/*********************************************************************/
// Menü schließen, wenn außerhalb von Seitenleiste oder Mobile Top Bar geklickt wird
document.addEventListener('pointerdown', (e) => {
  if (e.target !== navbar
    && !navbar.contains(e.target)
    && e.target !== mobileTopBar
    && !mobileTopBar.contains(e.target)) {

    closeMenu()
  }
})
/*********************************************************************/
// Zeigt Seite bei Klick auf Button und verteilt active Class
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget)
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('active') // erstmal active Klasse von Seite entfernen
    })
    tabs.forEach(tab => {
      tab.classList.remove('active') // erstmal active Klasse von Navigationsbutton entfernen
    })
    tab.classList.add('active') // dann Klasse an jeweiligen Navigationsbutton vergeben
    target.classList.add('active') // dann Klasse an jeweilige Seite vergeben
    window.scrollTo({ // Immer oben bei Webseite landen
      top: 0,
      behavior: 'auto'
    })

    // Name bei Mobile Top Bar aktualisieren
    changeSiteName()

    // Die Seitenleiste bei Mobile schließen
    closeMenu()

    // Die Settings schließen beim Desktop Mode
    closeSettingsMenu()
  })
})
/*********************************************************************/
// Immer oben bei Webseite landen
window.onbeforeunload = () => {
  window.scrollTo({
    top: 0,
    behavior: 'auto'
  })
}
/*********************************************************************/
// Back to Top Button
window.addEventListener('scroll', () => {
  if ((localStorage.getItem('back-to-top-button') === 'true')) {
    if (window.scrollY > 200) { // nach 200px scrolling soll Button erscheinen
      buttonUp.style.display = 'flex'
    } else { // wenn noch nicht 200px gescrollt, dann Button nicht anzeigen
      buttonUp.style.display = 'none'
    }
  }
})

buttonUp.addEventListener('click', () => {
  window.scrollTo({ // wenn Button gedrückt nach oben scrollen
    top: 0,
    behavior: scrolling
  })
})


/*********************************************************************/
/**************************** Einstellungen **************************/
/*********************************************************************/

// Öffnen / Schließen des Menüs bei Klick auf Zahnrad
settingsMenus.forEach(settingsMenu => {
  settingsMenu.addEventListener('click', () => {
    const visibility = settingsContent.getAttribute('data-visible')

    if (visibility === "false") {
      openSettingsMenu()
    } else if (visibility === "true") {
      closeSettingsMenu()
    }
  })
})
/*********************************************************************/
// Settings Menü öffnen
function openSettingsMenu() {
  closeMenu()
  if (settingsContent.getAttribute('data-visible') === "false") {
    settingsContent.setAttribute('data-visible', "true")
    settingsMenus.forEach(settingsMenu => {
      settingsMenu.setAttribute('data-active', "true")
    })

    settingsContent.scrollTo({ // Immer oben bei den Settings landen
      top: 0,
      behavior: 'auto'
    })

    document.body.style.overflow = "hidden"
  }

  // Namen von Mobile Top Bar auf Wert vom Settingsmenü ändern
  siteName.innerHTML = 'Einstellungen'
}
/*********************************************************************/
// Settings Menü schließen
function closeSettingsMenu() {
  if (settingsContent.getAttribute('data-visible') === "true") {
    settingsContent.setAttribute('data-visible', "false")
    settingsMenus.forEach(settingsMenu => {
      settingsMenu.setAttribute('data-active', "false")
    })
    document.body.style.overflow = "scroll"
  }
  // Namen von Mobile Top Bar wieder auf den Wert davor zurücksetzen
  changeSiteName()
}
/*********************************************************************/
// Werte von HSL
let hue
let saturation
let lightness

// Aktionen nach Color Picker
primaryColor.addEventListener('change', () => {
  HEXtoHSL(primaryColor.value) // Konvertieren
  myFunction_set()
  // Hex Code für Color Picker speichern
  localStorage.setItem('primary-color-hex', primaryColor.value)
})

// Programm zum Umwandeln von Hex zu HSL
function HEXtoHSL(hex) {
  hex = hex.replace(/#/g, '');
  if (hex.length === 3) {
    hex = hex.split('').map(function (hex) {
      return hex + hex;
    }).join('');
  }
  var result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(hex);
  if (!result) {
    return null;
  }
  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;
  if (max == min) {
    h = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = Math.round(l);
  h = Math.round(360 * h);


  hue = h
  saturation = s
  lightness = l
}

function myFunction_set() {
  // Neuen Werte in Local Storage speichern
  localStorage.setItem('primary-hue', hue)
  localStorage.setItem('primary-saturation', saturation + '%')
  localStorage.setItem('primary-lightness', lightness + '%')

  // Diese Werte vom Local Storage auf root anwenden
  root.style.setProperty('--h', localStorage.getItem('primary-hue'))
  root.style.setProperty('--s', localStorage.getItem('primary-saturation'))
  root.style.setProperty('--l', localStorage.getItem('primary-lightness'))
}
/*********************************************************************/
// Back To Top Settings

// Wert der backToTopCheckbox auslesen, wenn sie geklickt wird
backToTopCheckbox.addEventListener('click', () => {
  // Wert der backToTopCheckbox im Local Storage speichern
  localStorage.setItem('back-to-top-button', backToTopCheckbox.checked)

  // Wenn gecheckt, dann Button ausblenden
  if (localStorage.getItem('back-to-top-button') === 'false') {
    buttonUp.style.display = 'none'
  }
})

// Wert der backToTopCheckbox im HTML entsprechend setzen
if (backToTopCheckboxValue === 'true') {
  backToTopCheckbox.checked = true
} else {
  backToTopCheckbox.checked = false
}

// Wenn der Wert der backToTopCheckbox im Local Storage gespeichert ist, div ausblenden
if (backToTopCheckboxValue === 'true') {
  buttonUp.style.display = 'none'
}
/*********************************************************************/
// Smooth Scrolling Settings

// Wert der smoothScrollingCheckbox auslesen, wenn sie geklickt wird
smoothScrollingCheckbox.addEventListener('click', () => {
  // Wert der smoothScrollingCheckbox im Local Storage speichern
  localStorage.setItem('smooth-scrolling', smoothScrollingCheckbox.checked)

  // Wenn gecheckt, dann Smooth Scrolling deaktivieren
  if (localStorage.getItem('smooth-scrolling') === 'false') {
    scrolling = 'auto'
  }
  else {
    scrolling = 'smooth'
  }
})

// Wert der smoothScrollingCheckbox im HTML entsprechend setzen
if (smoothScrollingCheckboxValue === 'true') {
  smoothScrollingCheckbox.checked = true
} else {
  smoothScrollingCheckbox.checked = false
}

// Wenn der Wert der smoothScrollingCheckbox im Local Storage gespeichert ist, div ausblenden
if (smoothScrollingCheckboxValue === 'false') {
  scrolling = 'auto'
} else {
  scrolling = 'smooth'
}


/*********************************************************************/
// Default Landingpage Settings

// Wert der defaultLandingpageSelect auslesen, wenn sie geklickt wird
defaultLandingpageSelect.addEventListener('change', () => {
  // Wert der defaultLandingpageSelect im Local Storage speichern
  localStorage.setItem('default-landingpage', defaultLandingpageSelect.value)

  if (localStorage.getItem('default-landingpage') === 'html') {
  }
  else if (localStorage.getItem('default-landingpage') === 'javascript') {
  }
  else if (localStorage.getItem('default-landingpage') === 'aufgaben') {
  }
})

// Wert der defaultLandingpageSelect im HTML entsprechend setzen
if (defaultLandingpageSelectValue === 'html') { // Wert im LocalStorage
  defaultLandingpageSelect.value = 'html' // Wert im Select setzen

  document.querySelector('.html').classList.add('active')
  document.getElementById('html').classList.add('active')

} else if (defaultLandingpageSelectValue === 'javascript') {
  defaultLandingpageSelect.value = 'javascript'

  document.querySelector('.javascript').classList.add('active')
  document.getElementById('javascript').classList.add('active')

} else if (defaultLandingpageSelectValue === 'aufgaben') {
  defaultLandingpageSelect.value = 'aufgaben'

  document.querySelector('.aufgaben').classList.add('active')
  document.getElementById('aufgaben').classList.add('active')

}

changeSiteName()

function changeSiteName() {
  tabs.forEach(button => {
    if (button.classList.contains('active')) {
      siteName.innerHTML = button.getAttribute('data-top-bar-name')
    }
  })
}