const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const isMongo = process.env.MONGO_URI && process.env.MONGO_URI.trim() !== '';

// Mongoose User Schema
let UserSchema;
let UserModel;
if (isMongo) {
  UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true }
  });
  UserModel = mongoose.model('User', UserSchema);
}

const dbPath = path.join(__dirname, 'db.json');

// Ensure db.json exists with correct structure
if (!isMongo) {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ users: [] }, null, 2));
  }
}

async function connectDB() {
  if (isMongo) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB Connected...');
    } catch (err) {
      console.error('MongoDB Connection Error:', err.message);
      process.exit(1);
    }
  } else {
    console.log('Using local JSON file database fallback...');
  }
}

function readJSON() {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return { users: [] };
  }
}

function writeJSON(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

async function findUserByEmail(email) {
  if (isMongo) {
    return await UserModel.findOne({ email: email.toLowerCase() });
  } else {
    const db = readJSON();
    return db.users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  }
}

async function findUserById(id) {
  if (isMongo) {
    return await UserModel.findById(id);
  } else {
    const db = readJSON();
    return db.users.find(u => u._id === id) || null;
  }
}

async function createUser({ firstName, email, phone, password }) {
  if (isMongo) {
    const newUser = new UserModel({
      firstName,
      email: email.toLowerCase(),
      phone,
      password
    });
    return await newUser.save();
  } else {
    const db = readJSON();
    const newUser = {
      _id: Date.now().toString(),
      firstName,
      email: email.toLowerCase(),
      phone,
      password
    };
    db.users.push(newUser);
    writeJSON(db);
    return newUser;
  }
}

module.exports = {
  connectDB,
  findUserByEmail,
  findUserById,
  createUser,
  isMongo
};
