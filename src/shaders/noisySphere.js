// PSRD Noise implementation - Thanks https://github.com/stegu/psrdnoise !!!
export const psrdnoise = `
vec4 permute(vec4 i) {
    vec4 im = mod(i, 289.0);
    return mod(((im*34.0)+10.0)*im, 289.0);
}

float psrdnoise(vec3 x, vec3 period, float alpha, out vec3 gradient) {
    const mat3 M = mat3(0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0);
    const mat3 Mi = mat3(-0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5);
    
    vec3 uvw = M * x;
    vec3 i0 = floor(uvw), f0 = fract(uvw);
    vec3 g_ = step(f0.xyx, f0.yzz), l_ = 1.0 - g_;
    vec3 g = vec3(l_.z, g_.xy), l = vec3(l_.xy, g_.z);
    vec3 o1 = min(g, l), o2 = max(g, l);
    vec3 i1 = i0 + o1, i2 = i0 + o2, i3 = i0 + vec3(1.0);
    vec3 v0 = Mi * i0, v1 = Mi * i1, v2 = Mi * i2, v3 = Mi * i3;
    vec3 x0 = x - v0, x1 = x - v1, x2 = x - v2, x3 = x - v3;
    
    if(any(greaterThan(period, vec3(0.0)))) {
        vec4 vx = vec4(v0.x, v1.x, v2.x, v3.x);
        vec4 vy = vec4(v0.y, v1.y, v2.y, v3.y);
        vec4 vz = vec4(v0.z, v1.z, v2.z, v3.z);
        if(period.x > 0.0) vx = mod(vx, period.x);
        if(period.y > 0.0) vy = mod(vy, period.y);
        if(period.z > 0.0) vz = mod(vz, period.z);
        i0 = floor(M * vec3(vx.x, vy.x, vz.x) + 0.5);
        i1 = floor(M * vec3(vx.y, vy.y, vz.y) + 0.5);
        i2 = floor(M * vec3(vx.z, vy.z, vz.z) + 0.5);
        i3 = floor(M * vec3(vx.w, vy.w, vz.w) + 0.5);
    }
    
    vec4 hash = permute(permute(permute(vec4(i0.z, i1.z, i2.z, i3.z)) + vec4(i0.y, i1.y, i2.y, i3.y)) + vec4(i0.x, i1.x, i2.x, i3.x));
    vec4 theta = hash * 3.883222077;
    vec4 sz = hash * -0.006920415 + 0.996539792;
    vec4 psi = hash * 0.108705628;
    vec4 Ct = cos(theta), St = sin(theta);
    vec4 sz_prime = sqrt(1.0 - sz*sz);
    vec4 gx, gy, gz;
    
    if(alpha != 0.0) {
        vec4 px = Ct * sz_prime, py = St * sz_prime, pz = sz;
        vec4 Sp = sin(psi), Cp = cos(psi), Ctp = St*Sp - Ct*Cp;
        vec4 qx = mix(Ctp*St, Sp, sz), qy = mix(-Ctp*Ct, Cp, sz);
        vec4 qz = -(py*Cp + px*Sp);
        vec4 Sa = vec4(sin(alpha)), Ca = vec4(cos(alpha));
        gx = Ca*px + Sa*qx; 
        gy = Ca*py + Sa*qy; 
        gz = Ca*pz + Sa*qz;
    } else {
        gx = Ct * sz_prime; 
        gy = St * sz_prime; 
        gz = sz;
    }
    
    vec3 g0 = vec3(gx.x, gy.x, gz.x), g1 = vec3(gx.y, gy.y, gz.y);
    vec3 g2 = vec3(gx.z, gy.z, gz.z), g3 = vec3(gx.w, gy.w, gz.w);
    vec4 w = 0.5-vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3));
    w = max(w, 0.0); 
    vec4 w2 = w * w, w3 = w2 * w;
    vec4 gdotx = vec4(dot(g0,x0), dot(g1,x1), dot(g2,x2), dot(g3,x3));
    float n = dot(w3, gdotx);
    vec4 dw = -6.0 * w2 * gdotx;
    vec3 dn0 = w3.x * g0 + dw.x * x0;
    vec3 dn1 = w3.y * g1 + dw.y * x1;
    vec3 dn2 = w3.z * g2 + dw.z * x2;
    vec3 dn3 = w3.w * g3 + dw.w * x3;
    gradient = 39.5 * (dn0 + dn1 + dn2 + dn3);
    return 39.5 * n;
}
`;

export const vertexShader = `
uniform float uTime;
uniform float uCoordScale1;
uniform float uDisplacementScale;
varying vec3 vPosition;
varying vec3 vNormal;

${psrdnoise}

void main() {
    vPosition = position;
    
    vec3 grad;
    float d = psrdnoise(position * uCoordScale1 + uTime * vec3(0.1, 0.123, 0.134), vec3(240.0), 4.0 * uTime, grad);
    grad *= 2.0;
    
    vec3 transformed = position + uDisplacementScale * d * normal;
    vec3 N_ = grad - dot(grad, normal) * normal;
    vNormal = normal - uDisplacementScale * N_;
    vNormal = normalize(vNormal);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
`;

export const fragmentShader = `
uniform mat4 modelViewMatrix;
uniform float uTime;
uniform float uCoordScale2;
uniform float uCoordScale3;
uniform float uCoordScale4;
uniform float uBumpScale;
varying vec3 vPosition;
varying vec3 vNormal;

${psrdnoise}

void main() {
    // Bump mapping with multiple noise layers
    vec3 grad = vec3(0.0);
    vec3 gradtemp = vec3(0.0);
    
    float bump = psrdnoise(vPosition * uCoordScale2 + uTime * vec3(0.5, 0.7, 0.6), vec3(240.0), 0.0, grad);
    grad *= 10.0;
    
    bump += 0.5 * psrdnoise(vPosition * uCoordScale3 + 0.02 * grad + uTime * vec3(-0.7, -0.6, 0.5), vec3(240.0), 0.0, gradtemp);
    grad = 10.0 * gradtemp;
    
    bump += 0.25 * psrdnoise(vPosition * uCoordScale4 + uTime * vec3(-0.6, -0.5, -0.7), vec3(240.0), 0.0, gradtemp);
    grad += 10.0 * gradtemp;
    
    bump *= 0.2;
    grad *= 0.2;
    
    // Calculate normal with bump mapping
    vec3 N_ = grad - dot(grad, vNormal) * vNormal;
    vec3 normal = vNormal - uBumpScale * N_;
    normal = normalize(normal);
    normal = mat3(modelViewMatrix) * normal;
    
    // Create a nice gradient color based on position and noise
    vec3 color1 = vec3(0.6, 0.35, 0.7); // Purple
    vec3 color2 = vec3(0.2, 0.6, 0.9);  // Blue
    vec3 color3 = vec3(0.9, 0.4, 0.6);  // Pink
    
    float mixFactor1 = (bump + 1.0) * 0.5;
    float mixFactor2 = (sin(uTime * 2.0 + vPosition.x * 3.0) + 1.0) * 0.5;
    
    vec3 baseColor = mix(color1, color2, mixFactor1);
    baseColor = mix(baseColor, color3, mixFactor2 * 0.3);
    
    // Simple lighting calculation
    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
    float NdotL = max(dot(normal, lightDir), 0.0);
    
    vec3 finalColor = baseColor * (0.3 + 0.7 * NdotL);
    
    gl_FragColor = vec4(finalColor, 1.0);
}
`;