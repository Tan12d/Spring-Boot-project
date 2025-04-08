package com.zosh.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zosh.exceptions.ChatException;
import com.zosh.models.Chat;
import com.zosh.models.User;
import com.zosh.repository.ChatRepository;

@Service
public class ChatServiceImplementation implements ChatService 
{
	@Autowired
	private ChatRepository chatRepository;
	
	@Override
	public Chat createChat(User reqUser, User user2) 
	{	
		Chat isExist = chatRepository.findChatByUsersId(reqUser, user2);
		
		if(isExist!=null)
		{
			return isExist;
		}
		
		Chat chat = new Chat();
		chat.getUsers().add(user2);
		chat.getUsers().add(reqUser);
		chat.setTimestamp(LocalDateTime.now());
		
		return chatRepository.save(chat);
	}

	@Override
	public Chat findChatById(Integer chatId) throws ChatException 
	{
		Optional<Chat> opt = chatRepository.findById(chatId);
		
		if(opt.isEmpty())
		{
			throw new ChatException("Chat not found with id "+ chatId);
		}
		
		return opt.get();
	}

	@Override
	public List<Chat> findUsersChat(Integer userId) 
	{
		return chatRepository.findByUsersId(userId);
	}
	

}
