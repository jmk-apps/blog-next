
interface PostShowPageProps {
    params: {
        postId: string;
    }
}


export default function PostShowPage({params}: PostShowPageProps) {
    return (
        <>
            <div>Show Post Page</div>
            <div>Post id is : {params.postId}</div>
        </>

    )
}