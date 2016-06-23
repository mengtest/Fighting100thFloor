#pragma strict

var MoveSpeed = 0.6;
function Update () {
	transform.Translate(0,MoveSpeed*Time.deltaTime,0);
}