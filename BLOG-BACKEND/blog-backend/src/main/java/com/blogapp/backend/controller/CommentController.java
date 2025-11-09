package com.blogapp.backend.controller;

import com.blogapp.backend.dto.request.CommentRequest;
import com.blogapp.backend.dto.response.CommentDTO;
import com.blogapp.backend.dto.response.MessageResponse;
import com.blogapp.backend.entity.Comment;
import com.blogapp.backend.service.CommentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/posts/{postId}/comments")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping
    public ResponseEntity<List<CommentDTO>> getCommentsByPostId(@PathVariable Long postId) {
        List<Comment> comments = commentService.getCommentsByPostId(postId);
        List<CommentDTO> commentDTOs = comments.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(commentDTOs);
    }

    @PostMapping
    public ResponseEntity<CommentDTO> createComment(@PathVariable Long postId, @Valid @RequestBody CommentRequest request) {
        Comment comment = commentService.createComment(postId, request);
        return ResponseEntity.ok(convertToDTO(comment));
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<MessageResponse> deleteComment(@PathVariable Long commentId, @PathVariable Long postId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.ok(new MessageResponse("Comment deleted successfully"));
    }

    private CommentDTO convertToDTO(Comment comment) {
        return CommentDTO.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .username(comment.getUser() != null ? comment.getUser().getUsername() : "Unknown")
                .createdAt(comment.getCreatedAt())
                .build();
    }
}
