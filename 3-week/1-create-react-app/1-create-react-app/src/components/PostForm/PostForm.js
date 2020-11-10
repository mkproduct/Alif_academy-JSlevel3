import React, { useState } from "react";
export default function PostForm({ onSave }) {
  const initialPost = {
    id: null,
    author: {
      avatar: "https://lms.openjs.io/logo_js.svg",
      name: "OpenJS",
    },
    content: "",
    photo: {
      url: "",
      alt: "",
    },
    hit: false,
    likes: 0,
    likedByMe: false,
    hidden: false,
    tags: null,
    created: null,
  };
  const [post, setPost] = useState(initialPost);

  // submit
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const ID = Date.now();
    const photo = post.photo.url.length ? post.photo : null;
    // prettier-ignore
    let tags = post.tags?.replace(/#/gi, "").split(" ").filter((o) => o.length) || [];
    tags = tags.length ? tags : null;

    onSave({ ...post, id: ID, created: ID, photo, tags });
    setPost(initialPost);
  };

  // onChange
  const handleChange = (ev) => {
    const { name, value } = ev.target;
    switch (name) {
      case "photo":
        setPost((prevState) => ({ ...prevState, photo: { ...prevState.photo, url: value } }));
        break;
      case "alt":
        setPost((prevState) => ({ ...prevState, photo: { ...prevState.photo, alt: value } }));
        break;
      default:
        setPost((prevState) => ({ ...prevState, [name]: value }));
        break;
    }
  };

  // RENDER
  return (
    <form onSubmit={handleSubmit}>
      <textarea name="content" value={post.content} onChange={handleChange}></textarea>
      <input name="tags" value={post.tags || ""} onChange={handleChange} />
      <input name="photo" placeholder="photo" onChange={handleChange} />
      <input name="alt" placeholder="alt" onChange={handleChange} />
      <button>Ok</button>
    </form>
  );
}
