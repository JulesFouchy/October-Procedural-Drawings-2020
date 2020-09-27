precision mediump float;
varying vec2 vTexCoord;

void main()
{
    float t = vTexCoord.y;
    vec3 col = mix(vec3(0.25, 0.02, 0.05), vec3(0.), pow(t, 0.3));
    
    gl_FragColor = vec4(col, 1.0);
}