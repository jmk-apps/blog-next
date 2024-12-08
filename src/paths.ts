import { user } from "@nextui-org/react";

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
    },
    userAccount(userId: string) {
        return `/account/${userId}`;
    },
    search(term: string) {
        return `/search?term=${term}`;
    },
    searchCategory(category: string) {
        return `/search?category=${category}`;
    },
    searchDate(date: string) {
        return `/search?date=${date}`;
    },
    newsletters() {
        return '/newsletters';
    },
    newsletterShow(newsletterId: string) {
        return `/newsletters/${newsletterId}`;
    },
    newsletterEdit(newsletterId: string) {
        return `/newsletters/${newsletterId}/edit`;
    },
    subscribers() {
        return '/subscribers';
    },
    users() {
        return '/users';
    }
}

export default paths;
