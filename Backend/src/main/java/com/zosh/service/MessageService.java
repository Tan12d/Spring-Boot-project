package com.zosh.service;

import java.util.List;

import com.zosh.exceptions.ChatException;
import com.zosh.exceptions.MessageException;
import com.zosh.models.Message;
import com.zosh.models.User;

public interface MessageService 
{
	public Message createMessage(User user, Integer chatId, Message message) throws MessageException, ChatException;

	public List<Message> findChatsMessages(Integer chatId) throws MessageException, ChatException;
}

