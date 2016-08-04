# Fighting100thFloor
本游戏是大二下学期《原创动漫游戏造型设计》课程的期末作业。运用Unity3D软件制作。
# 创作环境
*Mac OS X 10.11.5*
*Unity3D Personal Edition 5.3.5f*
# 说明文档
*见“实验报告.docx”*
#主要界面
###开始界面
![开始界面](https://raw.githubusercontent.com/jacobba/Fighting100thFloor/master/ScreenShots/1.png)
###玩法介绍界面
![玩法介绍界面](https://raw.githubusercontent.com/jacobba/Fighting100thFloor/master/ScreenShots/2.png)
###关于我界面
![关于我界面](https://raw.githubusercontent.com/jacobba/Fighting100thFloor/master/ScreenShots/3.png)
###地图选择界面
![地图选择界面](https://raw.githubusercontent.com/jacobba/Fighting100thFloor/master/ScreenShots/4.png)
###主界面
![主界面](https://raw.githubusercontent.com/jacobba/Fighting100thFloor/master/ScreenShots/5.png)
###暂停界面
![暂停界面](https://raw.githubusercontent.com/jacobba/Fighting100thFloor/master/ScreenShots/6.png)
###分数结算界面
![分数结算界面](https://raw.githubusercontent.com/jacobba/Fighting100thFloor/master/ScreenShots/7.png)
#开发流程
1. 制作人物站立动画
2. 制作人物奔跑动画
3. 制作人物拳击动画
4. 制作人物动画控制器，把三种状态联系起来，设置三种状态过渡条件，过渡时间
5. 编写障碍物碰撞监测脚本
6. 编写物资碰撞监测脚本
7. 把碰撞监测脚本整合到主角脚本中，编写主角脚本，让脚本能控制动画控制器
8. 绘制血条，在主角脚本中编写血条变化的函数
9. 建立游戏场景，给物资和地板的预设贴上图片资源
10. 建立主菜单场景，建立主菜单画布，选择地图画布，玩法介绍画布，关于我画布
11. 设置各个按钮的事件
12. 添加音乐音效资源
13. 游戏测试

#开发过程中关键问题及解决方法
#####1.传统gui按钮位置设置不方便，无法自定义图片
解决方法：通过上网查找，了解到gui形式有三种，一是最古老的onGUI,二是公司普遍用的NGUI插件，三是unity4.6之后才有的ugui.所以打算用ugui来建立按钮。
#####2.ugui默认画布与场景中物体大小差别悬殊，不兼容，运行后看不到按钮。
解决方法：在画布设置中把render mode 改为 camera模式，并且选择render camera为场景中的主相机。
#####3.游戏运行时按钮的位置与大小跟随游戏分辨率改变，与设计时的效果差别悬殊。
解决方法：在画布设置中把canvas scaler组件中ui scale mode参数改为“scale with screen size”。这样设置之后，运行后按钮缩放与设计时相同，能达到自适应分辨率的效果。
#####4.unity无法加载gif动画
解决方法：把gif每一帧都导出来，生成一个图片序列，然后倒入unity ，全选图片序列，并且拖入scene场景中，unity会自动生成动画资源。
#####5.想让主角有不同的运动状态，但是不知道怎么实现。
解决方法：通过上网查找，发现可以给主角添加animator组件，并在该组件中选择一个动画控制器，双击动画控制器，可以看到有任何状态，和默认状态，可以右击空白添加一个跑的状态和攻击的状态。并且设置两个bool类型的变量，来控制状态的转换。只要在脚本中改变该bool变量就能达到状态的转换。

![Q5_1](https://raw.githubusercontent.com/jacobba/Fighting100thFloor/master/Q&A_imgs/q1.png)
![Q5_2](https://raw.githubusercontent.com/jacobba/Fighting100thFloor/master/Q&A_imgs/q2.png)
#####6.不同场景之间传递参数，来达到选择不同地图就加载不通地图和声音资源。
解决方法：通过游戏存档可以做到。用playerprefs类，在选择游戏地图的场景中，添加一个游戏存档变量bg，设置为int类型，在第二个场景加载之前读取该变量，通过存储的int数值来读取事先设定好的背景数组，和背景音乐数组就能达到该效果。
用同样的方法，可以做到把游戏场景中的分数传递到结算场景中。
地图选择场景设置存档：
<pre><code>PlayerPrefs.SetInt("bg",1);</code></pre>

游戏场景读取存档：
<pre><code>var i = PlayerPrefs.GetInt("bg");</code></pre>

#####7.背景循环移问题
解决方法：通过两张背景图片循环播放来达到循环的效果。给两张背景添加向上移动的脚本，当一个背景向上移动出视野范围时，重新设置位置，让他返回屏幕底部，接替屏幕中背景移动。

![背景循环1](https://raw.githubusercontent.com/jacobba/Fighting100thFloor/master/Q&A_imgs/q3.png)
![背景循环2](https://raw.githubusercontent.com/jacobba/Fighting100thFloor/master/Q&A_imgs/q4.png)

# 致谢
山东财经大学 何军 老师