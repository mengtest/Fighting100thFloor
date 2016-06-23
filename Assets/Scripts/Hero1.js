#pragma strict
import UnityEngine.UI;

public var speed = 3;	//游戏人物运动速度
private var facingRight = true;	//生成时是否面向右面
private var run = false;	//是否正在奔跑
private var stand = false;	//是否站立
private var Ac1 = false;	//是否拳击
var ScoresDisplay : Transform;	//分数显示
var HealthDisplay : Transform;	//生命值显示
var JumpDisplay : Transform;	 //能量显示
var bgmusic:AudioClip[];	//背景音乐
private var score = 0;	//分数
var boom : Transform;	//爆炸效果
var anim : Animator;	//主角运动控制
var moveForce = 365f;	//移动力
var maxSpeed = 5f;		//最大速度
var JumpHeight = 300f;	//跳跃力
private var health = 100f;	//生命值
private var isJumping = false;	//是否在跳跃
var rigi : Rigidbody2D;		//刚体
var healthBar : SpriteRenderer;	 //生命条
private var healthScale : Vector3;	//生命条的缩放向量
private var lastHitTime = 0f;	//最后一次击打怪物的时间
var DestroyLifeDamagePeriod = 0.5f;	//持续触碰减血物体时，减血的时间间隔
var DestroyLifeDamage = 20f;	//减血数量
var PlusLifeMount = 10f;	//加血数量
private var AttackTime = 0f;	//攻击时间
var bg :Transform[];	//背景图片
var hitmusic:AudioClip[];	//击打音效
var diemusic:AudioClip;	//死亡音效
function Start () {
	healthScale = healthBar.transform.parent.gameObject.transform.localScale;
	var i = PlayerPrefs.GetInt("bg");
	if(i==-1) i=1;
	GameObject.Find("Main Camera").gameObject.GetComponent(AudioSource).clip = bgmusic[i];
	GameObject.Find("Main Camera").gameObject.GetComponent(AudioSource).Play();
	Instantiate(bg[i], Vector3(0,0,1),transform.rotation);
	Instantiate(bg[i], Vector3(0,-10,1),transform.rotation);
}
function Update () {
	if(Input.GetKey(KeyCode.Z)){
		anim.SetBool("Ac1",true);
		Ac1 = true;
		AttackTime = Time.time;
	}
		
	if(Input.GetKey(KeyCode.LeftArrow)||Input.GetKey(KeyCode.RightArrow)||Input.acceleration.x) 
		anim.SetBool("Run",true);
	else
		anim.SetBool("Run",false);
	if(Input.GetButtonDown("Jump")&&!isJumping) {
		rigi.AddForce(new Vector2(0f, JumpHeight));
		isJumping = true;
	}
	if(Ac1&&(Time.time>=AttackTime+1.7f)) Ac1=false; 
	ScoresDisplay.GetComponent(Text).text = score+"";
	HealthDisplay.GetComponent(Text).text = health+"";
	JumpDisplay.GetComponent(Text).text = JumpHeight+"";
}
function fight_btn(){
	anim.SetBool("Ac1",true);
		Ac1 = true;
		AttackTime = Time.time;
}
function jump_btn(){
	if(!isJumping){
		rigi.AddForce(new Vector2(0f, JumpHeight));
		isJumping = true;
	}
}
function FixedUpdate () {
	score = score+Time.deltaTime*2;
	var h = Input.GetAxis("Horizontal")+Input.acceleration.x;
	anim.SetBool("Ac1",false);
	if(h * rigi.velocity.x < maxSpeed)
			//rigi.AddForce(Vector2.right * h * moveForce);
			transform.Translate(h*Time.deltaTime*speed,0,0);
	if(Mathf.Abs(rigi.velocity.x) > maxSpeed)
			rigi.velocity = new Vector2(Mathf.Sign(rigi.velocity.x) * maxSpeed, rigi.velocity.y);

  	if(h > 0 && !facingRight)
		Flip();
	else if(h < 0 && facingRight)
		Flip();
}

function Flip ()
{
	facingRight = !facingRight;
	var theScale = transform.localScale;
	theScale.x *= -1;
	transform.localScale = theScale;
}

function LifeChange(t:int,b){
	if(!b)
		health -= t;
	else {
		if(health+t<=100) health += t;
	}
	if(health<=0) Die();
	else{
		healthBar.material.color = Color.red;
		healthBar.transform.parent.gameObject.transform.localScale = new Vector3(healthScale.x * health * 0.01f, healthScale.y, healthScale.z);
	}

}

function OnCollisionStay2D(collision : Collision2D){
	if(collision.gameObject.tag=="RowBack2Side"){
		if(!facingRight)
		rigi.AddForce(Vector2.right*5);
		else
		rigi.AddForce(Vector2.left*5);
	}
	if(collision.gameObject.tag=="RowBackLeft"){
		rigi.AddForce(Vector2.left*5);
	}
	if(collision.gameObject.tag=="RowBackRight"){
		rigi.AddForce(Vector2.right*5);
	}
	if(collision.gameObject.tag=="PushDown"){
		Destroy(collision.gameObject,1);
	}
	if(collision.gameObject.tag=="DestroyLife"){
		if (Time.time > lastHitTime + DestroyLifeDamagePeriod) {
			LifeChange(DestroyLifeDamage,false); 
			lastHitTime = Time.time; 
		}
	}
}

function OnCollisionEnter2D(collision : Collision2D){
	isJumping = false;
	if(collision.gameObject.tag=="RowBack2Side") score+=6;
	if(collision.gameObject.tag=="PushDown")	score+=10;
	if(collision.gameObject.tag=="DestroyLife") score+=2;
	if(collision.gameObject.tag=="PushUp"){
		rigi.AddForce(new Vector2(0f, 200f));
		score+=1;
	}
	if(collision.gameObject.tag=="LifeBox"){
		LifeChange(PlusLifeMount,true);
		score+=5;
	}
	if(collision.gameObject.tag=="Master"){
		if(Ac1&&collision.gameObject.transform.position.y<=transform.position.y){
			AudioSource.PlayClipAtPoint(hitmusic[Random.Range (0, hitmusic.Length)], transform.position);
			Instantiate(boom, transform.position,transform.rotation);
			Destroy(collision.gameObject);
			score+=10;
		}else{
			LifeChange(DestroyLifeDamage,false); 
		}
	}

}

function OnTriggerEnter2D (other : Collider2D) {
	if(other.gameObject.name=="DownWall"){
		Die();
	}
	if(other.gameObject.name=="Wall"){
		transform.Translate(0,-2,0);
	}
	if(other.gameObject.tag=="Apple"){
		LifeChange(5,true);
		Destroy(other.gameObject);	
	}
	if(other.gameObject.tag=="Grape"){
		if(JumpHeight<=500)	JumpHeight +=20f;
		Destroy(other.gameObject);	
	}
	if(other.gameObject.tag=="Carrot"){
		LifeChange(5,false);	
		Destroy(other.gameObject);	
	}
	if(other.gameObject.tag=="Mushroom"){
		if(JumpHeight>=20)	JumpHeight -=20f;
		Destroy(other.gameObject);	
	}
}

function Die(){
		AudioSource.PlayClipAtPoint(diemusic,transform.position);
	 PlayerPrefs.SetInt("Score", score);
	 Application.LoadLevel("end");
}