
const { hashPassword, createToken, verifyToken, comparePassord } = require("../controller/auth");
// const { login, signup } = require("../middlewares/auth");


module.exports = (app, pool) => {

    app.get('/', (req, res)=>{
        res.status(200).send({message:'hello'})
    })
    app.post('/signup', async (req, res)=>{
        try {
            const { email, password, firstname, lastname, income } = req.body;
            console.log("fuckkkkkkk")
        
            const createUserQuery = `
              INSERT INTO users (email, password, firstname, lastname, income)
              VALUES ($1, $2, $3, $4, $5)
              RETURNING id, email, firstname, lastname, income;
            `;

            const password_hash = hashPassword(password);
        
            const values = [email, password_hash, firstname, lastname, income];
            const result = await pool.query(createUserQuery, values);
            const token = createToken(result.rows[0]);

            res.status(201).json({user:result.rows[0], token:token});
          } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send('Error creating user');
          }
    })
    app.post('/login', async (req, res)=>{

        console.log("fuckkkkkkk")
        const { email, password } = req.body;

        const loginQuery = `
            SELECT * FROM users WHERE email = $1;
        `;

        const values = [email];
        try {
            const result = await pool.query(loginQuery, values);

            if (result.rows.length === 1) {
                const hash = result.rows[0].password;
                if(comparePassord(password, hash)){
                    const token = createToken(result.rows[0]);
                    res.status(200).json({user:result.rows[0], token:token});
                }
                else{
                    
                    res.status(401).json({message:"Password didn't match"});
                }
            } else {
            res.status(401).json({ message: 'Login failed' });
            }
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).send('Error during login');
        }
        
    })
    app.post('/verify-user' , async(req, res)=>{
        try{
            const {token} = req.body;
            const {id, email} = verifyToken(token);
            const user = await pool.query(`select * from users where email = $1`, [email])
            if(user.rows.length>0){
                res.status(200).json({user:user.rows[0], token:token});
            }
            else{
                res.status(401).json({message:"Login failed"});
            }
        }
        catch(error){
            console.log(error.message)
            res.status(400).json({error:error.message});
        }
    })
    
}