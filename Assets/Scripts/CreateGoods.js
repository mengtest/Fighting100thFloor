#pragma strict

var goods : Transform[];
private var time = 0f;
var CreateGoodsDeltaTime = 500f;
function Update () {
	time++;
	if(time==CreateGoodsDeltaTime){
		var i = Random.Range(0, goods.Length);
		var position = Vector3(Random.Range(-2.0, 2.0),Random.Range(-9.0, 9.0),0);
		Instantiate(goods[i],position,transform.rotation);
		time = 0;
	}
}