import { useState } from "react";

import useHttp from "../hooks/use-http";
import '../index.css';

const UpdatePost = (props) => {

    const [enteredTitle, setEnteredTitle] = useState(props.post.title ?? '');
    const [enteredTitleIsValid, setEnteredTitleIsValid] = useState(false);

    const [enteredContent, setEnteredContent] = useState(props.post.content ?? '');
    const [enteredContentIsValid, setEnteredContentIsValid] = useState(false);

    const [enteredDescription, setEnteredDescription] = useState(props.post.description ?? '');
    const [enteredDescriptionIsValid, setEnteredDescriptionIsValid] = useState(false);

    const titleInputChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    }
    const contentInputChangeHandler = (event) => {
        setEnteredContent(event.target.value);
    }
    const descriptionInputChangeHandler = (event) => {
        setEnteredDescription(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (enteredTitle.trim() === '') {
            setEnteredTitleIsValid(true);
            return;
        }

        if (enteredContent.trim() === '') {
            setEnteredContentIsValid(true);
            return;
        }

        if (enteredDescription.trim() === '') {
            setEnteredDescriptionIsValid(true);
            return;
        }

        setEnteredTitleIsValid(false);
        setEnteredContentIsValid(false);
        setEnteredDescriptionIsValid(false);

        const post = {
            id: props.post.id,
            content: enteredContent,
            description: enteredDescription,
            title: enteredTitle,
            categoryId: 2
        };

        hanlleUpdate(post);

    };
    const hanlleUpdate = (post) => {
        console.log("postpostpost:", post.id)
        const url = "http://localhost:8080/api/v1/posts/" + post.id;
        console.log("url", url);
        handleUpdatePost(url, post);

    }
    const handleUpdatePost = (url, post) => {
        updatePostHandler(url, post);
    };
    const { fetchPostsHandler: updatePostHandler } = useHttp({
        url: "http://localhost:8080/api/v1/posts",
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        }
    }, () => { props.onChangePage('list') });


    const titleClasses = enteredTitleIsValid
        ? "form-control invalid"
        : "form-control";
    const contentClasses = enteredContentIsValid
        ? "form-control invalid"
        : "form-control";
    const descriptionClasses = enteredDescriptionIsValid ? "form-control invalid" : "form-control";

    return (
        <form onSubmit={submitHandler}>
            <div className="control-group">
                <div className={titleClasses}>
                    <label htmlFor="name">Title</label>
                    <input
                        type="text"
                        id="name"
                        value={enteredTitle}
                        onChange={titleInputChangeHandler}

                    />
                    {enteredTitleIsValid &&
                        <p className="error-text">Please enter a title.</p>
                    }

                </div>
                <div className={contentClasses}>
                    <label htmlFor="name">Content</label>
                    <input
                        type="text"
                        id="name"
                        value={enteredContent}
                        onChange={contentInputChangeHandler}

                    />
                    {enteredContentIsValid &&
                        <p className="error-text">Please enter a content.</p>
                    }

                </div>
            </div>
            <div className={descriptionClasses}>
                <label htmlFor="name">Description</label>
                <input
                    type="text"
                    id="name"
                    value={enteredDescription}
                    onChange={descriptionInputChangeHandler}

                />
                {enteredDescriptionIsValid &&
                    <p className="error-text">Please enter a description.</p>
                }
            </div>
            <div className="form-actions">
                <button >Submit</button>
                <button className="button-cancel" onClick={() => {
                    props.onChangePage('list');
                }}>Cancel</button>
            </div>
        </form>
    );
};

export default UpdatePost;
