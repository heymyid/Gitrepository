package com.xzy.ssmexample.service.impl;

import com.xzy.ssmexample.dao.UserDao;
import com.xzy.ssmexample.model.User;
import com.xzy.ssmexample.model.UserInformation;
import com.xzy.ssmexample.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao dao;
    @Override
    public int register(User user) {
        return dao.insertUser(user);
    }

    @Override
    public User findUser(String username) {
        User u = dao.findUser(username);
        return u;
    }

    @Override
    public UserInformation getUserInformation(UserInformation us) {
//        System.out.println("Service层成功");
//      返回查询结果
        List<User> lu = dao.findUsers(us);
        us.setUserInformation(lu);
//      返回查询的下标
        us.setPage(us.getPage() + us.getPageNum());
//      返回数据总数
        int sum = dao.findSum();
        us.setPageSum(sum);
//      根据每页数量返回分页数量
        int pageSum =(sum + us.getPageNum() - 1) /us.getPageNum();
        us.setPageSum(pageSum);
        return us;
    }

    @Override
    public Integer deleteUser(Integer i) {
        int j = dao.deleteUser(i);
        return j;
    }
    @Override
    public Integer updateUser(User user){
         return dao.updateUser(user);
    }


}