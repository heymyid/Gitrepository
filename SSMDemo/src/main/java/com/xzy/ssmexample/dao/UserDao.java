package com.xzy.ssmexample.dao;

import com.xzy.ssmexample.model.User;
import com.xzy.ssmexample.model.UserInformation;

import java.util.List;

public interface UserDao {
    public int insertUser(User user);

    public User findUser(String username);

    public int findSum();

    public List<User> findUsers(UserInformation uf);

    public List<User> findUsers(int index,int pageNum);

    public Integer deleteUser(int userId);

    public Integer updateUser(User user);

}
