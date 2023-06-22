#### 一、基础命令

##### 1、相对路径问题

相对路径本身就有一个./，后面不需要加一个./，当然也是可以加的

就像这两个操作结果是相等的

![image-20230419142158738](C:\Users\王志生\AppData\Roaming\Typora\typora-user-images\image-20230419142158738.png)

##### 2.家目录

每个用户都有家目录，用户不同，家目录不同 ,家目录名称是用户名，并且家目录的符号是' ~ '

下图展示了这不同的两个用户的家目录wzs，root

![image-20230419143000132](C:\Users\王志生\AppData\Roaming\Typora\typora-user-images\image-20230419143000132.png)

##### 3.ls的-h

选项h在ls中表示显示存储单位

没有h的情况

![image-20230419143455510](C:\Users\王志生\AppData\Roaming\Typora\typora-user-images\image-20230419143455510.png)

有h的情况

![image-20230419143525804](C:\Users\王志生\AppData\Roaming\Typora\typora-user-images\image-20230419143525804.png)

ls列出的结果颜色表示：
蓝色：文件夹   或者最前面为d

黑色：文件 或者最前面为-

绿色：拥有所有权限

##### 4.mkdir

mkdir中的选项==p==表示创建多层目录

![image-20230419143929607](C:\Users\王志生\AppData\Roaming\Typora\typora-user-images\image-20230419143929607.png)

一次性创建多个目录

![image-20230419144019267](C:\Users\王志生\AppData\Roaming\Typora\typora-user-images\image-20230419144019267.png)

##### 5.touch创建文件

touch 路径 路径 路径    可以创建多个文件

##### 6.cp

cp的过程中可以进行重命名，如果需要复制目录必须要加选项r，或者递归复制，将被复制的文件夹和文件全部复制，但mv命令不一样，他剪切文件夹或者递归剪切不需要加参数r,重命名也是这个指令，rm删除目录或者递归删除也需要加r,rm后可以添加多个路径，表示删除多个文件，rm选项加个f可以强制删除

通配符*   *表示任意的字符

![image-20230419154010876](C:\Users\王志生\AppData\Roaming\Typora\typora-user-images\image-20230419154010876.png)

##### 7.vim

vim可以打开不存在的文件

:wq       :q       :q!         :x   理解这四个的指令的意思

##### 8.输出重定向

'>' : 覆盖

'>>' : 追加

语法：正常的指令  >或>>  输出的文件路径（==输出的文件可以不存在，则创建==）

![image-20230419154851638](C:\Users\王志生\AppData\Roaming\Typora\typora-user-images\image-20230419154851638.png)

##### 9.cat指令的两个作用

第一个作用在终端显示内容

第二个作用对文件进行合并，配合重定向指令进行合并

语法： cat 文件1 文件2 ... >或>>  目标文件，不同于指令重定向，他是文件内容的重定向

![](C:\Users\王志生\AppData\Roaming\Typora\typora-user-images\image-20230419160048277.png)

#### 二、进阶命令

df：查看磁盘空间    -h表示以可读性较高的形式展示大小（其实就是显示单位）disk 

free：查看内存使用情况    -m/g/k    m,g,k表示以什么单位显示

head/tail  -n   文件路径：显示某个文件的前/后n行，不指定n就是默认是10     

tail -f filename  ：动态监视某个文件的后10行，我们可以开启第二个窗口测试添加，此时当前终端会改变

less 文件路径： 执行此指令，我们会进入文件中，此时我们按以下键会执行不同的事件，less也是一种查看文件的方式，和cat一样，不过比cat更方便    

回车：跳行    空格：翻页   上下方向：上下行   数字：去那个数字的n+1行数   q:退出

wc  -lwc  文件路径：统计文件内容信息，l表示行数，w表示words，c表示byte，可以合并使用

date:

date  +%F    输出当前日期    比如：2023-04-19   等于date  +%Y-%m-%d

date  +%F%T 输出当前日期和时间    比如： 2023-04-1917:04:10    

引号表示是一个整体，这样就可以打空格了了  date  "+%F  %T" 2023-04-19  17:04:10    

等价于 date  "+%Y-%m-%d  %H:%M:%S"

