import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const client = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

const supabaseClient = () => client

export default supabaseClient
