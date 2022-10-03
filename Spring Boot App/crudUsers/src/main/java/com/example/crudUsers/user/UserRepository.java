package com.example.crudUsers.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User,Long> {

    @Modifying(clearAutomatically = true)
    @Query("update User user set user.name = :name," +
            "user.username=:username, user.email=:email" +
            " where user.userId=:userId")
    void updateUser(@Param("name") String name, @Param("username") String username
            , @Param("email") String email, @Param("userId") long userId);

}
