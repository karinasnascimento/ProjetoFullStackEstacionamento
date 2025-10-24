const express = require("express");
const cors = require("cors"); //cors permite o uso de recursos externos
const porta = 3000;

const app = express();
app.use(express.json());
app.use(cors());

//VEICULOS é um conjunto inteiro | array: entre o colchete
let VEICULOS = [
    {id:1, placa:"ABC-1234", modelo:"Sedan",
    pago:true, hora_entrada: new Date().toISOString(), 
    },
    {id:2, placa:"ABC-1123", modelo:"SUV",
    pago:false, hora_entrada: new Date().toISOString()}
];

app.get("/",(req,res) => {
    res.status(200).json({msg:"Hello"});
});

app.get("/lerveiculos", (req,res) => {
    res.status(200).json(VEICULOS);
});

                    //id é parâmetro
app.get("/lerveiculos/:id", (req,res) => {
    const id = req.params.id;
    console.log(id);
    const meuCarro = VEICULOS.find(veiculo => veiculo.id === Number(id));

    res.status(200).json(meuCarro);
});

app.patch("/atualizarpagamento/:id",(req,res)=>{

    const veiculo = VEICULOS.find(x => x.id === Number(req.params.id));

    if (!veiculo) return res.status(404).json({erro: "Não encontrado"});

    const {pago} = req.body;

    if(pago !== undefined) veiculo.pago = pago;

    res.json(veiculo);
});

// app.delete("/deletarcarro/:id",(req,res)=>{

//     const veiculo = VEICULOS.find(x => x.id === Number(req.params.id));

//     if (!veiculo) return res.status(404).json({erro: "Não encontrado"});

//     const {carro} = req.body;

//     if(carro !== undefined) veiculo.carro = carro;

//     res.json(veiculo);
// });
app.delete("/deletarveiculo/:id", (req, res) =>{
    const id = Number(req.params.id);
    const indice = VEICULOS.findIndex(carro => carro.id === id)

    if(indice === -1){
        return res.status(404).json({
            msg: "Carro não encontrado ou já foi deletado"
        })
    }

    console.log(indice)
    VEICULOS.splice(indice, 1);
    res.status(204).json({msg: "Deletado com sucesso"});
});  

app.listen(porta,() => {
    console.log(`Servidor rodando no http://localhost:${porta}`);
});