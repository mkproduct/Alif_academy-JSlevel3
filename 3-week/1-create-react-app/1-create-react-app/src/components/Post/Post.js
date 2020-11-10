import React from "react";
import Tags from "../Tags/Tags";
import "./Post.css";

export default function Post({ post, onLike, onRemove, onShow }) {
  const { author, photo } = post;

  const handleClick = () => {
    onLike(post.id);
  };

  const handleRemove = () => {
    onRemove(post.id);
  };

  const handleHide = () => {
    onShow(post.id);
  };

  const header = (
    <header>
      <img src={author.avatar} alt={author.name} width="50" height="50" className="Post-avatar" />
      <h5>{author.name}</h5>
      {!post.hidden && <button onClick={handleRemove}>удалить</button>}
      <button onClick={handleHide}>{post.hidden ? "показать" : "скрыть"}</button>
      {!post.hidden && <div>{post.created}</div>}
      {!post.hidden && post.hit && <span>HIT</span>}
    </header>
  );

  // RENDER
  if (post.hidden) {
    return <article>{header}</article>;
  }

  return (
    <article>
      {header}
      <div>
        <div className="Post-content">{post.content}</div>
        {photo && <img src={photo.url} alt={photo.alt} className="Post-photo" />}
      </div>
      <footer>
        <span className="Post-likes" onClick={handleClick}>
          <img
            src={`https://lms.openjs.io/${post.likedByMe ? "liked" : "unliked"}.svg`}
            alt="likes"
            width="20"
            height="20"
          />
          <span className="Post-likes-count">{post.likes}</span>
          {post.tags && <Tags tags={post.tags} />}
        </span>
      </footer>
    </article>
  );
}
