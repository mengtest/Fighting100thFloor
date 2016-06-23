#pragma strict
public var StartPanel:RectTransform;
public var SelectPanel:RectTransform;
public var ZhinanPanel:RectTransform;
public var AboutPanel:RectTransform;
function Awake () {
	PlayerPrefs.SetInt("bg", -1);
	PlayerPrefs.SetInt("Score", 0);
}

function Update () {

}

function start_button(){
	StartPanel.anchoredPosition = Vector2(800f,0);
	SelectPanel.anchoredPosition = Vector2(0,0);
}

function select_back_button(){
	StartPanel.anchoredPosition = Vector2(0,0);
	SelectPanel.anchoredPosition = Vector2(800f,0);
}
function bg1_button(){
	PlayerPrefs.SetInt("bg", 0);
	Application.LoadLevel("main");
}
function bg2_button(){
	PlayerPrefs.SetInt("bg", 1);
	Application.LoadLevel("main");
}
function bg3_button(){
	PlayerPrefs.SetInt("bg", 2);
	Application.LoadLevel("main");
}
function bg4_button(){
	PlayerPrefs.SetInt("bg", 3);
	Application.LoadLevel("main");
}
function bg5_button(){
	PlayerPrefs.SetInt("bg", 4);
	Application.LoadLevel("main");
}
function Zhinan_btn(){
	StartPanel.anchoredPosition = Vector2(800f,0);
	ZhinanPanel.anchoredPosition = Vector2(0,0);
}
function zhinan_back_button(){
	StartPanel.anchoredPosition = Vector2(0,0);
	ZhinanPanel.anchoredPosition = Vector2(800f,0);
}
function About_btn(){
	StartPanel.anchoredPosition = Vector2(800f,0);
	AboutPanel.anchoredPosition = Vector2(0,0);
}
function about_back_button(){
	StartPanel.anchoredPosition = Vector2(0,0);
	AboutPanel.anchoredPosition = Vector2(800f,0);
}

