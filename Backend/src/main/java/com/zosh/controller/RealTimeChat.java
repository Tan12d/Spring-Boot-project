package com.zosh.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import com.zosh.models.Message;

public class RealTimeChat 
{
	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;
	
	@MessageMapping("/chat/{groupId}")
	public Message sendToUser(
			@Payload Message message,
			@DestinationVariable String groupId) 
	{
		simpMessagingTemplate.convertAndSendToUser(groupId, "/private", message);
		
		return message;
	}

}
