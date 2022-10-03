package com.example.crudUsers.user;

import javax.persistence.*;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)//.SEQUENCE, generator = "user_generator")
    @Column(name = "user_id")
    private long userId;
    private String username;
    private String name;
    private String email;

    public User() {
    }

    public User(long userId, String Username, String name, String email) {
        this.userId = userId;
        this.username = Username;
        this.name = name;
        this.email = email;
    }

    @Override
    public String toString() {
        return "User {" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userid) {
        this.userId = userid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

