package com.zosh.service;

import com.zosh.exceptions.CommentException;
import com.zosh.exceptions.PostException;
import com.zosh.exceptions.UserException;
import com.zosh.models.Comment;

public interface CommentService 
{
	public Comment createComment(
			Comment comment, 
			Integer postId, 
			Integer userId) throws CommentException, UserException, PostException;
	
	public Comment findCommentById(Integer commentId) throws CommentException;
	
	public Comment likeComment(Integer commentId, Integer userId) throws CommentException, UserException;
	
	
	

}
