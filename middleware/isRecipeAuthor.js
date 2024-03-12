const isRecipeAuthor = async (author_id , user_id) => {
    return author_id === user_id;
}

module.exports = isRecipeAuthor;