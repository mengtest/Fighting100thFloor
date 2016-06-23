#pragma strict

var masters : Transform[];
private var time = 0f;
var CreateMasterDeltaTime = 100f;
function Update () {
	time++;
	if(time==CreateMasterDeltaTime){
		var i = Random.Range(0, masters.Length);
		var position = Vector3(Random.Range(-2.0, 2.0),0,0);
		Instantiate(masters[i],transform.position+position,transform.rotation);
		time = 0;
	}
}