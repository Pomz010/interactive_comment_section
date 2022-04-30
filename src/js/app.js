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
    const http = new Posts;
    http.get('data.json')
        .then(data => {
            // console.log(data)
            loadData(data);
        })
        .catch(err => console.log(err));
}

// 2. Store retrieved data from json file to a variable
function loadData(json) {
    console.log(json);
    // Current user data
    const currentUserAvatarContainer = document.querySelector('#current-user__avatar');
    const avatarPng = json.currentUser.image.png;
    const avatarWebp = json.currentUser.image.webp;
    currentUserAvatarContainer.setAttribute('src', avatarWebp);
    
    /**** CREATE DATA ****
    1. Post new comments using current user
    2. Post new replies using current user
    */
    

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
        // comment.postComment();
        comment.showComment();
        comment.createReply();

        if(replies.length !== 0) {
            
            for(const reply of replies) {
                    const commentContainer = document.querySelector('#comments-section').getElementsByClassName('__comment-container');
                    const replyTo = commentContainer[userId - 1];
                    const replySection = document.createElement('div');
                    
                    replySection.setAttribute('class', 'comment-reply');
                    replySection.setAttribute('id', 'reply-section');
                    replyTo.appendChild(replySection);

                    const repAvatar = reply.user.image.webp;
                    const repUsername = reply.user.username;
                    const repCommentContent = reply.content;
                    const repCommentDate = reply.createdAt;
                    const repCommentScore = reply.score;
                    // console.log(reply)
                    
               
                // Instantiate each individual reply in a comment
                const newReply = new Reply(repAvatar, repUsername, repCommentDate, repCommentContent, repCommentScore, commentContainer);
                
                // Make a method call for newReply object
                // Method displays comment reply if found
                newReply.showReply();

                /* 
                    Method call that will make comment box stick on the
                    bottom of the screen
                */
                newReply.reply();
            }
        }
    })
}

// Comment constructor for main comments
class Comment {
    constructor(avatar, username, date, commentContent, score, commentContainer){
      this.avatar = avatar;
      this.username = username;
      this.commentDate = date;
      this.comment = commentContent;
      this.score = score;
      this.commentContainer = commentContainer;
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
                    
                        <div class="__command__vote--btn --btn">
                            <button class="up-vote vote--btn">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                            <span class="vote-count">${this.score}</span>
                            <button class="down-vote vote--btn">
                                <i class="fa-solid fa-minus"></i>
                            </button>
                        </div>
                        <button class="__command__reply--btn reply--btn --btn">
                            <i class="fa-solid fa-reply"></i>
                            Reply
                        </button>
                   
                </div>
            </div>
        `
        return createComment;
    }

    showComment() {
        let commentSection = document.querySelector('#comments-section');
        commentSection.innerHTML = displayComment(this.postComment());
    }

    createReply() {
        const replyBtn = document.querySelectorAll('.__command__reply--btn');
        const commentBox = document.querySelector('.new-comment');
        const selectedParent = document.querySelectorAll('.__comment-container');

        // Event listener for reply button
        replyBtn.forEach(btn => {
            const screenSize = screen.width;
            btn.addEventListener('click', reply);
            function reply(e) {
                if(e.target === btn && screen.width <= 768){
                    commentBox.classList.toggle('reply-box');
                } else if(e.target === btn && screen.width > 768) {
                    for(let i = 1; i != 3; i++) {
                        const newReplyBox = commentBox.cloneNode(true);
                        const parent = e.target.parentNode.parentNode;
                        const selectedComment = e.target.parentNode.parentNode
                        
                        // console.log(parent.children);
                        if(parent === selectedComment) {
                            parent.insertBefore(newReplyBox, parent.children[i]);
                            console.log(e.target.parentNode.parentNode);
                            
                        } else {
                            // console.log(false);
                            // parent.insertBefore(newReplyBox, parent.children[i])
                        }
                    }
                }
            }
        })

        window.addEventListener('scroll', removeReply);
        function removeReply(e) {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;

            if (Math.ceil(scrolled) === scrollable) {
                commentBox.classList.remove('reply-box');
            }
        }
    }
}


// Reply constructor for replies under comments
class Reply extends Comment {
    constructor(repAvatar, repUsername, repDate, repCommentContent, repCcore, commentContainer){
        super(repAvatar, repUsername, repDate, repCommentContent, repCcore, commentContainer);
    }

    showReply() {
        let replySection = document.querySelector('#reply-section');
        replySection.innerHTML = displayReply(this.postComment());
    }

    reply() {
        this.createReply();
    }
};

// 4. Display tags on html page
// Closure function for main comments
const displayComment = (function(comment){
    // string counter variable
    let count = '';
    const commentCounter = function(comment) {
        // Append each comment to the string counter variable
        return count += comment;
    }

    return commentCounter;
})();

// Closure function for replies in comment
const displayReply = (function(comment){
    // string counter variable
    let count = '';
    const replyCounter = function(comment) {
        // Append each comment to the string counter variable
        return count += comment;
    }

    return replyCounter;
})();


