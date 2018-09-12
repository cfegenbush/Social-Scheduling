package com.revature.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.model.AppUser;
import com.revature.repos.UserRepo;

@Service
public class UserServices {
	
	@Autowired
	private UserRepo ur;
	
	
	public List<AppUser> findAll() {
		return ur.findAll();
	}
	
	public AppUser findOne(int id) {
		return ur.findById(id).get();
	}
	
	public AppUser login(String username, String password) {
		return ur.findByUsernameAndPassword(username, password);
	}

	public AppUser save(AppUser u) {
		return ur.saveAndFlush(u);
	}
}
