package com.zosh.service;

import java.util.List;

import com.zosh.exceptions.ReelsException;
import com.zosh.exceptions.UserException;
import com.zosh.models.Reels;
import com.zosh.models.User;

public interface ReelsService 
{
	public Reels createReel(Reels reel, User user);
	
	public List<Reels> findAllReels();
	
	public List<Reels> findUsersReels(Integer userId) throws ReelsException, UserException;
}
