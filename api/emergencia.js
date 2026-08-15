import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  try {
    console.log('SUPABASE_URL existe:', !!process.env.SUPABASE_URL);
    console.log('SUPABASE_SERVICE_ROLE_KEY existe:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { aula } = req.query;

    if (!aula) {
      return res.status(400).json({ ok: false, error: 'Falta parametro aula' });
    }

    const mensaje = `Solicitan apoyo / modo emergencia en aula ${aula}`;

    const { error } = await supabase.from('Mensaje').insert({ mensaje });

    if (error) {
      console.error('Error de Supabase:', error);
      return res.status(500).json({ ok: false, error: error.message });
    }

    return res.status(200).json({ ok: true });

  } catch (err) {
    console.error('Error inesperado:', err);
    return res.status(500).json({ ok: false, error: err.message, stack: err.stack });
  }
}