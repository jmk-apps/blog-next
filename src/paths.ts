const paths = {
    home() {
        return '/';
    },
    signin() {
        return '/signin';
    },
    signup() {
        return '/signup';
    },
    about(){
        return '/about';
    },
    contact() {
        return '/contact';
    },
    postCreate() {
        return '/posts/new';
    },
    postShow(postId: string) {
        return `/posts/${postId}`;
    },
    account() {
        return '/account';
    }
}

export default paths;
