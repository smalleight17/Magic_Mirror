#version 150

#define PI 3.14159265

uniform float iTime;
uniform vec2 iResolution;
uniform sampler2D FL_crop;
uniform sampler2D FL_edge;
//uniform sampler2D FL_black;
uniform sampler2D FL_bump;
uniform float param1;

out vec4 fragColor;

vec3 heartRotate(vec2 st){
	//polar coordinate	
	float r = dot(st, st);
	float a = atan(st.y, st.x)/PI + iTime/80 ;
	vec2 uv = vec2(a,r);
	
	float newTime = sin(iTime/2);
	if( newTime < 0) newTime = 0;
	
	vec2 grid = vec2(5,log(r)  * 6 );
	vec2 uv_i = floor(uv * grid);
	uv.x += .5 * mod(uv_i.y, 2.);
	vec2 uv_f = fract(uv * grid );
	
	vec4 FL_black = texture(FL_crop, uv_f);
	vec4 FL_white = texture(FL_edge, uv_f);
	vec3 color = FL_white.xyz;
	
	float heart_beat = sin(iTime*3.5);
	if (heart_beat < .9){
		color = FL_black.xyz;
		//color *= step(param1, 1.-r);
	}
	return color;
}

vec3 heartMosaic(vec2 st, float tileNum){
    vec2 st_i = floor(st * tileNum)/tileNum;
    //vec2 st_f = fract(st * tileNum);
	st = fract(st * tileNum);

	vec4 heart_mosaic  = texture( FL_bump, st_i + vec2(step(1.0-st.y,st.x)/(2.0* tileNum),step(st.x,st.y)/(2.0* tileNum)));

	return heart_mosaic.xyz;
}

float noise(vec3 p){
	vec3 i = floor(p);
	vec4 a = dot(i, vec3(1., 57., 21.)) + vec4(0., 57., 21., 78.);
	vec3 f = cos((p-i)*acos(-1.))*(-.5)+.5;
	a = mix(sin(cos(a)*a),sin(cos(1.+a)*(1.+a)), f.x);
	a.xy = mix(a.xz, a.yw, f.y);
	return mix(a.x, a.y, f.z);
}

float sphere(vec3 p, vec4 spr)
{
	return length(spr.xyz-p) - spr.w;
}

float flame(vec3 p)
{
	float d = sphere(p*vec3(1.,.5,1.), vec4(.0,-1.,.0,1.));
	return d + (noise(p+vec3(.0,iTime*2.,.0)) + noise(p*3.)*.5)*.25*(p.y) ;
}

float scene(vec3 p)
{
	return min(100.-length(p) , abs(flame(p)) );
}

vec4 raymarch(vec3 org, vec3 dir)
{
	float d = 0.0, glow = 0.0, eps = 0.02;
	vec3  p = org;
	bool glowed = false;
	
	for(int i=0; i<64; i++)
	{
		d = scene(p) + eps;
		p += d * dir;
		if( d>eps )
		{
			if(flame(p) < .0)
				glowed=true;
			if(glowed)
       			glow = float(i)/64.;
		}
	}
	return vec4(p,glow);
}

vec4 flameEffect(){
	vec2 st = gl_FragCoord.xy / iResolution;
	st = -1.0 + 2.0 * st;
	st.x *= 0.5;
	
	vec3 org = vec3(0., -2., 4.);
	vec3 dir = normalize(vec3(st.x*1.6, -st.y, -1.5));
	
	vec4 p = raymarch(org, dir);
	float glow = p.w;
	
	vec4 col = mix(vec4(1.,.5,.1,1.), vec4(0.1,.5,1.,1.), p.y*.02+.4);
	
	return mix(vec4(0.), col, pow(glow*2.,4.));

}

void main(){
	float aspectRatio = iResolution.y / iResolution.x;
	
	vec2 stBottomLeft = gl_FragCoord.xy / iResolution;
	vec2 stCenter = stBottomLeft -.5;
	stBottomLeft.x /= aspectRatio;
	stBottomLeft = stBottomLeft * vec2(1, -1.) + vec2(0., 1.);
	stCenter.y *= aspectRatio;
	
	vec3 color =  vec3(0.);

	float tileNum = iTime < 6 ? 10 : iTime *3 - 8;
	if (iTime < 24){
		color = heartMosaic(stBottomLeft - vec2(0.3,0), tileNum);
	}else{
		if (int(iTime - 24) % 16 < 8){
			color = texture(FL_bump, stBottomLeft - vec2(0.3,0)).xyz;
			color *= flameEffect().xyz;
		}else{
			color = heartRotate(stCenter);
		}
			
	}
	fragColor = vec4(color, 1.);
	
}
	
	