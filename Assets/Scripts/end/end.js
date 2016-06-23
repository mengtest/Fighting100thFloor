#pragma strict
import UnityEngine.UI;
var ScoreDisplay : Transform;
private var score = 0;
var bg :Transform[];
function Start (){
	score = PlayerPrefs.GetInt("Score");
	var i = PlayerPrefs.GetInt("bg");
	if(i==-1) i=1;
	bg[i].transform.position = Vector3(0,0,1);
}
function Update () {
	ScoreDisplay.GetComponent(Text).text = score+"分";
}
function menu_btn(){
	
	Application.LoadLevel("hello");
	PlayerPrefs.SetInt("Score", 0);
}
function replay_btn(){
	Application.LoadLevel("main");
	PlayerPrefs.SetInt("Score", 0);
}