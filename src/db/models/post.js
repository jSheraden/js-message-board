export default (sequelize, DataTypes) => {
  const Post = sequelize.define('post', {
    body: DataTypes.TEXT
  });

  return Post;
};
