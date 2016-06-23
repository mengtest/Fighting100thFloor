#pragma strict

public var MasterMoveSpeed = 1f;
private var isLanded = false;
private var Move = ["Left","Right"];
private var i;
function Start () {
	i = Random.Range(0, 2);
}
function Update () {
	
	if(isLanded) {
		if(Move[i]=="Right")
			transform.Translate(MasterMoveSpeed*Time.deltaTime,0,0);
		else
			transform.Translate(-MasterMoveSpeed*Time.deltaTime,0,0);
	}
	Destroy(gameObject,20);
}
function OnCollisionEnter2D(collision : Collision2D){
	if(collision.gameObject.tag!="Master")	isLanded = true;
	if(collision.gameObject.tag=="Master") {
		var theScale = transform.localScale;
		theScale.x *= -1;
		transform.localScale = theScale;
	}	
}