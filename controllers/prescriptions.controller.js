const supabase = require('../model/db');

/**
 * Add Prescription
 */
const addPrescription = async (req, res) => {
  try {
    const {
      user_id,
      doctor_name,
      prescription_image,
      extracted_text
    } = req.body;

    if (!user_id || !prescription_image) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const { data, error } = await supabase
      .from('prescriptions')
      .insert([
        {
          user_id,
          doctor_name,
          prescription_image,
          extracted_text
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Prescription uploaded successfully',
      data
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get All Prescriptions
 */
const getPrescriptions = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('prescriptions')
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
 * Get Prescriptions by User
 */
const getUserPrescriptions = async (req, res) => {
  try {
    const { user_id } = req.params;

    const { data, error } = await supabase
      .from('prescriptions')
      .select('*')
      .eq('user_id', user_id)
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
 * Get Prescription by ID
 */
const getPrescription = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('prescriptions')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addPrescription,
  getPrescriptions,
  getUserPrescriptions,
  getPrescription
};
