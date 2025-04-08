package com.zosh.models;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message 
{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	private String content;
	
	private String image;
	
	@ManyToOne // MANY messages can have only ONE user
	private User user;

	@JsonIgnore
	@ManyToOne // MANY messages can have only ONE chat
	private Chat chat; // This will not create separate message_chat table because of "mapped_by" keyword used in Chat class
	
	private LocalDateTime timestamp;
}
