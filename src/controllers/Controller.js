const {Client} = require("@googlemaps/google-maps-services-js");
const client = new Client({})
const buscaCep = require('busca-cep');
module.exports = {
    async index(req, res) {
        async function endereco() {
            let x;
            await buscaCep(req.query.cep, {sync: false, timeout: 1000}).then(json => x = json.logradouro + " " + req.query.number + ' ' + json.bairro +  " " + json.localidade + " " +  json.uf )
            return x
        }
        var address = await endereco()
        async function calculaDistancia() {
            let distancia;
             await client.distancematrix({
                params: {
                    key: "AIzaSyCgosuBIpEZ6osNDw95hY05XYBa3zhHlr4",
                    origins: ["Rua+Gilberto+Porto+1113+Nova+Gameleira+Belo+Horizonte"],
                    destinations: [address],
                    mode: "driving"
                },
                timeout: 1000,
            }).then(r => distancia = r.data.rows[0].elements[0].distance.text)
            return distancia
        }
        var distancia = await calculaDistancia()
        var distanciaFinal = distancia.replace(" km", "")
        function calculaPreco(){
            var preco
            if(distanciaFinal > 3){
                preco = 10.50 + ((distanciaFinal - 3) * 1.20) + 0.75
            } else {
                preco = 10.50 + 0.75
            }
            return preco
        }
        var preco = calculaPreco()
        var precoFinal = preco.toFixed(2)
        if(distanciaFinal > 7.907){
            return res.json({ status: 'error', message: 'Infelizmente, este endereço ainda está fora da nossa área de envio.' })
        } else {
            return res.json({ status: 'ok', distancia: distanciaFinal, preco: precoFinal })
        }
       
    },

}