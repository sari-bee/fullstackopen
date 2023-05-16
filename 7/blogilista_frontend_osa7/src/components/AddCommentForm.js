const AddCommentForm = ({ addComment, id }) => {
    const handleAddComment = async (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value = ''
        addComment({
            content: content,
            id: id,
        })
    }

    return (
        <>
            <form onSubmit={handleAddComment}>
                <input type="text" name="content" id="content-input"/> <button type="submit" id="comment-submit-button">comment</button>
            </form>
        </>
    )
}

export default AddCommentForm