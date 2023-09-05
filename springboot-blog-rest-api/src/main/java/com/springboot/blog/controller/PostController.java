package com.springboot.blog.controller;

import com.springboot.blog.entity.Post;
import com.springboot.blog.payload.PostDto;
import com.springboot.blog.payload.PostDtoV2;
import com.springboot.blog.payload.PostResponse;
import com.springboot.blog.service.PostService;
import com.springboot.blog.utils.AppConstants;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping()
@Tag(name = "CRUD REST APIs for Post Resource")
public class PostController {

        private PostService postService;

        public PostController(PostService postService) {
                this.postService = postService;
        }

        // @Operation(summary = "Create Post REST API", description = "Create Post REST API is used to save post into database")
        // @ApiResponse(responseCode = "201", description = "Http Status 201 CREATED")
        // @SecurityRequirement(name = "Bear Authentication")
        // create blog post rest api
        // @PreAuthorize("hasRole('admin')")
        @PostMapping("/api/v1/posts")
        public ResponseEntity<PostDto> createPost(@Valid @RequestBody PostDto postDto) {
                return new ResponseEntity<>(postService.createPost(postDto), HttpStatus.CREATED);
        }

        // @Operation(summary = "Get All Posts REST API", description = "Get All Posts REST API is used to fetch all the posts from the database")
        // @ApiResponse(responseCode = "200", description = "Http Status 200 SUCCESS")
        // get all posts rest api
        @GetMapping("/api/v1/posts")
        public PostResponse getAllPosts(
                        @RequestParam(value = "pageNo", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
                        @RequestParam(value = "pageSize", defaultValue = AppConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
                        @RequestParam(value = "sortBy", defaultValue = AppConstants.DEFAULT_SORT_BY, required = false) String sortBy,
                        @RequestParam(value = "sortDir", defaultValue = AppConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir,
                        @RequestParam(value = "search",  defaultValue = AppConstants.DEFAULT_SEARCH,required = false) String search) {
                return postService.getAllPosts(pageNo, pageSize, sortBy, sortDir, search);
        }

        // @Operation(summary = "Get Post By Id REST API", description = "Get Post By Id REST API is used to get single post from the database")
        // @ApiResponse(responseCode = "200", description = "Http Status 200 SUCCESS")
        // get post by id
        @GetMapping("/api/v1/posts/{id}")
        public ResponseEntity<PostDto> getPostByIdV1(@PathVariable(name = "id") long id) {
                return ResponseEntity.ok(postService.getPostById(id));
        }

        // get post by id
        @GetMapping("/api/v2/posts/{id}")
        public ResponseEntity<PostDtoV2> getPostByIdV2(@PathVariable(name = "id") long id) {
                PostDto postDto = postService.getPostById(id);
                PostDtoV2 postDtoV2 = new PostDtoV2();
                postDtoV2.setId(postDto.getId());
                postDtoV2.setTitle(postDto.getTitle());
                postDtoV2.setDescription(postDto.getDescription());
                postDtoV2.setContent(postDto.getContent());
                List<String> tags = new ArrayList<>();
                tags.add("Java");
                tags.add("Spring Boot");
                tags.add("AWS");

                return ResponseEntity.ok(postDtoV2);
        }

        // @Operation(summary = "update Post REST API", description = "Update Post REST API is used to update a particular post in the database")
        // @ApiResponse(responseCode = "200", description = "Http Status 200 SUCCESS")
        @SecurityRequirement(name = "Bear Authentication")
        // update post by id rest api
       
        @PutMapping("/api/v1/posts/{id}")
        public ResponseEntity<PostDto> updatePost(@Valid @RequestBody PostDto postDto,
                        @PathVariable(name = "id") long id) {

                PostDto postResponse = postService.updatePost(postDto, id);

                return new ResponseEntity<>(postResponse, HttpStatus.OK);
        }

        // @Operation(summary = "Delete Post REST API", description = "Delete Post REST API is used to delete a particular post from the database")
        // @ApiResponse(responseCode = "200", description = "Http Status 200 SUCCESS")
       
        @DeleteMapping("/api/v1/posts/{id}")
        public ResponseEntity<String> deletePost(@PathVariable(name = "id") long id) {

                postService.deletePostById(id);

                return new ResponseEntity<>("{\"message\":\"Post entity deleted successfully.\"}", HttpStatus.OK);
        }

        // Build Get Posts by Category REST API
        // http://localhost:8080/api/posts/category/3
        @GetMapping("/category/{id}")
        public ResponseEntity<List<PostDto>> getPostsByCategory(@PathVariable("id") Long categoryId) {
                List<PostDto> postDtos = postService.getPostsByCategory(categoryId);
                return ResponseEntity.ok(postDtos);
        }

        @GetMapping("/api/v1/posts/search")
        public ResponseEntity<List<Post>> searchPosts(String query) {
                return ResponseEntity.ok(postService.searchPostDtos(query));
        }
}
