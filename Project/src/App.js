import React, { useState, useEffect, useCallback } from "react";

import PostsList from "./components/PostsList";
import "./App.css";
import useHttp from "./hooks/use-http";
import CreatePost from "./components/CreatePost";
import UpdatePost from "./components/UpdatePost";

const pageType = {
  list: 'list',
  create: 'create',
  edit: 'edit'
}
function App() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [createPost, setPageCreate] = useState(false);
  // const [updatePost, setUpdatePost] = useState(false);
  const [page, setPage] = useState(pageType.list);

  const handleChangePage = (page) => {
    setPage(page);
  };

  const inforPost = (post) => {
    console.log("post info:", post);
    setPost(post);
    setPage('edit')
  }

  const transformPosts = (postsObj) => {
    // console.log("transformPosts !!!");
    // console.log(postsObj);
    const loadedPosts = [];

    for (const key in postsObj.content) {
      loadedPosts.push({
        id: postsObj.content[key].id,
        title: postsObj.content[key].title,
        description: postsObj.content[key].description,
        content: postsObj.content[key].content,

      });
    }

    setPosts(loadedPosts);
  };
  const { isLoading, error, fetchPostsHandler: fetchPosts } = useHttp(
    {
      url: "http://localhost:8080/api/v1/posts",
      method: "GET",
    },
    transformPosts
  );

  const { fetchPostsHandler: detailPostHandler } = useHttp(
    {
      url: "http://localhost:8080/api/v1/post",
      method: "GET",
    },
    inforPost
  );

  useEffect(() => {
    if (page==='list') {
      fetchPosts();
    }
  }, [page]);

  const { fetchPostsHandler: addPostHandler } = useHttp({
    url: "http://localhost:8080/api/v1/posts",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  }, () => { setPage('list') });

  const { fetchPostsHandler: deletePostHandler } = useHttp({
    url: "http://localhost:8080/api/v1/posts/",
    method: "DELETE",
  }, ()=> {
    fetchPosts()
  });

  const deletePost = (id) => {
    const url = "http://localhost:8080/api/v1/posts/" + id;
    deletePostHandler(url);

  }

  const detailPost = (id) => {
    const url = "http://localhost:8080/api/v1/posts/" + id;
    detailPostHandler(url);

  }

  let content = <p>Found no posts.</p>;

  if (posts.length > 0) {
    content = <PostsList posts={posts} deletePost={deletePost} onChangePage={handleChangePage} detailPost={detailPost} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  const handleAddPost = (post) => {
    addPostHandler(null, post);
  };

  const handleFetchPosts = () => {
    setPageCreate(false)
    fetchPosts();
  }

  const renderPage = () => {
    switch (page) {
      case pageType.list:
        return content;
      case pageType.create:
        return <CreatePost onChangePage={handleChangePage} onAddPost={handleAddPost} />;
      case pageType.edit:
        return <UpdatePost onChangePage={handleChangePage} post={post} />;
      default:
        break;
    }
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={handleFetchPosts}>Home</button>
        <button className='button-create-post' onClick={() => handleChangePage(pageType.create)} >
          Create Post
        </button>
      </section>
      <section>
        {
          renderPage()
        }
      </section>

    </React.Fragment>
  );
}

export default App;
