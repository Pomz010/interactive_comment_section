/**** READ DATA ****
1. Retrieve data from json file
   - user data
     1.avatar
     2.username
     3.comments
     4.comment date 
     5.comment votes
2. Store retrieved data from json file to a variable
3. Create dynamic html tags and append data retrieved
4. Display tags on html page
*/


/*1. Retrieva data from json file*/
// Add event listener that will fetch json file once document is fully loaded
document.addEventListener('DOMContentLoaded', displayComments);
function displayComments(e) {
    fetch('data.json')
        .then(res => res.json())
        .then(data => loadData(data));
}

// 2. Store retrieved data from json file to a variable
function loadData(json) {
    console.log(json);
    // Current user data
    const currentUserAvatar = json.currentUser.image.webp;
    const currentUsername = json.currentUser.username;

    // Main comments
    const commentData = json.comments;

    commentData.forEach(function(data) {
        //  Other user's data
        // console.log(data);
        const avatar = data.user.image.webp;
        const username = data.user.username;
        const commentContent = data.content;
        const commentDate = data.createdAt;
        const commentScore = data.score;
        const userId = data.id;
        const replies = data.replies;

        // Instantiate each individual comment data(user data)
        const comment = new Comment(avatar, username, commentDate, commentContent, commentScore);
        comment.postComment();
        comment.showComment();

        replies.forEach(reply => {
            const avatar = reply.user.image.webp;
            const username = reply.user.username;
            const commentContent = reply.content;
            const commentDate = reply.createdAt;
            const commentScore = reply.score;
            const userId = reply.id;
            const replyTo = reply.replies;

            // Instantiate each individual reply in a comment
            const newReply = new Reply(avatar, username, commentDate, commentContent, commentScore);
            // newReply.postComment();
            // newReply.postReply();
        })
    })
}

// Comment constructor for main comments
class Comment {
    constructor(avatar, username, date, commentContent, score){
      this.avatar = avatar;
      this.username = username;
      this.commentDate = date;
      this.comment = commentContent;
      this.score = score;
    }

    // 3. Create dynamic html tags and append data retrieved
    postComment() {
        const createComment = `
            <div class="__comment-container">
                <div class="__comment">
                    <div class="__comment__info">
                        <span class="__comment__avatar">
                            <img src=${this.avatar} alt="User Avatar">
                        </span>
                        <span class="__comment__username">${this.username}</span>
                        <span class="__comment__date">${this.commentDate}</span>
                    </div>
                    <p class="__comment__content">${this.comment}</p>
                    <div class="__comment__command">
                        <div class="__command__vote--btn --btn">
                            <button class="up-vote vote--btn">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                            <span class="vote-count">${this.score}</span>
                            <button class="down-vote vote--btn">
                                <i class="fa-solid fa-minus"></i>
                            </button>
                        </div>
                        <button class="__command__reply--btn --btn">
                            <i class="fa-solid fa-reply"></i>
                            Reply
                        </button>
                    </div>
                    <div class="comment-reply" id="reply-section"></div>
                </div>
            </div>
        `
        return createComment;
    }

    showComment() {
        let commentSection = document.querySelector('#comments-section');
        commentSection.innerHTML = displayComment(this.postComment());
    }
}


// // Reply constructor for replies under comments
class Reply extends Comment {
    constructor(avatar, username, date, commentContent, score){
        super(avatar, username, date, commentContent, score);
    }

    postReply() {
        let replySection = document.querySelector('#reply-section');
        replySection.innerHTML = displayComment(this.postComment());
    }
};

// 4. Display tags on html page
const displayComment = (function(comment){
    // string counter variable
    let createComment = '';
    return function(comment) {
        // Append each comment to the string counter variable
        return createComment += comment;
    }
})();


/**** CREATE DATA ****
1. Retrieve data from json file
   - user data
     1.avatar
     2.username
     3.comments
     4.comment date 
     5.comment votes
2. Store retrieved data from json file to a variable
3. Create dynamic html tags and append data retrieved
4. Display tags on html page
*/