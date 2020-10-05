import themes from './ThemesList'
import Theme from './components/Theme'
import h from './framework/h'
import Thumbnail from './components/Thumbnail'
import p5 from 'p5'

import im01 from '../artworks/01.png'
import p505 from '../artworks/05_Monochromatic'

const drawTheme = (theme, idx) => {
  return h('div', 
    {
      class: 'theme-and-thumbnail'
    },
    [
      Theme(theme, idx),
      //idx == 1 ? Thumbnail(im01) : ''
    ]
  )
}

const themesHTML = document.getElementById("themes-list")
themesHTML.innerHTML += h('div', {id: 'column-1', class: 'column'}, 
  themes.slice(0, 15)
        .map((theme, idx) => drawTheme(theme, idx+1))
)
themesHTML.innerHTML += h('div', {id: 'column-2', class: 'column'}, 
  themes.slice(15, 32)
        .map((theme, idx) => drawTheme(theme, idx+16))
)

new p5(p505)