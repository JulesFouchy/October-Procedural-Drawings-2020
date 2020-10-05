import p5 from 'p5'

class Tile {
    p: p5;
    x: number
    y: number
    s: number // side of the square
    t: number // thickness of the tile
    angle: number
    isRotating: boolean
    color: p5.Color
    nextColors: p5.Color[]
  
    constructor(p: p5, xPos: number, yPos: number, size: number) {
      this.p = p
      this.x = xPos
      this.y = yPos
      this.s = size
      this.t = 10
      this.angle = 0
      this.isRotating = false
      this.color = p.color(43, 8, 30)
      this.nextColors = []
    }
  
    public show() {
      this.p.noStroke()
      this.p.push()
      this.p.translate(this.x, this.y)
      this.p.rotateX(this.angle)
      this.p.fill(this.color)
      // Front face
      this.p.quad(+ this.s/2, + this.s/2, this.t/2, 
                  + this.s/2, - this.s/2, this.t/2,
                  - this.s/2, - this.s/2, this.t/2,
                  - this.s/2, + this.s/2, this.t/2,
      )
      if (this.nextColors[0]) {
        // Back face
        this.p.fill(this.nextColors[0])
        this.p.quad(+ this.s/2, + this.s/2, -this.t/2, 
                    + this.s/2, - this.s/2, -this.t/2,
                    - this.s/2, - this.s/2, -this.t/2,
                    - this.s/2, + this.s/2, -this.t/2,
        )
        // Sides
        this.p.fill(255)
        this.p.quad(+ this.s/2, + this.s/2, +this.t/2, 
                    + this.s/2, - this.s/2, +this.t/2,
                    + this.s/2, - this.s/2, -this.t/2,
                    + this.s/2, + this.s/2, -this.t/2,
        )
        this.p.quad(- this.s/2, + this.s/2, +this.t/2, 
                    - this.s/2, - this.s/2, +this.t/2,
                    - this.s/2, - this.s/2, -this.t/2,
                    - this.s/2, + this.s/2, -this.t/2,
        )
        this.p.quad(+ this.s/2, + this.s/2, +this.t/2, 
                    - this.s/2, + this.s/2, +this.t/2,
                    - this.s/2, + this.s/2, -this.t/2,
                    + this.s/2, + this.s/2, -this.t/2,
        )
        this.p.quad(+ this.s/2, - this.s/2, +this.t/2, 
                    - this.s/2, - this.s/2, +this.t/2,
                    - this.s/2, - this.s/2, -this.t/2,
                    + this.s/2, - this.s/2, -this.t/2,
        )
      }
      this.p.pop()
    };
  
    public update() {
      if (this.isRotating) {
        this.angle += this.p.deltaTime * 0.004
        if (this.angle > 3.14159265) {
          this.color = this.nextColors[0]
          this.nextColors.splice(0, 1)
          this.angle = 0
          this.isRotating = this.nextColors.length > 0
        }
      }
    }
  
    public applyColor(color: p5.Color) {
      this.nextColors.push(color)
      this.isRotating = true
    }
  }
  
  class Wave {
    p: p5
    x: number
    y: number
    radius: number
    color: p5.Color
    containedTileLastFrame: boolean[]
    
    constructor(p: p5, x: number, y: number, color: p5.Color, nbTiles: number) {
      this.p = p
      this.x = x
      this.y = y
      this.radius = 0
      this.color = color
      this.containedTileLastFrame = Array(nbTiles).fill(false)
    }
  
    public show() {
      this.p.noFill()
      this.p.stroke(this.color)
      this.p.ellipse(this.x, this.y, this.radius)
    }
  
    public update() {
      this.radius += this.p.deltaTime * 0.1
    }
  
    public contains(tile: Tile, tileIdx: number): boolean {
      this.containedTileLastFrame[tileIdx] = Math.sqrt(Math.pow(this.x-tile.x, 2) + Math.pow(this.y-tile.y, 2)) < this.radius
      return this.containedTileLastFrame[tileIdx]
    }
  
    public containedLastFrame(tile: Tile, tileIdx: number): boolean {
      return this.containedTileLastFrame[tileIdx]
    }
  
    public isFinished(): boolean {
      return Math.sqrt(Math.pow(this.p.width, 2) + Math.pow(this.p.height, 2)) < this.radius
    }
  }
  
  export default (p: p5) => {
  
    let Tiles = []
    let wave: Wave
  
    const pickAColor = (): p5.Color => {
      return p.color(p.random(255), p.random(255), p.random(255))
    }
  
    p.setup = function() {
      p.createCanvas(500, 500, p.WEBGL)
      const N = 5;
      const size = p.width / N
      for (let i = 0; i < N; ++i) {
        for (let j = 0; j < N; ++j) {
          Tiles.push(new Tile(p, i * size - p.width/2 + size/2, j * size - p.width/2 + size/2, size))
        }
      }
    }
  
    p.draw = function() {
      p.background(0)
      Tiles.forEach((tile: Tile, i: number) => {
        tile.update()
        tile.show()
        if (wave) {
          wave.update()
          //wave.show()
          if (!wave.containedLastFrame(tile, i) && wave.contains(tile, i)) {
            tile.applyColor(wave.color)
          }
          if (wave.isFinished()) {
            wave = null
          }
        }
      })
    }
  
    p.mousePressed = function() {
      wave = new Wave(p, p.mouseX - p.width/2, p.mouseY - p.height/2, pickAColor(), Tiles.length)
    }
  
  }