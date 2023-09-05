
import useInput from "../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";
const isDescription = (value) => value.length > 10;

const CreatePost = (props) => {

    const {
        value: titleValue,
        isValid: titleIsValid,
        hasError: titleHasError,
        valueChangeHandler: titleChangeHandler,
        inputBlurHandler: titleBlurHandler,
        reset: resetTitle
    } = useInput(isNotEmpty);
    const {
        value: contentValue,
        isValid: contentIsValid,
        hasError: contentHasError,
        valueChangeHandler: contentChangeHandler,
        inputBlurHandler: contentBlurHandler,
        reset: resetContent
    } = useInput(isNotEmpty);
    const {
        value: descriptionValue,
        isValid: descriptionIsValid,
        hasError: descriptionHasError,
        valueChangeHandler: descriptionChangeHandler,
        inputBlurHandler: descriptionBlurHandler,
        reset: resetDescription
    } = useInput(isDescription);

    let formIsValid = false;

    if (titleIsValid && contentIsValid && descriptionIsValid) {
        formIsValid = true;
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }

        const post = {
            content: contentValue,
            description: descriptionValue,
            title: titleValue,
            categoryId:2
        };

        props.onAddPost(post);

        resetTitle();
        resetContent();
        resetDescription();
    };

    const titleClasses = titleHasError
        ? "form-control invalid"
        : "form-control";
    const contentClasses = contentHasError
        ? "form-control invalid"
        : "form-control";
    const descriptionClasses = descriptionHasError ? "form-control invalid" : "form-control";

    return (
        <form onSubmit={submitHandler}>
            <div className="control-group">
                <div className={titleClasses}>
                    <label htmlFor="name">Title</label>
                    <input
                        type="text"
                        id="name"
                        value={titleValue}
                        onChange={titleChangeHandler}
                        onBlur={titleBlurHandler}
                    />
                    {titleHasError && (
                        <p className="error-text">Please enter a valid title.</p>
                    )}
                </div>
                <div className={contentClasses}>
                    <label htmlFor="name">Content</label>
                    <input
                        type="text"
                        id="name"
                        value={contentValue}
                        onChange={contentChangeHandler}
                        onBlur={contentBlurHandler}
                    />
                    {contentHasError && (
                        <p className="error-text">Please enter a valid content.</p>
                    )}
                </div>
            </div>
            <div className={descriptionClasses}>
                <label htmlFor="name">Description</label>
                <input
                    type="text"
                    id="name"
                    value={descriptionValue}
                    onChange={descriptionChangeHandler}
                    onBlur={descriptionBlurHandler}
                />
                {descriptionHasError && (
                    <p className="error-text">Please enter a valid description.</p>
                )}
            </div>
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
                <button className="button-cancel" onClick={() => {
                    props.onChangePage("list");
                }}>Cancel</button>
            </div>
        </form>
    );
};

export default CreatePost;
