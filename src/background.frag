precision mediump float;
varying vec2 vTexCoord;

void main()
{
    vec2 uv = vTexCoord;
    float y = uv.y;
    float t = 1. - pow(4. * y * (1.-y), 10.);
    vec3 col = mix(vec3(0.25, 0.02, 0.05), vec3(0.), pow(y, 0.3));
    
    gl_FragColor = vec4(col, 1.0);
}