package com.zosh.service;

import java.util.List;

import com.zosh.exceptions.PostException;
import com.zosh.exceptions.UserException;
import com.zosh.models.Post;

public interface PostService 
{
	Post createNewPost(Post post, Integer userId) throws PostException, UserException;
	
	String deletePost(Integer postId, Integer userId) throws PostException, UserException;

	List<Post> findPostByUserId(Integer userId) throws PostException;
	
	Post findPostById(Integer postId) throws PostException;
	
	List<Post> findAllPost();
	
	Post savedPost(Integer postId, Integer userId) throws PostException, UserException;
	
	Post likePost(Integer postId, Integer userId) throws PostException, UserException;	
}
