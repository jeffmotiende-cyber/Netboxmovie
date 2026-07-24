const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Admin user details
    const adminData = {
      name: 'Admin',
      username: 'admin',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin',
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({
      $or: [{ email: adminData.email }, { username: adminData.username }],
    });

    if (existingAdmin) {
      // Update existing user's role to admin if not already
      if (existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        await existingAdmin.save();
        console.log(`User ${existingAdmin.email} role updated to admin`);
      } else {
        console.log(`Admin user already exists: ${existingAdmin.email}`);
      }
    } else {
      // Create new admin user (password auto-hashed by User model pre-save hook)
      const admin = await User.create(adminData);
      console.log(`Admin user created successfully:`);
      console.log(`  Name:     ${admin.name}`);
      console.log(`  Username: ${admin.username}`);
      console.log(`  Email:    ${admin.email}`);
      console.log(`  Role:     ${admin.role}`);
    }

    // Verify the admin user
    const verifiedAdmin = await User.findOne({ email: adminData.email });
    console.log(`\nVerification - User found: ${!!verifiedAdmin}`);
    if (verifiedAdmin) {
      console.log(`  Role: ${verifiedAdmin.role}`);
    }

    await mongoose.disconnect();
    console.log('\nMongoDB disconnected. Seed complete.');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seedAdmin();

