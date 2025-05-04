const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/Users"); // Adjust path if needed
const UserPost = require("./models/UserPost"); // Adjust path if needed

dotenv.config();

// ✅ Full user list with fixed _id fields
const sampleUsers = [
  {
    _id: new mongoose.Types.ObjectId('663b3c1a4f9d4a3f9a7b8d01'),
    username: "john_doe",
    email: "john.doe@example.com",
    profilePicture: "https://images.pexels.com/photos/3735213/pexels-photo-3735213.jpeg?auto=compress&cs=tinysrgb&w=800",
    createdAt: new Date("2025-04-01T08:00:00Z"),
    password: "password123",
  },
  {
    _id: new mongoose.Types.ObjectId('663b3c1a4f9d4a3f9a7b8d02'),
    username: "jane_smith",
    email: "jane.smith@example.com",
    profilePicture: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800",
    createdAt: new Date("2025-04-02T09:15:00Z"),
    password: "securePass",
  },
  {
    _id: new mongoose.Types.ObjectId('663b3c1a4f9d4a3f9a7b8d03'),
    username: "mike_ross",
    email: "mike.ross@example.com",
    profilePicture: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800",
    createdAt: new Date("2025-04-03T10:30:00Z"),
    password: "mikeSecret",
  },
  {
    _id: new mongoose.Types.ObjectId('663b3c1a4f9d4a3f9a7b8d04'),
    username: "sara_jones",
    email: "sara.jones@example.com",
    profilePicture: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
    createdAt: new Date("2025-04-04T11:45:00Z"),
    password: "saraPass",
  },
  {
    _id: new mongoose.Types.ObjectId('663b3c1a4f9d4a3f9a7b8d05'),
    username: "emma_white",
    email: "emma.white@example.com",
    profilePicture: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800",
    createdAt: new Date("2025-04-05T13:00:00Z"),
    password: "emmaPass",
  },
  {
    _id: new mongoose.Types.ObjectId('663b3c1a4f9d4a3f9a7b8d06'),
    username: "alex_grant",
    email: "alex.grant@example.com",
    profilePicture: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800",
    createdAt: new Date("2025-04-06T14:15:00Z"),
    password: "alexPass",
  },
  {
    _id: new mongoose.Types.ObjectId('663b3c1a4f9d4a3f9a7b8d07'),
    username: "lucy_lee",
    email: "lucy.lee@example.com",
    profilePicture: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800",
    createdAt: new Date("2025-04-07T15:30:00Z"),
    password: "lucyPass",
  },
  {
    _id: new mongoose.Types.ObjectId('663b3c1a4f9d4a3f9a7b8d08'),
    username: "daniel_king",
    email: "daniel.king@example.com",
    profilePicture: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800",
    createdAt: new Date("2025-04-08T16:45:00Z"),
    password: "danielPass",
  },
  {
    _id: new mongoose.Types.ObjectId('663b3c1a4f9d4a3f9a7b8d09'),
    username: "olivia_moore",
    email: "olivia.moore@example.com",
    profilePicture: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800",
    createdAt: new Date("2025-04-09T18:00:00Z"),
    password: "oliviaPass",
  },
  {
    _id: new mongoose.Types.ObjectId('663b3c1a4f9d4a3f9a7b8d10'),
    username: "chris_patel",
    email: "chris.patel@example.com",
    profilePicture: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=800",
    createdAt: new Date("2025-04-10T19:15:00Z"),
    password: "chrisPass",
  },
  {
    _id: new mongoose.Types.ObjectId('663b3c1a4f9d4a3f9a7b8d11'),
    username: "emily_smith",
    email: "emily.smith@example.com",
    profilePicture: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800",
    createdAt: new Date("2025-04-11T20:30:00Z"),
    password: "emilyPass",
  },
  {
    _id: new mongoose.Types.ObjectId('663b3c1a4f9d4a3f9a7b8d12'),
    username: "jason_brown",
    email: "jason.brown@example.com",
    profilePicture: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800",
    createdAt: new Date("2025-04-12T21:45:00Z"),
    password: "jasonPass",
  },
  {
    _id: new mongoose.Types.ObjectId('663b3c1a4f9d4a3f9a7b8d13'),
    username: "nina_adams",
    email: "nina.adams@example.com",
    profilePicture: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=800",
    createdAt: new Date("2025-04-13T23:00:00Z"),
    password: "ninaPass",
  },
  {
    _id: new mongoose.Types.ObjectId('663b3c1a4f9d4a3f9a7b8d14'),
    username: "sam_clark",
    email: "sam.clark@example.com",
    profilePicture: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800",
    createdAt: new Date("2025-04-14T00:15:00Z"),
    password: "samPass",
  },
];

