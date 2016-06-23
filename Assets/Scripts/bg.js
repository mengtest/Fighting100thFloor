#pragma strict

var speed = 1f;
function FixedUpdate () {
	if(transform.position.y>=10){
		transform.position = Vector3(0,-10,1);
	}
	transform.Translate(0,speed*Time.deltaTime,0);
}
