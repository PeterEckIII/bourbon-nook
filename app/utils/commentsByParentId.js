const commentsByParentId = (comments) => {
  const group = {};

  comments.forEach((comment) => {
    group[comment.parentId] ||= [];
    group[comment.parentId].push(comment);
  });

  return group;
};

export { commentsByParentId };
