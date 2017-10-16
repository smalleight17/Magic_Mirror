#version 150

#define SPEED (1./40.)
#define SMOOTH_DIST 0.3
#define PI 3.14159265359

uniform float current_time;
uniform vec2 resolution;
uniform sampler2D baseImg;

out vec4 fragColor;

float random (in vec2 _st) { 
    return fract(sin(dot(_st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

#define NUM_OCTAVES 5

float fbm ( in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(_st);
        _st = rot * _st * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

vec3 cloud(vec2 st){

	// change the speed over time
	float t = current_time * clamp (current_time/20., 0.5, 1);
	float scale = clamp((current_time -5)/6, 0.5, 3.);
	st *= scale;

	vec2 q = vec2(0.);
	q.x = fbm(st + 0. * t);
	q.y = fbm(st + vec2(1.));
	
	vec2 r = vec2(0.);
    r.x = fbm( st + 4.0*q + vec2(1.7,9.2)+ .7* t );
    r.y = fbm( st + 7.0*q + vec2(8.3,2.8)+ 0.126* t);

	/*
	vec2 s = vec2(0.);
	s.x = fbm( st + 7.0*r + vec2(10.7,.2)+ 1.215*current_time );
    s.y = fbm( st + 3.944*r + vec2(.3,12.8)+ 0.16*current_time);
    float f = fbm(st + s + r );
	*/

	float f = fbm(st+r);

	vec3 color = vec3(0.);
    color = mix(vec3(0.445,0.002,0.419), vec3(1.000,0.467,0.174), clamp((f*f),0.2, 1.0));
    color = mix(color, vec3(0.413,0.524,0.880), clamp(q.y,0.480, 0.92));
	
	//increase contrast
    //vec3 color = vec3(r, 1.);
	//color = (color - 0.5) * 4. + 0.2;
	return color * f * 1.9;
}

vec3 radiantLight(vec2 uv){
	//float t = int(current_time) / 40;
    float t = mod(current_time, 40.);
	float dist = length(uv);
    float angle = (atan(uv.y, uv.x) + PI) / (2.0 * PI);
    vec2 uv2 = vec2(dist, angle);
    vec2 lerp_uv = mix(uv, uv2, sin(t));
    vec3 textureDist = texture(baseImg, vec2(current_time * SPEED, angle)).xyz;
	return textureDist;
}


vec3 galaxy( vec2 uv){
	float t = mod(current_time, 40.);
	float dist = length(uv);
	float angle = (atan(uv.y, uv.x) + PI) / (2. * PI);
	vec2 uv2 = vec2(dist, angle);

	vec3 background = texture(baseImg, uv2). xyz;	 
	vec3 textureDist = texture(baseImg, vec2(t * SPEED, angle) ).xyz;
    textureDist *= 0.4;
    textureDist += 0.3;

	vec3 color1 = vec3(0.0,0.0,0.0);
    if (dist < textureDist.x)
        color1.x += smoothstep(0.0,SMOOTH_DIST, textureDist.x - dist);

    if (dist < textureDist.y)
        color1.y += smoothstep(0.0,SMOOTH_DIST, textureDist.y - dist);
    
    if (dist < textureDist.z)
        color1.z += smoothstep(0.0,SMOOTH_DIST, textureDist.z - dist);
    vec3 color2 = vec3(0.0,0.0,0.0);
    if (dist < background.x)
        color2.x += smoothstep(0.0,SMOOTH_DIST, background.x - dist);

    if (dist < background.y )
        color2.y += smoothstep(0.0,SMOOTH_DIST, background.y - dist);
    
    if (dist < background.z)
        color2.z += smoothstep(0.0,SMOOTH_DIST, background.z - dist);

	return color1 + color2;
}


void main(){

	vec2 uv = gl_FragCoord.xy / resolution ;
	float aspectRatio = resolution.x / resolution.y;
	uv -= vec2(.5);
	uv.x *= aspectRatio;

	vec3 color = vec3(0.);
	//color = cloud( uv) ;
	// to-do: crossfade effect
	
	float time1 = 20.;
	float time2 = 30.;
	if (current_time < time1){
		color = cloud( uv) ;
	}else if (current_time < time2){
		color = mix(cloud(uv),radiantLight(uv), (current_time - time1)/5);
	}else{
		color = mix(radiantLight(uv),galaxy(uv), (current_time - time2)/5);
	}
	fragColor = vec4(color,1.0);

}
	