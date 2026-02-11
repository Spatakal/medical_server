const supabase = require('../model/db');


/**
 * Create Doctor
 */
const addDoctor = async (req, res) => {
  try {
    const {
      doctor_name,
      specialization,
      qualification,
      experience_years,
      phone,
      email,
      clinic_address
    } = req.body;

    if (!doctor_name || !specialization || !phone) {
      return res.status(400).json({
        message: 'doctor_name, specialization and phone are required'
      });
    }

    const { data, error } = await supabase
      .from('doctors')
      .insert([
        {
          doctor_name,
          specialization,
          qualification,
          experience_years,
          phone,
          email,
          clinic_address
        }
      ])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({
          message: 'Phone or Email already exists'
        });
      }
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Doctor added successfully',
      data
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get All Doctors
 */
const getDoctors = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get Doctor by ID
 */
const getDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return res.status(404).json({
        message: 'Doctor not found'
      });
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get Doctors by Specialization
 */
const getDoctorsBySpec = async (req, res) => {
  try {
    const { specialization } = req.query;

    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .ilike('specialization', `%${specialization}%`);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addDoctor,
  getDoctors,
  getDoctor,
  getDoctorsBySpec
};
