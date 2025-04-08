package com.zosh.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zosh.exceptions.PostException;
import com.zosh.exceptions.UserException;
import com.zosh.models.Post;
import com.zosh.models.User;
import com.zosh.repository.PostRepository;
import com.zosh.repository.UserRepository;

@Service
public class PostServiceImplementation implements PostService 
{
	@Autowired
	PostRepository postRepository;
	
	@Autowired
	UserService userService;
	
	@Autowired
	UserRepository userRepository;
	
	@Override
	public Post createNewPost(Post post, Integer userId) throws PostException, UserException 
	{
		User user = userService.findUserById(userId);
		
		Post newPost = new Post();
		newPost.setCaption(post.getCaption());
		newPost.setImage(post.getImage());
		newPost.setCreatedAt(LocalDateTime.now());
		newPost.setImage(post.getImage());
		newPost.setVideo(post.getVideo());
		newPost.setUser(user);
		
		return postRepository.save(newPost);
	}

	@Override
	public String deletePost(Integer postId, Integer userId) throws PostException, UserException 
	{
		Post post = findPostById(postId);
		
		User user = userService.findUserById(userId);
		
		if(post.getUser().getId() != user.getId())
		{
			throw new PostException("You can't delete another user's post");
		}
		
		postRepository.delete(post);
		
		return "post deleted successfully";
	}

	@Override
	public List<Post> findPostByUserId(Integer userId) throws PostException 
	{
		return postRepository.findPostByUserId(userId);
	}

	@Override
	public Post findPostById(Integer postId) throws PostException 
	{
		Optional<Post> post = postRepository.findById(postId);
		
		if(post.isEmpty())
		{
			throw new PostException("post not found with id "+postId);
		}
			
		return post.get();
	}

	@Override
	public List<Post> findAllPost() 
	{
		return postRepository.findAll();
	}

	@Override
	public Post savedPost(Integer postId, Integer userId) throws PostException, UserException 
	{
		Post post = findPostById(postId);
		
		User user = userService.findUserById(userId);
		
		if(user.getSavedPost().contains(post))
		{
			user.getSavedPost().remove(post);
		}
		
		else
		{
			user.getSavedPost().add(post);
		}
		
		userRepository.save(user);
		
		return post;
	}

	@Override
	public Post likePost(Integer postId, Integer userId) throws PostException, UserException 
	{
		Post post = findPostById(postId);
		
		User user = userService.findUserById(userId);
	
		if(post.getLiked().contains(user))
		{
			post.getLiked().remove(user);
		}
		
		else
		{
			post.getLiked().add(user);
		}

		return postRepository.save(post);
	}

}
