package com.atguigu;

import redis.clients.jedis.HostAndPort;
import redis.clients.jedis.JedisCluster;
import redis.clients.jedis.JedisPoolConfig;

import java.io.IOException;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * @ClassName RedisClusterDemo
 * @Description 演示redis集群操作, 记得关闭防火墙
 * @Author WangZhisheng
 * @Date 17:16 2022/12/20
 * @Version 11.0.15
 */
public class RedisClusterDemo {

    public static void main(String[] args) throws IOException {
        JedisCluster cluster;
        JedisPoolConfig poolConfig = new JedisPoolConfig();
        // 最大连接数
        poolConfig.setMaxTotal(10000);
       // 最大空闲数
        poolConfig.setMaxIdle(1000);
        poolConfig.setMaxWaitMillis(3000);
        poolConfig.setTestOnBorrow(true);
        HostAndPort port = new HostAndPort("192.168.10.133", 6379);
        //TODO 依次加上集群的所有节点
        //下面这行xxx为密码
        cluster = new JedisCluster(port, 3000, 3000, 8, "wzsallp5201314", poolConfig);
        cluster.set("b1","value1");
        String b1 = cluster.get("b1");
        System.out.println(b1);
        cluster.close();
    }
}