补充：date  -d  "-n/+n   year/month/day/....."  "+%F  %T"    输出某个时间点的前/后  几  天/年/月的日期

cal ：  cal 输出当前月的日历 

cal -3 :输出上个月，当前月，下个月的日历

cal -y 年份  ：输出这个年份的日历

clear /ctrl + L 快捷键  ： 把当前页面的内容隐藏在上方

管道符 |  ：相当于并且的意思   grep 过滤的意思

例如：ls / | grep y  :显示/下含有y的文件和目录

ls / | wc -l ：统计某个目录下的文档的总个数

#### 三、高级命令

hostname：输出完整的主机名

hostname -f : 表示输出当前主机名中的FQON（全限定域名）

id：默认显示当前执行命令的用户的基本信息

id 用户名：显示指定用户的基本信息

用户信息所在文件：/etc/passwd         验证组信息：/etc/group

whoami：显示当前用户名

ps -ef：查看服务器的进程信息，e等价于A表示全部进程，f显示全部的列

top：服务器的进程占用的资源，q退出，C键cpu倒序，M键内存倒序

==du -sh 目录路径== ：目录的真实大小

find：find  路径范围 选项 值      用来查找==文件==          选项：-name(按名字搜索)  ，*表示通配符

例如：find / -name ens33

service  服务名

**`kill -9 进程的pid`：** 杀死进程（-9 表示强制终止。）

先用 ps 查找进程，然后用 kill 杀掉

reboot：重启

关机：shutdown -h now (立即关机)

shutdown -h 20:30  (定时关机）shutdown -c

init 0     、   halt      、  poweroff      这三个都可以关机

uptime：输出计算机持续运行的时间

uname：获取操作系统的类型，选项-a表示更详细

netstat -tnlp：查看网络状态

man 指令：查看指令的手册      man cp

补充：rm -rf /test/*       删除/test所有下的文件

vim  +/total  ls3.txt  ：打开指定文件，并且高亮显示关键词

vim  +/关键词  文件路径

vim文件中显示高亮  输入关键词：”/关键词”

取消高亮：":nohl"

防火墙服务：systemctl start/status/restart firewalld

rpm -qa | grep xxx   ：查询某个软件的安装情况。q查询，a所有   

文件权限：第1位：文件权限类型      r读、w写、x执行

第2-4位：所有者权限

第5-7位：和所有者同组用户的权限

第8-10位：除前两部分以外的用户权限

chmod  选项 权限模式 文档：给文档设置权限   -R表示递归设置权限

r:4  w:2 x:1

chmod  754 ls3.txt 

tar -zxvf    文件名.tar.gz          解压压缩包

设置静态ip  :https://blog.csdn.net/weixin_45533131/article/details/128002480

修改红色的部分，其他不用

![image-20230419202211281](C:\Users\王志生\AppData\Roaming\Typora\typora-user-images\image-20230419202211281.png)

![image-20230419202150330](C:\Users\王志生\AppData\Roaming\Typora\typora-user-images\image-20230419202150330.png)

**补充一个比较常用的东西:**

假如我们装了一个 zookeeper，我们每次开机到要求其自动启动该怎么办？

1. 新建一个脚本 zookeeper
2. 为新建的脚本 zookeeper 添加可执行权限，命令是:`chmod +x zookeeper`
3. 把 zookeeper 这个脚本添加到开机启动项里面，命令是：`chkconfig --add zookeeper`
4. 如果想看看是否添加成功，命令是：`chkconfig --list`



添加环境变量

配置全局环境变量

输入 vi /etc/profile 进入配置文件
输入需要配置的环境变量，格式为 export 环境变量key = 环境变量value
 这里，我输入 export TEST_ENV=test

source /etc/profile 使环境变量生效



配置用户环境变量

输入vim ==~/.bashrc== 进入用户环境变量文件
输入需要配置的环境变量，格式为 export 环境变量key = 环境变量value
 这里，我输入 export TEST_ENV=test

source ~/.bashrc 使环境变量生效



用户管理

![image-20230420094104702](C:\Users\王志生\AppData\Roaming\Typora\typora-user-images\image-20230420094104702.png)

![image-20230420094433031](C:\Users\王志生\AppData\Roaming\Typora\typora-user-images\image-20230420094433031.png)