// ✅ Full posts list (same as your original, no changes)
const samplePosts = [
  {
    author: '663b3c1a4f9d4a3f9a7b8d01', // john_doe
    content: 'Had an amazing day at the beach! 🌊☀️',
    media: 'https://example.com/media/beach_photo.jpg',
    likes: ['663b3c1a4f9d4a3f9a7b8d01', '663b3c1a4f9d4a3f9a7b8d02'],
    comments: [
      {
        author: '663b3c1a4f9d4a3f9a7b8d02',
        text: 'Wow, looks beautiful! 😍',
        createdAt: new Date('2025-04-30T10:30:00Z'),
      },
    ],
  },
  {
    author: '663b3c1a4f9d4a3f9a7b8d03',
    content: 'Learning some new skills today! 💻',
    media: '',
    likes: ['663b3c1a4f9d4a3f9a7b8d03'],
    comments: [],
  },
  {
    author: '663b3c1a4f9d4a3f9a7b8d04',
    content: 'Just finished a great book! 📚',
    media: 'https://example.com/media/book_cover.jpg',
    likes: ['663b3c1a4f9d4a3f9a7b8d04', '663b3c1a4f9d4a3f9a7b8d05'],
    comments: [
      {
        author: '663b3c1a4f9d4a3f9a7b8d06',
        text: 'What book was it? 📖',
        createdAt: new Date('2025-04-29T08:15:00Z'),
      },
      {
        author: '663b3c1a4f9d4a3f9a7b8d07',
        text: 'I love reading too!',
        createdAt: new Date('2025-04-29T09:00:00Z'),
      },
    ],
  },
  {
    author: '663b3c1a4f9d4a3f9a7b8d08',
    content: 'Tried a new recipe today! 🍽️',
    media: 'https://example.com/media/recipe_photo.jpg',
    likes: ['663b3c1a4f9d4a3f9a7b8d06'],
    comments: [],
  },
  {
    author: '663b3c1a4f9d4a3f9a7b8d09',
    content: 'Nothing beats a good cup of coffee ☕',
    media: '',
    likes: ['663b3c1a4f9d4a3f9a7b8d07', '663b3c1a4f9d4a3f9a7b8d08'],
    comments: [
      {
        author: '663b3c1a4f9d4a3f9a7b8d10',
        text: 'I couldn’t agree more!',
        createdAt: new Date('2025-04-28T07:30:00Z'),
      },
    ],
  },
  {
    author: '663b3c1a4f9d4a3f9a7b8d11',
    content: 'Weekend hiking trip was incredible! 🏞️',
    media: 'https://example.com/media/hike_photo.jpg',
    likes: ['663b3c1a4f9d4a3f9a7b8d09'],
    comments: [],
  },
  {
    author: '663b3c1a4f9d4a3f9a7b8d12',
    content: 'Finally finished the project! 🎉',
    media: '',
    likes: ['663b3c1a4f9d4a3f9a7b8d10', '663b3c1a4f9d4a3f9a7b8d11'],
    comments: [
      {
        author: '663b3c1a4f9d4a3f9a7b8d13',
        text: 'That’s awesome! What’s the next project?',
        createdAt: new Date('2025-04-27T15:00:00Z'),
      },
    ],
  },
  {
    author: '663b3c1a4f9d4a3f9a7b8d14',
    content: 'Visited the art museum today. Amazing pieces! 🎨',
    media: 'https://example.com/media/art_photo.jpg',
    likes: ['663b3c1a4f9d4a3f9a7b8d12'],
    comments: [],
  },
  {
    author: '663b3c1a4f9d4a3f9a7b8d15',
    content: 'Running is the best stress relief. 🏃‍♀️',
    media: '',
    likes: [],
    comments: [],
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected!");

    await User.deleteMany({});
    console.log("🗑️ Existing users removed.");

    await UserPost.deleteMany({});
    console.log("🗑️ Existing posts removed.");

    await User.insertMany(sampleUsers);
    console.log(`✅ ${sampleUsers.length} users inserted.`);

    await UserPost.insertMany(samplePosts);
    console.log(`✅ ${samplePosts.length} posts inserted.`);

    await mongoose.disconnect();
    console.log("✅ MongoDB disconnected.");
  })
  .catch((err) => {
    console.error("❌ Error seeding data:", err);
    mongoose.disconnect();
  });
