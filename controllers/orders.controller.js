const supabase = require('../model/db');

/**
 * Add Order
 */
const addOrder = async (req, res) => {
  try {
    const {
      user_id,
      order_number,
      total_amount,
      payment_method,
      payment_status,
      order_status,
      delivery_address
    } = req.body;

    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          user_id,
          order_number,
          total_amount,
          payment_method,
          payment_status,
          order_status,
          delivery_address
        }
      ])
      .select()
      .single();

    if (error) {
      // unique constraint error (order_number)
      if (error.code === '23505') {
        return res.status(409).json({
          message: 'Order number already exists'
        });
      }
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Order placed successfully',
      data
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get All Orders
 */
const getOrders = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
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
 * Get Orders by User
 */
const getUserOrders = async (req, res) => {
  try {
    const { user_id } = req.params;

    const { data, error } = await supabase
      .from('orders')
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
 * Get Order by ID
 */
const getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Change Order Status
 */
const changeOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { order_status } = req.body;

    const { data, error } = await supabase
      .from('orders')
      .update({
        order_status,
        updated_at: new Date()
      })
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      return res.status(400).json({ error: 'Unable to update order status' });
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addOrder,
  getOrders,
  getUserOrders,
  getOrder,
  changeOrderStatus
};
