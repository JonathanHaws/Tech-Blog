const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = [
  {
    username: 'Jon Doe',
    email: 'jon.doe@example.com',
    password: 'password1',
  },
  {
    username: 'Jane Doe',
    email: 'jane.doe@example.com',
    password: 'password2',
  },
];

const postData = [
  {
    title: 'Test 1',
    content: 'First test post here',
    user_id: 1,
  },
  {
    title: 'Test 2',
    content: 'Second test post here',
    user_id: 2,
  },
];

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  for (const user of userData) {
    await User.create(user, {
      individualHooks: true,
    });
  }

  for (const post of postData) {
    await Post.create(post);
  }

  process.exit(0);
};

seedDatabase();