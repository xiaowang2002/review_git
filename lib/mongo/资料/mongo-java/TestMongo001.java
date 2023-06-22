package com.baizhi.test;

import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoIterable;
import org.bson.Document;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class TestMongo001 {

    private MongoClient mongoClient;


    @Before
    public void before(){
        mongoClient = new MongoClient("192.168.28.136",27017);
    }


    /**
     * 获取所有集合名称
     */
    @Test
    public void testGetCollectionNames(){
        MongoDatabase database = mongoClient.getDatabase("test");
        MongoIterable<String> strings = database.listCollectionNames();
        for (String name : strings) {
            System.out.println(name);
        }
    }

    /**
     * 获取指定的集合
     */

    @Test
    public void testGetCollection(){
        MongoDatabase database = mongoClient.getDatabase("test");
        MongoCollection<Document> collection = database.getCollection("t_user");
    }

    /**
     * 获取指定集合中的所有数据
     */

    @Test
    public void testGetCollectionFindAll(){
        MongoDatabase database = mongoClient.getDatabase("test");
        MongoCollection<Document> collection = database.getCollection("t_user");
        FindIterable<Document> documents = collection.find();
        for (Document document : documents) {
            System.out.println(document);
            System.out.print(document.get("name")+"===");
            System.out.print(document.get("age")+"===");
            System.out.println();
        }
    }

    /**
     * 保存一条数据
     */
    @Test
    public void testSave(){
        MongoDatabase database = mongoClient.getDatabase("test");
        MongoCollection<Document> t_user = database.getCollection("t_user");
        Document document = new Document();
        document.put("_id","1");
        document.put("name","xiaochen");
        document.put("age",23);
        document.put("bir",new Date());
        t_user.insertOne(document);
    }

    /**
     * 保存多条数据
     */
    @Test
    public void testSaveMany(){
        MongoDatabase database = mongoClient.getDatabase("test");
        MongoCollection<Document> t_user = database.getCollection("t_user");
        List<Document > list = new ArrayList<Document>();
        Document document = new Document();
        document.put("_id","3");
        document.put("name","xiaohei");
        document.put("age",23);
        document.put("bir",new Date());
        Document document1 = new Document();
        document1.put("_id","2");
        document1.put("name","xiaohei");
        document1.put("age",23);
        document1.put("bir",new Date());
        list.add(document);
        list.add(document1);
        t_user.insertMany(list);
    }


    /**
     * 删除一条数据
     */
    @Test
    public void testDelete(){
        MongoDatabase database = mongoClient.getDatabase("test");
        MongoCollection<Document> t_user = database.getCollection("t_user");
        Document document = new Document();
        document.put("_id",1);
        t_user.deleteOne(document);

    }

    /**
     * 删除多个数据
     */
    @Test
    public void testDeleteMany(){
        MongoDatabase database = mongoClient.getDatabase("test");
        MongoCollection<Document> t_user = database.getCollection("t_user");
        Document document = new Document();
        document.put("name","xiaochen");
        t_user.deleteMany(document);
    }


    /**
     * 查询总条数
     *
     */
    @Test
    public void tesCount(){
        MongoDatabase database = mongoClient.getDatabase("test");
        MongoCollection<Document> t_user = database.getCollection("t_user");
        System.out.println(t_user.count());
    }

    @After
    public void after(){
        mongoClient.close();
    }






}
