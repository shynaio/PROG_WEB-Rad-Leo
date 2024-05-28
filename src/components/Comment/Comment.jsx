import { useEffect, useState } from "react";

import s from './Comment.module.css';

//Component qui permet d'afficher un commentaire ainsi que l'auteur de celui-ci
export const Comment = ({data}) => {
    const renderComment = () => {
        if (data && data.content && data.author) {
            return (
                <div className={s.comment}>
                    <div className={s.commentContent}>{ data.content }</div>
                    <div className={s.commentAuthor}>Posted by: { data.author }</div>
                </div>
            );
        }
        return '';
    }

    return (
        <>
            { renderComment() }
        </>
    );
}