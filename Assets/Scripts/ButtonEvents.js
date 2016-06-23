#pragma strict

public var PausePanel:RectTransform;
public var MainPanel:RectTransform;
function Awake (){

}
function pause_btn () {
	Time.timeScale = 0;
	PausePanel.anchoredPosition = Vector2(0,0);
}
function play_btn () {
	Time.timeScale = 1;
	PausePanel.anchoredPosition = Vector2(800f,0);
}
function replay_btn(){
	Application.LoadLevel("main");
	Time.timeScale = 1;
	PausePanel.anchoredPosition = Vector2(800f,0);
}

function menu_btn(){
	Application.LoadLevel("hello");
}
