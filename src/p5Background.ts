import p5 from 'p5'
import bgFrag from './background.frag'
import bgVert from './background.vert'

new p5((p: p5) => {

    const myseed = p.random(999999)
    let bgShader: p5.Shader;

    const drawBackground = () => {
        p.shader(bgShader)
        bgShader.setUniform("width",  p.width)
        bgShader.setUniform("height", p.height)
        p.rect(0, 0, p.width, p.height)
    }

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL)
        bgShader = p.createShader(bgVert, bgFrag)
        drawBackground()
    }

    p.draw = function() {
    }

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
        drawBackground()
    }
  
})