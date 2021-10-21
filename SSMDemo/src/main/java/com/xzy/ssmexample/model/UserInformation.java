package com.xzy.ssmexample.model;

import java.util.List;

public class UserInformation {
//    当前页index
    private int page;
//    总页数
    private int pageSum;
//    条数(用户输入)
    private int pageNum;
//   用户信息
    private List<User> userInformational;

    public UserInformation() {
    }

    public UserInformation(List<User> userInformational) {
        this.userInformational = userInformational;
    }

    public UserInformation(int page, int pageNum) {
        this.page = page;
        this.pageNum = pageNum;
    }

    public UserInformation(int page, int pageSum, int pageNum) {
        this.page = page;
        this.pageSum = pageSum;
        this.pageNum = pageNum;
    }

    public UserInformation(int page, int pageSum, int pageNum, List<User> userInformational) {
        this.page = page;
        this.pageSum = pageSum;
        this.pageNum = pageNum;
        this.userInformational = userInformational;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getPageSum() {
        return pageSum;
    }

    public void setPageSum(int pageSum) {
        this.pageSum = pageSum;
    }

    public int getPageNum() {
        return pageNum;
    }

    public void setPageNum(int pageNum) {
        this.pageNum = pageNum;
    }

    public List<User> getUserInformation() {
        return userInformational;
    }

    public void setUserInformation(List<User> userInformation) {
        this.userInformational = userInformation;
    }

    @Override
    public String toString() {
        return "userInformation{" +
                "page=" + page +
                ", pageSum=" + pageSum +
                ", pageNum=" + pageNum +
                ", userInformation=" + userInformational +
                '}';
    }
}
