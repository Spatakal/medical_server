const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const supabase = require('../config/supabase')

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !user) {
      return res.status(401).json({ message: 'Invalid email' })
    }

    const isMatch = await bcrypt.compare(password, user.password_hash)

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.jwt_key,
      { expiresIn: '1d' }
    )

    res.json({
      email: user.email,
      name: user.name,
      role: user.role,
      message: 'Login success',
      token
    })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
