import { Pool } from 'pg'

// this loads config from .env
// ebst if called as awit pool.query()
export const pool = new Pool()