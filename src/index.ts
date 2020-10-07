import themes from './ThemesList'
import Theme from './components/Theme'
import h from './framework/h'
import Thumbnail from './components/Thumbnail'

import im01 from '../artworks/01.png'

const drawTheme = (theme, idx) => {
  return h('div', 
    {
      class: 'theme-and-thumbnail'
    },
    [
      Array.isArray(theme) ?
        h('a', {href: theme[1]}, Theme(theme[0], idx))
        : Theme(theme, idx)
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