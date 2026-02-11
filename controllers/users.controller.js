const supabase = require('../model/db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

/**
 * Add User
 */
const addUser = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // basic validation
    if (!name || !email || !phone || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // hash password
    const password_hash = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          id: uuidv4(), // keep UUID like before
          name,
          email,
          phone,
          password_hash,
          role
        }
      ])
      .select('id, name, email, phone, role, created_at')
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'User created successfully',
      user: data
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Fetch All Users
 */
const fetchUsers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, phone, role, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addUser,
  fetchUsers
};
