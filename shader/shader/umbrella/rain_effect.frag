#version 150

uniform float current_time;
uniform vec2 windowSize;
uniform sampler2D baseImg;
uniform sampler2D noiseImg;

out vec4 outputColor;

void main(){

	vec2 uv = gl_FragCoord.xy/ windowSize;
	vec2 uvChange = vec2(uv.x, uv.y*0.1 + current_time*0.125);

	vec3 raintex = texture(noiseImg, uvChange).rgb/8.0;
	vec2 where = (uv.xy-raintex.xy);
	vec3 texchur1 = texture(baseImg,vec2(where.x,where.y)).rgb;
	outputColor = vec4(texchur1,1.0);
}
	