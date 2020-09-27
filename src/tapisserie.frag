precision mediump float;

const float dirA = 10. / 180. * 3.1415926536;
const vec2 dir = vec2(cos(dirA), sin(dirA));
const vec2 nor = vec2(-dir.y, dir.x);
const float spacing   = 3.5;
const float thickness = spacing;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

vec3 colByIdx(int idx ) {
    if (idx == 0)
        return vec3(0, 161, 131)  / 255.; // blue
    else if (idx == 1)
        return vec3(255, 233, 59) / 255.; // yellow
    else if (idx == 2)
        return vec3(141, 84, 158) / 255.; // purple
    else
        return vec3(0.);
}

vec3 getCol(float seed) {
  	int idx = int(floor(3.*rand(vec2(seed, 0.))));
    return colByIdx(idx);
}

float line(vec2 p) {
	float d = length(p - dot(p, dir) * dir);
    float t = min(d / thickness, 1.);
    t = max(1. - t*t, 0.);
    return t;
}

vec3 lines(vec2 p) {
    float t = dot(p, nor);
    float id = floor(t / spacing);
    p -= spacing * id * nor;
    return getCol(id) * line(p);
}

void main()
{
    vec2 uv = gl_FragCoord.xy;
    vec3 col = vec3(0.);
    
    col += lines(uv);
    uv.y *= -1.;
    col += lines(uv);
    
    col = pow(col, vec3(2));
    col *= 0.1;
    
    gl_FragColor = vec4(col, 1.0);
}