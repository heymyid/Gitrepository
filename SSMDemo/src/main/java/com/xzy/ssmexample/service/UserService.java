package com.xzy.ssmexample.service;


import com.xzy.ssmexample.model.User;
import com.xzy.ssmexample.model.UserInformation;

import java.util.List;

public interface UserService {
    public int register(User user);

    public User findUser(String username);

    public UserInformation getUserInformation(UserInformation uis);

    public Integer deleteUser(Integer i);

    public Integer updateUser(User user);
}
