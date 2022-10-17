"use strict";

const db = require("../db");
const { NotFoundError} = require("../expressError");

/** Related functions for jobs. */

class Job {
  /** Create a job (from data), update db, return new job data.
   *
   * data should be { title, salary, equity, companyHandle }
   *
   * Returns { id, title, salary, equity, companyHandle }
   *
   * */

  static async create({ title, salary, equity, companyHandle }) {
    const result = await db.query(
      `INSERT INTO jobs (title, salary, equity, company_handle)
       VALUES ($1, $2, $3, $4)
       RETURNING id, title, salary, equity, company_handle AS "companyHandle"`,
      [title, salary, equity, companyHandle]);

    const job = result.rows[0];

    return job;
  }


  /** Find all jobs
   * 
   * Returns [{ id, title, salary, equity, companyHandle }, ...]
   */

  static async findAll() {
    let query = `SELECT j.id, j.title, j.salary, j.equity,
                  j.company_handle AS "companyHandle",
                  c.name AS "companyName"
                FROM jobs AS j
                LEFT JOIN companies AS c
                ON c.handle = j.company_handle`;
    
    const variablesSQL = []
    const queries = [] // container for filtered queries

    query += ' ORDER BY title'

    const jobsRes = await db.query(query)

    return jobsRes.rows
  }


  /** Given a job id, return data about that job.
   * 
   * Returns { id, title, salary, equity, companyHandle, company }
   *  where company is { handle, name, description, numEmployees, logoUrl }
   * 
   * Throws NotFoundError if not found
   */

  static async get(id) {
    const jobResult = await db.query(`
      SELECT id, title, salary, equity, company_handle AS "companyHandle"
      FROM jobs
      WHERE id = $1
    `, [id])

    const job = jobResult.rows[0]

    if (!job) {
      throw new NotFoundError(`Job "${id}" not found`)
    }

    const companiesResult = await db.query(`
      SELECT handle, name, description,
              num_employees AS "numEmployees", logo_url AS "logoUrl"
      FROM companies
      WHERE handle = $1
    `, [job.companyHandle])

    delete job.companyHandle // replaced with below

    job.company = companiesResult.rows[0] // company key => company info

    return job
  }
}


module.exports = Job