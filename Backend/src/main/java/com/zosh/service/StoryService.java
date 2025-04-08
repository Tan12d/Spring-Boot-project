package com.zosh.service;

import java.util.List;

import com.zosh.exceptions.StoryException;
import com.zosh.models.Story;
import com.zosh.models.User;

public interface StoryService 
{
	public Story createStory(Story story, User user);
	
	public List<Story> findStoryByUserId(Integer userId) throws StoryException;	
}
