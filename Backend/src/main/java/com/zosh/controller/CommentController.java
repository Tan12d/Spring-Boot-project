package com.zosh.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.zosh.models.Comment;
import com.zosh.models.Post;
import com.zosh.models.User;
import com.zosh.repository.CommentRepository;
import com.zosh.service.CommentService;
import com.zosh.service.PostService;
import com.zosh.service.UserService;

@RestController
public class CommentController 
{
	@Autowired
	private CommentService commentService;
	
	@Autowired
	private UserService userService;		
	
	@PostMapping("/api/comments/post/{postId}")
	public Comment createComment(@RequestBody Comment comment, @RequestHeader("Authorization") String jwt,
			@PathVariable Integer postId) throws Exception
	{
		User user = userService.findUserByJwt(jwt);
		
		Comment createdComment = commentService.createComment(
				comment, 
				postId, 
				user.getId());
		
		return createdComment;
	}
	
	@PutMapping("/api/comments/like/{commentId}")
	public Comment likeComment(
			@RequestHeader("Authorization") String jwt,
			@PathVariable Integer commentId) throws Exception
	{
		User user = userService.findUserByJwt(jwt);
		
		Comment likedComment = commentService.likeComment(
				commentId,
				user.getId());
		
		return likedComment;
	}
	
	@GetMapping("/api/comments/{commentId}")
	public Comment findCommentById(
			@PathVariable Integer commentId) throws Exception
	{
		Comment comment = commentService.findCommentById(commentId);
		
		return comment;
	}
	

}
