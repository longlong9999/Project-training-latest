import React, { useState } from 'react';

import './PostsList.module.css';

const PostList = (props) => {

  return (
    <div>

      <div className="container">
        <div className="row">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Content</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {props.posts && props.posts.map((post, index) =>
                <tr key={post.id}>
                  <td>{index + 1}</td>
                  <td>{post.title}</td>
                  <td>{post.description}</td>
                  <td>{post.content}</td>
                  <td>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group" style={{ marginBottom: "20px" }}>
                        <button className='btn btn-sm btn-outline-secondary' onClick={() => props.detailPost(post.id)} >
                          Update
                        </button>
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => props.deletePost(post.id)}>Delete</button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PostList;
