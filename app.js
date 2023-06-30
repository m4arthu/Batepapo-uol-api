import express from "express"
import cors from "cors"
import { MongoClient, ObjectId } from "mongodb"
import dotenv from "dotenv"
import dayjs from "dayjs"
import Joi from "joi"
// Criação do app
const app = express()

// Configurações
app.use(cors())
app.use(express.json())
dotenv.config()

// Conexão com o Banco
const mongoClient = new MongoClient(process.env.DATABASE_URL)

mongoClient.connect()
    .then(() => {
        console.log("Data base  connected!!")
    }).catch((err) => {
        console.log(err.message)
    })

const db = mongoClient.db()
const date = Date.now()

// end-points 

app.post("/participants", async (req, res) => {
    const { name } = req.body
    let userData = {
        name: name,
        lastStatus: date
    }
    try {
        const userSchema = Joi.object({
            name: Joi.string().required(),
            lastStatus: Joi.number().required()
        })
        const validation = userSchema.validate(userData, { abortEarly: false })

        if (validation.error) {
            const errors = validation.error.details.map((detail) => detail.message);
            return res.status(422).send(errors);
        }

        let users = await db.collection("participants").find({ name }).toArray()
        if (users.length === 0) {
            await db.collection("participants").insertOne({
                name: userData.name,
                lastStatus: userData.lastStatus
            })

            await db.collection("messages").insertOne({
                from: name,
                to: 'Todos',
                text: 'entra na sala...',
                type: 'status',
                time: dayjs(date).format("HH:mm:ss")
            })
            res.status(201).send("User Created")
        } else {
            res.status(409).send("usuário ja criado")
        }
    } catch (error) {
        res.status(500).send("Deus ruim no server")
        console.log(error)
    }
})

app.get("/participants", async (req, res) => {
    try {
        let users = await db.collection("participants").find().toArray()
        res.status(200).send(users)
    } catch (err) {
        res.send(500).send(err.message)
    }
})

app.post("/messages", async (req, res) => {
    const { to, text, type } = req.body
    const { user } = req.headers
    const messageData = {
        from: user,
        to: to,
        text: text,
        type: type,
        time: dayjs(date).format("HH:mm:ss")
    }
    const messageSchema = Joi.object({
        from: Joi.string(),
        to: Joi.string().required(),
        text: Joi.string().required(),
        type: Joi.valid("message", "private_message").required(),
        time: Joi.required()
    })

    const usersData = await db.collection("participants").find().toArray()
    let users = []
    usersData.forEach((user) => {
        users.push(user.name)
    })

    // validação  de dados
    const validation = messageSchema.validate(messageData, { abortEarly: false })
    if (!user) {
        return res.status(404).send("header user is required")
    }
    if (validation.error) {
        console.log(validation.error.message)
        return res.status(422).send(validation.error.message)
    }
    if (users.indexOf(user) === -1) {
        return res.status(404).send("user not registed")
    }

    // postar no  db
    try {
        await db.collection("messages").insertOne(messageData)
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
})


app.get("/messages", async (req, res) => {
    try {
        let messages = await db.collection("messages").find().toArray()
        res.status(200).send(messages)
    } catch (err) {
        res.send(err.message)
        console.log(err.message)
    }
})

app.post("/status", async (req, res) => {
    try {
        const usersData = await db.collection("participants").find().toArray()
        const { user } = req.headers
        let users = []
        usersData.forEach((user) => {
            users.push(user.name)
        })
        // validação de usuário
        if(!user){
            return res.status(404).send("user header is required")
        }
        if(users.indexOf(user)=== -1){
            return res.status(404).send("user not registred")
        }
        let userData = await db.collection("participants").findOne({name: user})
        await db.collection("participants").updateOne({userData}, {$set:{lastStatus:dayjs(date).format("HH:mm:ss")}})
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

setInterval(async()=>{
    const usersData = await db.collection("participants").find().toArray()
    usersData.forEach(async (user) => {
        if(dayjs(user.lastStatus).format("ss") - dayjs(Date.now()).format("ss") > 10){
          try{
              await db.collection("participants").deleteOne({lastStatus: usersData.lastStatus})
              console.log("apagado")
            } catch (err){
                console.log(err.message)
            }
        }
    })
   
}, 15000)

app.listen(5000, () => console.log("server rodando na porta 5000!"))