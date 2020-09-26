import p5 from 'p5'

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