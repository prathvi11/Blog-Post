// Sample blog posts data


// Function to display posts
function displayPosts(posts) {
    const postList = document.getElementById('postList');
    postList.innerHTML = '';
    posts.forEach(post => {
        const li = document.createElement('li');
        li.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
        postList.appendChild(li);
    });
}

// Filter posts based on search input
function filterPosts() {
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();
    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery) || post.content.toLowerCase().includes(searchQuery)
    );
    displayPosts(filteredPosts);
}

// Initialize with all posts
displayPosts(posts);

// Add event listener to search bar
document.getElementById('searchBar').addEventListener('input', filterPosts);





// Form validation
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    let valid = true;

    if (!name) {
        alert('Name is required');
        valid = false;
    }

    if (!email || !validateEmail(email)) {
        alert('A valid email is required');
        valid = false;
    }

    if (!message) {
        alert('Message is required');
        valid = false;
    }

    if (valid) {
        alert('Message sent successfully!');
        document.getElementById('contactForm').reset(); // Reset form fields
    }
});

// Function to validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


// Track likes for each post
const likes = { 1:0 };  //Example: { postId: likeCount }

//  Handle like button click
document.querySelectorAll('.like-button').forEach(button => {
    button.addEventListener('click', function() {
        const postId = this.getAttribute('data-id');
        likes[postId] = (likes[postId] || 0) + 1; //increment the count
        document.getElementById(`like-count-${postId}`).textContent = likes[postId];

    });
});


// Track comments for each post
const comments = { 1: [] }; // Example: { postId: [comment1, comment2, ...] }

// Function to handle comment submission
function submitComment(postId) {
    const commentInput = document.getElementById(`comment-input-${postId}`);
    const commentText = commentInput.value.trim();

    if (commentText) {
        // Add comment to the comments array
        if (!comments[postId]) {
            comments[postId] = [];
        }
        comments[postId].push(commentText);

        // Display the new comment
        const commentsList = document.getElementById(`comments-${postId}`);
        const commentItem = document.createElement('li');
        commentItem.textContent = commentText;
        commentsList.appendChild(commentItem);

        // Clear the input field
        commentInput.value = '';
    } else {
        alert('Comment cannot be empty!');
    }
}
