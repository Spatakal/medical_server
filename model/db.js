const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Supabase client initialized successfully');
console.log(
  'URL:', process.env.SUPABASE_URL ? 'OK' : 'MISSING',
  'KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'OK' : 'MISSING'
);

module.exports = supabase;
