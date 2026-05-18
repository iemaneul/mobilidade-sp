let bancoPromise = null
let mapasPromise = null

async function carregarBanco(){

if(!bancoPromise){
bancoPromise = fetch(new URL("../data/metro-data.json", import.meta.url))
.then(async resposta=>{
if(!resposta.ok){
throw new Error(`Falha ao carregar a base local: ${resposta.status}`)
}

return resposta.json()
})
}

return bancoPromise

}

async function carregarMapas(){

if(!mapasPromise){
mapasPromise = carregarBanco().then(banco=>{
const linhas = Array.isArray(banco?.linhas) ? banco.linhas : []
const estacoes = Array.isArray(banco?.estacoes) ? banco.estacoes : []

return {
linhas,
estacoes,
linhasPorId: Object.fromEntries(linhas.map(linha=>[linha.id, linha])),
estacoesPorId: Object.fromEntries(estacoes.map(estacao=>[estacao.id, estacao]))
}
})
}

return mapasPromise

}

export async function getLinhas(){

const banco = await carregarBanco()

return Array.isArray(banco?.linhas) ? banco.linhas : []

}

export async function getEstacoes(){

const banco = await carregarBanco()

return Array.isArray(banco?.estacoes) ? banco.estacoes : []

}

export async function getEstacoesDaLinha(linhaId){

const banco = await carregarBanco()
const estacoesPorId = (await carregarMapas()).estacoesPorId
const paradas = Array.isArray(banco?.paradas_linha) ? banco.paradas_linha : []

return paradas
.filter(parada=>parada.linha_id === linhaId)
.sort((a, b)=>Number(a.ordem) - Number(b.ordem))
.map(parada=>({
ordem: parada.ordem,
estacoes: estacoesPorId[parada.estacao_id] || null
}))

}

export async function getParadasLinha(){

const banco = await carregarBanco()
const { linhasPorId, estacoesPorId } = await carregarMapas()
const paradas = Array.isArray(banco?.paradas_linha) ? banco.paradas_linha : []

return paradas.map(parada=>({
...parada,
linhas: linhasPorId[parada.linha_id] || null,
estacoes: estacoesPorId[parada.estacao_id] || null
}))

}

export async function getTrechosLinha(){

const banco = await carregarBanco()

return Array.isArray(banco?.trechos_linha) ? banco.trechos_linha : []

}

export async function getBaldeacoes(){

const banco = await carregarBanco()

return Array.isArray(banco?.baldeacoes) ? banco.baldeacoes : []

}
