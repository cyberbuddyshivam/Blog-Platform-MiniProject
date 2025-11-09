package com.blogapp.backend.service;

import com.blogapp.backend.dto.request.PostRequest;
import com.blogapp.backend.dto.response.PostResponse;
import com.blogapp.backend.entity.Category;
import com.blogapp.backend.entity.Post;
import com.blogapp.backend.entity.User;
import com.blogapp.backend.exception.ResourceNotFoundException;
import com.blogapp.backend.repository.CategoryRepository;
import com.blogapp.backend.repository.PostRepository;
import com.blogapp.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public List<PostResponse> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public PostResponse getPostById(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + id));
        return convertToResponse(post);
    }

    public PostResponse createPost(PostRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User author = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Post post = new Post();
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setAuthor(author);

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
            post.setCategory(category);
        }

        Post savedPost = postRepository.save(post);
        return convertToResponse(savedPost);
    }

    public PostResponse updatePost(Long id, PostRequest request) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found"));

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!post.getAuthor().getUsername().equals(username)) {
            throw new RuntimeException("You can only edit your own posts");
        }

        post.setTitle(request.getTitle());
        post.setContent(request.getContent());

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
            post.setCategory(category);
        }

        Post updatedPost = postRepository.save(post);
        return convertToResponse(updatedPost);
    }

    public void deletePost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found"));

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!post.getAuthor().getUsername().equals(username)) {
            throw new RuntimeException("You can only delete your own posts");
        }

        postRepository.delete(post);
    }

    public List<PostResponse> searchPosts(String keyword) {
        return postRepository.searchPosts(keyword)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private PostResponse convertToResponse(Post post) {
        return PostResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .authorName(post.getAuthor().getUsername())
                .authorId(post.getAuthor().getId())
                .categoryName(post.getCategory() != null ? post.getCategory().getName() : null)
                .categoryId(post.getCategory() != null ? post.getCategory().getId() : null)
                .commentCount(post.getComments().size())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .build();
    }
}
