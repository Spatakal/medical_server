const supabase = require('../model/db');

/**
 * Create Disease
 */
const addDisease = async (req, res) => {
  try {
    const {
      disease_name,
      symptoms,
      description,
      severity_level
    } = req.body;

    if (!disease_name) {
      return res.status(400).json({
        message: 'disease_name is required'
      });
    }

    const { data, error } = await supabase
      .from('diseases')
      .insert([
        {
          disease_name,
          symptoms,
          description,
          severity_level
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Disease added successfully',
      data
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get All Diseases
 */
const getDiseases = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('diseases')
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
 * Get Disease by ID
 */
const getDisease = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('diseases')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return res.status(404).json({
        message: 'Disease not found'
      });
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addDisease,
  getDiseases,
  getDisease
};
