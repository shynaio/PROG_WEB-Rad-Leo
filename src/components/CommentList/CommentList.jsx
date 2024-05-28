import { useRef } from "react";
import { MdRateReview } from "react-icons/md";
import { Comment } from "../../components/Comment/Comment";

import s from './CommentList.module.css';

//Component qui permet d'afficher les different commentaires ainsi que l'auteur de celui ci
export const CommentList = ({data, callback}) => {
    const commentInput = useRef();
    let commentKey = 0;

    const addCommentCallback = (event) => {
        if (event.key != 'Enter') return;

        const newComment = { author: 'Me', content: commentInput.current.value }
        commentInput.current.value = '';

        callback(newComment);
    };

    return (
        <div className={s.commentsBlock}>
            <h2>Reviews</h2>
            <div className={s.commentInputContainer}>
                <div className={s.commentIconContainer}><MdRateReview /></div>
                <input ref={commentInput} className={s.commentInput} type="text" placeholder="Add a review" onKeyUp={addCommentCallback}></input>
            </div>
            <div className={s.commentsContainer}>
                {data.map(comment => {
                    return <Comment data={comment} key={commentKey++}/>
                })}
            </div>
        </div>
    );
};