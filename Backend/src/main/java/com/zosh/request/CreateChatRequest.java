package com.zosh.request;

import com.zosh.models.User;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateChatRequest 
{
	private Integer userId;
}
