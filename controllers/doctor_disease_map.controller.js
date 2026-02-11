const supabase = require('../model/db');

/**
 * Create Doctor–Disease Mapping
 */
const createMap = async (req, res) => {
  try {
    const { doctor_id, disease_id } = req.body;

    if (!doctor_id || !disease_id) {
      return res.status(400).json({
        message: 'doctor_id and disease_id required'
      });
    }

    const { data, error } = await supabase
      .from('doctor_disease_map')
      .insert([
        { doctor_id, disease_id }
      ])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({
          message: 'This doctor is already mapped to this disease'
        });
      }
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Doctor mapped to disease successfully',
      data
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get Doctors by Disease
 */
const doctorsByDisease = async (req, res) => {
  try {
    const { disease_id } = req.params;

    const { data, error } = await supabase
      .from('doctor_disease_map')
      .select(`
        doctors (
          *
        )
      `)
      .eq('disease_id', disease_id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const doctors = data
      .map(item => item.doctors)
      .filter(Boolean);

    res.json(doctors);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get Diseases by Doctor
 */
const diseasesByDoctor = async (req, res) => {
  try {
    const { doctor_id } = req.params;

    const { data, error } = await supabase
      .from('doctor_disease_map')
      .select(`
        diseases (
          *
        )
      `)
      .eq('doctor_id', doctor_id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const diseases = data
      .map(item => item.diseases)
      .filter(Boolean);

    res.json(diseases);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createMap,
  doctorsByDisease,
  diseasesByDoctor
};
