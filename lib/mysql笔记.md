##### 1.round（参数1，参数2）函数，参数1是这个数，参数2是保留几位小数

==round(avg(a1.player_id is not null), 2)==

##### 2.in前面的属性可以有两个

```mysql
SELECT
	ROUND(COUNT(DISTINCT player_id)/(SELECT COUNT(distinct player_id) FROM Activity), 
	2) AS fraction
FROM
    Activity
WHERE
	(player_id,event_date)
	IN
	(SELECT 
        player_id,
        Date(MIN(event_date)+1)
	FROM Activity
	GROUP BY player_id);
```

##### 3.date() 函数

语法：date（date）

说明：date()函数提取日期或日期/时间表达式的日期部分。

![image-20230415082859539](C:\Users\王志生\AppData\Roaming\Typora\typora-user-images\image-20230415082859539.png)

##### 4.null值

null值只能用is null 或者 is not null 判断

##### 5.group by

因为你用了group by ,虽然你的小组内有多条数据，但最后还是显示你组的第一条数据，我们要深刻理解group by

group by的多个值

group by x,y

并且where只能在group by的前面

##### 6.union all

当union或者union all中出现两个并列的属性时，我们取第一个select的属性，但值取的是所有，像这样

![image-20230417232413000](C:\Users\王志生\AppData\Roaming\Typora\typora-user-images\image-20230417232413000.png)

##### 7.逆向思维

编写一个SQL查询，报告没有任何与名为 **“RED”** 的公司相关的订单的所有销售人员的姓名。那就找与RED公司相关的所有销售人员和姓名，然后再取别的

##### 8.case when _ then _ when _ then _ .... else  _ end

 case when _ then _ when _ then _ .... else  _ end 可以理解为java的if-else if -else。可以理解为流程控制语句或条件控制语句。可以实现资料获取的时候，可以更多的条件和自定义逻辑。_表示表达式 

```sql
SELECT id,CASE WHEN p_id IS NULL THEN "Root"

               WHEN id NOT IN(SELECT p_id FROM tree WHERE p_id IS NOT NULL) THEN "Leaf"

               ELSE "Inner"

               END AS Type

FROM tree
```

当not in中包含NULL

select * from t where class not in ('1','2',null)


not in 相当于and条件，只要有一个false，那么所有的都为false我们知道in not in都是用等号(=)来判断的，对于null不会使用is not null那么上面改写为：

select * from t where class !='1'and !='2'and !=null