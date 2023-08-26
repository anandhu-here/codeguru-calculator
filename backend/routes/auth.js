
const { hashPassword, createToken, verifyToken, comparePassord } = require("../controller/auth");
// const { login, signup } = require("../middlewares/auth");

const pool = require('../db/config')
module.exports = (app, db) => {

    app.get('/', (req, res)=>{
        res.status(200).send({message:'hello'})
    })
    app.post('/signup', async (req, res)=>{
        try {
            const { email, password, firstname, lastname, income } = req.body;
        
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
        // const { email, password } = req.body;
        // db.User.findOne({where:{email}, include:[{
        //     model:db.Carer,
        //     as:'carer'
        // }]}).then(user=>{
        //     if(user && comparePassord(password, user.password) ){
        //         const token = createToken(user);
        //         res.status(200).send({
        //             token,
        //             user
        //         })
        //     }
        //     else{
        //         res.status(404).send({error:"User not found"})
        //     }
        // }).catch(e=>{
        //     res.status(400).send({error:'Login error try again'})
        // })
        
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
    app.get('/get/carers', async(req, res)=>{
        try{
            const carers = await db.Carer.findAll();
            res.status(200).send(carers);
        }
        catch(e){
            res.status(500).send({error:e.message})
        }
    })
    app.post('/delete', async (req, res)=>{
        const {email} = req.body;
        // db.Carer.findOne({where:{id:1}}).then(u=>u.destroy()).catch(e=>console.log(e))
        
        try{
            const user = await db.User.findOne({where:{email}});
            if(user){
                user.destroy();
                res.status(200).send({message:"User deleted"})
            }
            res.status(400).send({error:"User not found"})
        }
        catch(e){
            res.status(400).send({error:e.message})
        }
        
    })
    app.get('/user', (req, res)=>{
        const { email } = req.query;
        // db.User.findOne({where:{email}}).then(user)
        db.User.findOne( { where:{ email }} ).then(user=>{
            if(!user){
                res.status(404).json({error:'User not Found'})
            }
            else{
                if(user.role === "HOME"){
                    db.User.findOne( { where:{ email }, include:[{
                        model:db.Home,
                        as:'home'
                    }]} ).then(user=>{
                        res.status(200).send({user})
                    }).catch(e=>{
                        res.status(400).send({error:e.message})
                    })
                }
                else if(user.role === "CARER"){
                    db.User.findOne( { where:{ email }, include:[{
                        model:db.Carer,
                        as:'carer'
                    }]} ).then(user=>{
                        res.status(200).send({usr})
                    }).catch(e=>{
                        res.status(400).send({error:e.message})
                    })
                }
            }
            
        }).catch(e=>{
            res.status(400).send({error:e.message})
        })
    })

    app.post('/update/profile', async (req, res)=>{
        try{
            const { firstName, lastName, phone, postcode, adress1, city, dob, company } = req.body;
            const token = req.headers.authorization
            try{
                const {id, email, role} = verifyToken(token);
                if(role === "HOME"){
                    console.log(email, "email")
                    db.Home.findOne({where:{userId:id}}).then(home=>{
                        home.update({
                            ...req.body
                        })
                        res.status(201).send({message:"Updated"})
                    }).catch(e=>{
                        res.status(400).send({error:e.messsage})
                    })   
                }
                else if(role === "CARER"){
                    db.Carer.findOne({where:{userId:id}}).then(carer=>{
                        carer.update({
                            ...req.body
                        })
                        res.status(201).send({message:"Updated"})
                    }).catch(e=>{
                        res.status(400).send({error:e.messsage})
                    })   
                }
            }
            catch(e){
                res.status(400).send({error:'Invalid Token'})
            }
            
        }
        catch(e){
            res.status(400).send({error:e.messsage})
        }
    })
}