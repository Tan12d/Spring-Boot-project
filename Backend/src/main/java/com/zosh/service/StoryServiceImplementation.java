package com.zosh.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zosh.exceptions.StoryException;
import com.zosh.models.Story;
import com.zosh.models.User;
import com.zosh.repository.StoryRepository;

@Service
public class StoryServiceImplementation implements StoryService
{
	@Autowired
	private StoryRepository storyRepository;
	
	@Override
	public Story createStory(Story story, User user) 
	{
		Story createdStory = new Story();
		
		createdStory.setCaption(story.getCaption());
		createdStory.setImage(story.getImage());
		createdStory.setUser(user);
		createdStory.setTimestamp(LocalDateTime.now());
		
		return storyRepository.save(createdStory);
	}

	@Override
	public List<Story> findStoryByUserId(Integer userId) throws StoryException 
	{
		return storyRepository.findByUserId(userId);
	}

}
