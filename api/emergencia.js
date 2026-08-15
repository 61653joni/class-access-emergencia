import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const { aula } = req.query;

  if (!aula) {
    return res.status(400).json({ ok: false, error: 'Falta parametro aula' });
  }

  const mensaje = `Solicitan apoyo / modo emergencia en aula ${aula}`;

  const { error } = await supabase.from('mensajes').insert({ mensaje });

  if (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }

  return res.status(200).json({ ok: true });
}