const { verifyToken } = require('../controller/auth');
const pool = require('../db/config');
const { isAuth } = require('../middlewares/auth');
module.exports = (app, db) => {
    app.post('/expenses/create', async (req, res) => {
        try {
          const { user_id, expenses } = req.body;
      
          const insertedExpenses = [];
      
          for (const expense of expenses) {
            const { category, description, date, amount } = expense;
            const query = `
              INSERT INTO expenses (user_id, category, description, date, amount)
              VALUES ($1, $2, $3, $4, $5)
              RETURNING id, category, amount, date
            `;
            const result = await pool.query(query, [user_id, category, description, date, amount]);
            insertedExpenses.push(result.rows[0]);
          }
      
          res.status(201).json({ expenses: insertedExpenses });
        } catch (error) {
          console.log(error);
          res.status(500).send('Error creating expenses');
        }
      });
      app.post('/expenses/edit', async (req, res) => {
        try {
          const { id, amount } = req.body;
          const query = `
              update expenses set amount = $1 where id = $2
            `;
      
            const result = await pool.query(query, [amount, id]);
      
          res.status(201).json({ expense: result.rows[0] });
        } catch (error) {
          console.log(error);
          res.status(500).send('Error creating expenses');
        }
      });
      app.post('/expenses/delete', async (req, res) => {
        try {
          const { id } = req.body;
          const query = `
              delete from expenses where id = $1
            `;
      
            const result = await pool.query(query, [id]);
      
          res.status(201).json({ message:"Success" });
        } catch (error) {
          console.log(error);
          res.status(500).send('Error creating expenses');
        }
      });

      app.get('/expenses/get/yearly/:year/:month/', isAuth,  async (req, res) => {
        
        try {
            const t = req.headers.authorization;
            const token = t.split(" ").length>1?t.split(" ")[1]:t.split(" ")[0];
            const {user, id} = verifyToken(token);
            console.log(id)

            const query = `
                SELECT MIN(id) AS id, user_id AS userid, to_char(date, 'YYYY-MM') AS month,
                        SUM(amount) AS total_amount
                FROM expenses
                WHERE user_id = $1
                GROUP BY month, user_id
                ORDER BY month
            `;
        
            const result = await pool.query(query, [id]);
            const months = result.rows;
        
            const data = [];
        
            for (const month of months) {
                const monthData = {
                    month: month.month,
                    totalAmount: month.total_amount,
                    days: [],
                    id: month.id,
                    user_id:month.userid
                };
        
                const daysQuery = `
                    SELECT DISTINCT ON (day) id, to_char(date, 'YYYY-MM-DD') AS day
                    FROM expenses
                    WHERE to_char(date, 'YYYY-MM') = $1
                    ORDER BY day, id;
                `;
        
                const daysResult = await pool.query(daysQuery, [month.month]);
                const days = daysResult.rows;

                console.log(days, "days")
        
                for (const day of days) {
                    const dayData = {
                        day: day.day,
                        id: day.id,
                        expenses: [],
                    };
        
                    const expensesQuery = `
                        SELECT id, category, description, amount
                        FROM expenses
                        WHERE to_char(date, 'YYYY-MM-DD') = $1
                        ORDER BY category;
                    `;
        
                    const expensesResult = await pool.query(expensesQuery, [day.day]);
                    dayData.expenses = expensesResult.rows;
                    
                    const t = expensesResult.rows.reduce((total, expense) => parseFloat(total) + parseFloat(expense.amount), 0);
                    dayData.totalAmount = parseFloat(t);
                    monthData.days.push(dayData);
                }
        
                data.push(monthData);
            }
        
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching expenses.' });
        }
    });
    
    
      
    app.get('/expenses/get/monthly/:year/:month', isAuth, async (req, res) => {
        try {
          const { year, month } = req.params;
          const t = req.headers.authorization;
            const token = t.split(" ").length>1?t.split(" ")[1]:t.split(" ")[0];
            const {user, id} = verifyToken(token);
            console.log(id, "id")
      
          // Construct the start and end date for the selected month
          const startDate = `${year}-${month}-01`;

          const mon = parseInt(month);
          const lastDay = new Date(year, mon, 0 ).getDate();
            console.log(new Date(year, mon, 0 ))
            console.log(lastDay, "ppp")

          const endDate = `${year}-${month}-${lastDay}`;

      
          const query = `
            SELECT * FROM expenses
            WHERE user_id = $1 AND date >= $2 AND date <= $3
          `;
          const result = await pool.query(query, [id, startDate, endDate]);
          const totalQuery = `
            SELECT SUM(amount) AS total_amount FROM expenses
            WHERE user_id = $1 AND date >= $2 AND date <= $3
            `;
            const totalResult = await pool.query(totalQuery, [id, startDate, endDate]);
    
          res.status(200).json({total: totalResult.rows[0].total_amount || 0, expenses:result.rows});
        } catch (error) {
          console.log(error, "error");
          res.status(500).send('Error fetching expenses');
        }
      });
      
    
      
    
}