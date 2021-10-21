package com.xzy.ssmexample.controller;

import com.google.gson.Gson;
import com.sun.deploy.net.HttpResponse;
import com.xzy.ssmexample.model.User;
import com.xzy.ssmexample.model.UserInformation;
import com.xzy.ssmexample.service.UserService;
import com.xzy.ssmexample.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
public class UserController {
    @Autowired
    private UserService userService;
//    注册
    @ResponseBody
    @RequestMapping("enrollNew")
    public String register(User user,HttpServletRequest req) {
        System.out.println("enrollNew访问成功");
        int i = userService.register(user);
        if(i >0){
         HttpSession s =  req.getSession();
         s.setAttribute("user",user);
        return "success";
        }
        else{
            return null;
        }
    }
//    检测用户名是否重复
    @ResponseBody
    @RequestMapping("land")
    public String landOn(User user){
//        System.out.println("控制层访问成功！");
        Gson gson = new Gson();
        User u = userService.findUser(user.getUsername());
        String s = gson.toJson(u);
        if(s != null){
            return s;
        }
        return null;
    }
//    登录跳转支持
    @ResponseBody
    @RequestMapping("toLand")
    public String tolandOn(User user, HttpServletRequest req){
        Gson gson = new Gson();
        User u = userService.findUser(user.getUsername());
        if(u != null && user.getPassword() != null && u.getPassword().equals(user.getPassword())){
            String s = gson.toJson(u);
            //设置用户信息到session
            HttpSession hs = req.getSession();
            hs.setAttribute("user",u);
            return s;
        }else{
            System.out.println("访问失败");
        return null;
        }
    }
//    主页面加载用户信息
    @ResponseBody
    @RequestMapping("main.do")
    public String mainHtml(HttpServletRequest req){
        System.out.println("main.do访问成功");
        HttpSession s = req.getSession();
        User u = (User)s.getAttribute("user");
//        System.out.println(u);
        Gson gs = new Gson();
        String uj =gs.toJson(u);
        return uj;
    }
    @ResponseBody
    @RequestMapping("FindInformation")
    public UserInformation getUserInformation(HttpServletRequest req){
        System.out.println("FindInformation访问成功");
        int index = Integer.parseInt(req.getParameter("page")) ;
        int pageNum = Integer.parseInt(req.getParameter("pageNum"));
//        System.out.println("Controller访问成功");
        UserInformation uin = new UserInformation(index,pageNum);
        uin = userService.getUserInformation(uin);
        return uin;
    }
    @ResponseBody
    @RequestMapping("Delete")
    public String deleteUser(HttpServletRequest req){
        System.out.println("Delete访问成功");
        int userid = Integer.parseInt(req.getParameter("userid"));
        int i = userService.deleteUser(userid);
        if(i > 0){
            return "success";
        }else{
            return null;
        }
    }
    @ResponseBody
    @RequestMapping("Update")
    public String updateUser(User user){
        System.out.println("updateUser访问成功");
        System.out.println(user);
        int i = userService.updateUser(user);
        if(i > 0) {
            return "success";
        }else {
            return null;
        }
    }
}