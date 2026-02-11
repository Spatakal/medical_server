const supabase = require('../model/db');

/**
 * Add Medicine
 */
const addMedicine = async (req, res) => {
  try {
    const {
      medicine_name,
      brand_name,
      category,
      salt_composition,
      strength,
      price,
      stock_quantity,
      expiry_date,
      requires_prescription,
      usage_instructions,
      side_effects
    } = req.body;

    const { data, error } = await supabase
      .from('medicines')
      .insert([
        {
          medicine_name,
          brand_name,
          category,
          salt_composition,
          strength,
          price,
          stock_quantity,
          expiry_date,
          requires_prescription,
          usage_instructions,
          side_effects,
          is_active: true
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Medicine added successfully',
      data
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get All Medicines
 */
const getMedicines = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('medicines')
      .select('*')
      .eq('is_active', true)
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
 * Get Medicine by ID
 */
const getMedicine = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('medicines')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addMedicine,
  getMedicines,
  getMedicine
};
