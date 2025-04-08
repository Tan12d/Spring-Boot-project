package com.zosh.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zosh.exceptions.CommentException;
import com.zosh.exceptions.PostException;
import com.zosh.exceptions.UserException;
import com.zosh.models.Comment;
import com.zosh.models.Post;
import com.zosh.models.User;
import com.zosh.repository.CommentRepository;
import com.zosh.repository.PostRepository;

@Service
public class CommentServiceImplementation implements CommentService 
{
	@Autowired
	private PostService postService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private CommentRepository commentRepository;
	
	@Autowired
	private PostRepository postRepository;
	
	@Override
	public Comment createComment(Comment comment, Integer postId, Integer userId) throws CommentException, UserException, PostException 
	{
		User user = userService.findUserById(userId);
		Post post = postService.findPostById(postId);
		
		if(user==null && post==null)
		{
			throw new CommentException("User or post doesn't exist!");
		}
		
		comment.setUser(user);
		comment.setContent(comment.getContent());
		comment.setCreatedAt(LocalDateTime.now());
		
		Comment savedComment = commentRepository.save(comment);

		post.getComments().add(savedComment);
		
		postRepository.save(post);
		
		return savedComment;
	}

	@Override
	public Comment findCommentById(Integer commentId) throws CommentException 
	{
		Optional<Comment> opt = commentRepository.findById(commentId);
			
		if(opt.isEmpty())
		{
			throw new CommentException("comment doesn't exist with id "+ commentId);
		}	
		
		return opt.get();
	}

	@Override
	public Comment likeComment(Integer commentId, Integer userId) throws CommentException, UserException
	{
		Comment comment = findCommentById(commentId);
		
		User user = userService.findUserById(userId);
		
		if(user==null)
		{
			throw new CommentException("User doesn't exist with id "+ userId);
		}
		
		if(!comment.getLiked().contains(user))
		{
			comment.getLiked().add(user);
		}
		
		else
		{
			comment.getLiked().add(user);
		}

		return commentRepository.save(comment);
	}

}
