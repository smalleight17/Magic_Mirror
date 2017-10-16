#version 150

#define PI 3.14159265

uniform float iTime;
uniform vec2 iResolution;
uniform sampler2D FL_black;

out vec4 fragColor;

vec3 heartBeat(vec2 st){
	float scale = sin(iTime*3.5);
	scale = clamp(scale, 0.9, 1.);
	float temp = scale;
	scale = 1.9 - scale;
	scale /= 0.9;
	st = st * scale + (1-scale)/2;
		
	vec4 FL_heart = texture(FL_black, st);
	
	/*
	if (temp > 0.96){
		vec4 FL_heart2 = texture(FL_black, st+vec2(.1,0));
		vec4 FL_heart3 = texture(FL_black, st-vec2(.1,0));
		return (FL_heart+FL_heart2+FL_heart3).xyz;
	}
	*/
	return FL_heart.xyz;
}

void main(){
	float aspectRatio = iResolution.y / iResolution.x;
	
	vec2 st = gl_FragCoord.xy / iResolution;
	st.x /= aspectRatio;
	//st = st * vec2(1, -1.) + vec2(0., 1.);

	vec3 color = heartBeat(st);
	fragColor = vec4(color, 1.);
}
	
	