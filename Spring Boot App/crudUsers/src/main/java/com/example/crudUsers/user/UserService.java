package com.example.crudUsers.user;

import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User getUser(long userId){
        return userRepository.findById(userId).get();
    }

    public void addUser(@NotNull User user){

        userRepository.save(user);
    }
    public void updateUser(@NotNull User user){

        userRepository.updateUser(user.getName(),user.getUsername(),user.getEmail(),user.getUserId());
    }

    public void deleteUser(long userId) {

        userRepository.deleteById(userId);
    }
}
