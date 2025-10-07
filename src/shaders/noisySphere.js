// Realistic Sun Shader with Fractal Noise and Fresnel Effects
export const sunNoiseShader = `
// 3D Random function
float random(in vec3 st) {
    return fract(sin(dot(st, vec3(12.9898, 78.233, 23.112))) * 12943.145);
}

// 3D Noise function with time animation
float noise(in vec3 _pos, in float u_time) {
    vec3 i_pos = floor(_pos);
    vec3 f_pos = fract(_pos);
    
    float i_time = floor(u_time * 0.2);
    float f_time = fract(u_time * 0.2);
    
    // Eight corners of a 3D cube
    float aa = random(i_pos + i_time);
    float ab = random(i_pos + i_time + vec3(1., 0., 0.));
    float ac = random(i_pos + i_time + vec3(0., 1., 0.));
    float ad = random(i_pos + i_time + vec3(1., 1., 0.));
    float ae = random(i_pos + i_time + vec3(0., 0., 1.));
    float af = random(i_pos + i_time + vec3(1., 0., 1.));
    float ag = random(i_pos + i_time + vec3(0., 1., 1.));
    float ah = random(i_pos + i_time + vec3(1., 1., 1.));
    
    // Next time frame
    float ba = random(i_pos + (i_time + 1.));
    float bb = random(i_pos + (i_time + 1.) + vec3(1., 0., 0.));
    float bc = random(i_pos + (i_time + 1.) + vec3(0., 1., 0.));
    float bd = random(i_pos + (i_time + 1.) + vec3(1., 1., 0.));
    float be = random(i_pos + (i_time + 1.) + vec3(0., 0., 1.));
    float bf = random(i_pos + (i_time + 1.) + vec3(1., 0., 1.));
    float bg = random(i_pos + (i_time + 1.) + vec3(0., 1., 1.));
    float bh = random(i_pos + (i_time + 1.) + vec3(1., 1., 1.));
    
    // Smooth interpolation
    vec3 t = smoothstep(0., 1., f_pos);
    float t_time = smoothstep(0., 1., f_time);
    
    // Mix all values
    return mix(
        mix(
            mix(mix(aa,ab,t.x), mix(ac,ad,t.x), t.y),
            mix(mix(ae,af,t.x), mix(ag,ah,t.x), t.y),
            t.z),
        mix(
            mix(mix(ba,bb,t.x), mix(bc,bd,t.x), t.y),
            mix(mix(be,bf,t.x), mix(bg,bh,t.x), t.y),
            t.z),
        t_time);
}

#define NUM_OCTAVES 6

// Fractal Brownian Motion
float fBm(in vec3 _pos, in float sz, in float u_time) {
    float v = 0.0;
    float a = 0.5; // Increased amplitude
    _pos *= sz;
    
    // Rotation angles for animation - made more noticeable
    vec3 angle = vec3(-0.01 * u_time, 0.008 * u_time, 0.012 * u_time);
    mat3 rotx = mat3(1.0, 0.0, 0.0,
                    0.0, cos(angle.x), -sin(angle.x),
                    0.0, sin(angle.x), cos(angle.x));
    mat3 roty = mat3(cos(angle.y), 0.0, sin(angle.y),
                    0.0, 1.0, 0.0,
                    -sin(angle.y), 0.0, cos(angle.y));
    mat3 rotz = mat3(cos(angle.z), -sin(angle.z), 0.0,
                    sin(angle.z), cos(angle.z), 0.0,
                    0.0, 0.0, 1.0);
    
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(_pos, u_time);
        _pos = rotx * roty * rotz * _pos * 2.0;
        a *= 0.6; // Less aggressive falloff
    }
    return v;
}
`;

export const vertexShader = `
uniform float uTime;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vNormalModel;
varying vec3 vNormalView;
varying vec3 vPosition;

void main() {
    vUv = uv;
    vNormal = normalize(mat3(modelMatrix) * normal);
    vNormalModel = normal;
    vNormalView = normalize(normalMatrix * normal);
    vPosition = normalize(vec3(modelViewMatrix * vec4(position, 1.0)).xyz);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const fragmentShader = `
uniform float uTime;
varying vec3 vPosition;
varying vec3 vNormalView;

${sunNoiseShader}

void main() {
    // Scale up the position to make noise patterns more visible
    vec3 st = vPosition * 3.0;
    
    // Generate fractal noise patterns for sun surface with larger scale
    vec3 q = vec3(0.);
    q.x = fBm(st, 2.0, uTime);
    q.y = fBm(st + vec3(1.2, 3.2, 1.52), 2.0, uTime);
    q.z = fBm(st + vec3(0.02, 0.12, 0.152), 2.0, uTime);
    
    // Secondary noise layer for more detail
    float n = fBm(st + q * 0.5 + vec3(1.82, 1.32, 1.09), 3.0, uTime);
    
    // Make noise more pronounced
    n = n * 2.0 - 1.0; // Remap from [0,1] to [-1,1]
    q = q * 2.0 - 1.0;
    
    // Sun surface colors with more contrast
    vec3 darkColor = vec3(0.8, 0.1, 0.0);  // Dark red
    vec3 midColor = vec3(1.0, 0.4, 0.0);   // Orange
    vec3 brightColor = vec3(1.0, 0.9, 0.6); // Bright yellow-white
    
    // Use noise to blend between colors
    float colorMix1 = (n + 1.0) * 0.5; // Remap to [0,1]
    float colorMix2 = (q.x + 1.0) * 0.5;
    
    vec3 color = mix(darkColor, midColor, colorMix1);
    color = mix(color, brightColor, colorMix2 * 0.6);
    
    // Add some turbulence patterns
    float turbulence = abs(n) * abs(q.y) * 2.0;
    color = mix(color, brightColor, turbulence * 0.3);
    
    // Fresnel effects for realistic sun glow
    float fresnelTerm_inner = 0.2 - 0.7 * min(dot(vPosition, vNormalView), 0.0);
    fresnelTerm_inner = pow(fresnelTerm_inner, 3.0);
    
    float fresnelTerm_outer = 1.0 + dot(normalize(vPosition), normalize(vNormalView));
    fresnelTerm_outer = pow(fresnelTerm_outer, 1.5);
    
    float fresnelTerm = fresnelTerm_inner + fresnelTerm_outer;
    
    // Combine surface texture with Fresnel glow
    vec3 finalColor = color * (0.8 + 0.4 * fresnelTerm);
    
    // Add extra glow intensity for sun effect
    float glowIntensity = max(dot(vPosition, vNormalView), 0.0);
    glowIntensity = pow(glowIntensity, 2.0);
    finalColor += vec3(1.0, 0.6, 0.2) * glowIntensity * 0.3;
    
    // Boost overall brightness for sun effect
    finalColor *= 1.4;
    
    gl_FragColor = vec4(finalColor, 1.0);
}
`;