package com.zosh.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zosh.exceptions.ChatException;
import com.zosh.exceptions.MessageException;
import com.zosh.models.Chat;
import com.zosh.models.Message;
import com.zosh.models.User;
import com.zosh.repository.ChatRepository;
import com.zosh.repository.MessageRepository;

@Service
public class MessageServiceImplementation implements MessageService
{
	@Autowired
	private MessageRepository messageRepository;
	
	@Autowired
	private ChatService chatService;
	
	@Autowired
	private ChatRepository chatRepository;

	@Override
	public Message createMessage(User user, Integer chatId, Message req) throws MessageException, ChatException 
	{
		Message message = new Message();
		
		Chat chat = chatService.findChatById(chatId);
		
		message.setChat(chat);
		message.setContent(req.getContent());
		message.setImage(req.getImage());
		message.setUser(user);
		message.setTimestamp(LocalDateTime.now());

		Message savedMessage = messageRepository.save(message);
		
		chat.getMessages().add(savedMessage);
		
		chatRepository.save(chat);
		
		return savedMessage;
	}

	@Override
	public List<Message> findChatsMessages(Integer chatId) throws MessageException, ChatException 
	{
		Chat chat = chatService.findChatById(chatId);
		
		return messageRepository.findByChatId(chatId);
	}
	

}
