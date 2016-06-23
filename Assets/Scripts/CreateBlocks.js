#pragma strict

var blocks : Transform[];
private var time = 0f;
var BlocksParent : Transform;
var CreateBlockDeltaTime = 100f;
function Update () {
	time++;
	if(time==CreateBlockDeltaTime){
		var i = Random.Range(0, blocks.Length);
		var position = Vector3(Random.Range(-2.0, 2.0),-5,0);
		Instantiate(blocks[i],position,transform.rotation);

		time = 0;
	}
}