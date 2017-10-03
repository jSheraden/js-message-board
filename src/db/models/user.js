export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {});

  return User;
};
