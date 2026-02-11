const supabase = require('../model/db');

/**
 * Create Medicine–Disease Mapping
 */
const createMap = async (req, res) => {
  try {
    const { medicine_id, disease_id } = req.body;

    if (!medicine_id || !disease_id) {
      return res.status(400).json({ message: 'medicine_id and disease_id required' });
    }

    const { data, error } = await supabase
      .from('medicine_disease_map')
      .insert([
        { medicine_id, disease_id }
      ])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({
          message: 'This medicine is already mapped to this disease'
        });
      }
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Medicine mapped to disease successfully',
      data
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get Medicines by Disease
 */
const medicinesByDisease = async (req, res) => {
  try {
    const { disease_id } = req.params;

    const { data, error } = await supabase
      .from('medicine_disease_map')
      .select(`
        medicines (
          *
        )
      `)
      .eq('disease_id', disease_id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // flatten response
    const medicines = data
      .map(item => item.medicines)
      .filter(med => med && med.is_active === true);

    res.json(medicines);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get Diseases by Medicine
 */
const diseasesByMedicine = async (req, res) => {
  try {
    const { medicine_id } = req.params;

    const { data, error } = await supabase
      .from('medicine_disease_map')
      .select(`
        diseases (
          *
        )
      `)
      .eq('medicine_id', medicine_id);

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
  medicinesByDisease,
  diseasesByMedicine
};
