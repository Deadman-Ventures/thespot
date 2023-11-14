import { Pool } from 'pg'

// this loads config from .env
// ebst if called as awit pool.query()
const pool = new Pool()

export const query = async (text, params) => {
    const start = Date.now()
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('executed query', { text, duration, rows: res.rowCount })
    return res
}