import themes from './ThemesList'
import Theme from './components/Theme'
import p5 from 'p5'
import h from './framework/h'

const themesHTML = document.getElementById("themes-list")
themesHTML.innerHTML += h('div', {id: 'column-1', class: 'column'}, 
  themes.slice(0, 15)
        .map((theme, idx) => Theme(theme, idx+1))
)
themesHTML.innerHTML += h('div', {id: 'column-2', class: 'column'}, 
  themes.slice(15, 32)
        .map((theme, idx) => Theme(theme, idx+16))
)

const sketch = new p5((p: p5) => {

  const myseed = p.random(999999)

  const drawBackground = () => {
    p.randomSeed(myseed)
    p.background(0)
    for (let i = 0; i < 15; i++) {
      p.ellipse(
        p.random(p.width),
        p.random(p.height),
        p.random(15, 60)
      )
    }
  }

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight)
    drawBackground()
  }

  p.draw = function() {
  }

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
    drawBackground()
  }

})