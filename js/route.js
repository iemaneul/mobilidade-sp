export function encontrarRota(grafo, origens, destinos){

const origensLista = Array.isArray(origens) ? origens : [origens]
const destinosLista = Array.isArray(destinos) ? destinos : [destinos]
const destinosSet = new Set(destinosLista)
const distancias = new Map()
const anteriores = new Map()
const visitados = new Set()
const fila = []

origensLista.forEach(origem=>{
distancias.set(origem, 0)
fila.push({
no: origem,
distancia: 0
})
})

while(fila.length){

fila.sort((a, b)=>a.distancia - b.distancia)

const atual = fila.shift()

if(!atual || visitados.has(atual.no)){
continue
}

visitados.add(atual.no)

if(destinosSet.has(atual.no)){
return reconstruirCaminho(anteriores, atual.no)
}

const vizinhos = grafo[atual.no] || []

vizinhos.forEach(vizinho=>{

const novaDistancia = atual.distancia + Number(vizinho.tempo || 0)
const distanciaAtual = distancias.get(vizinho.destino)

if(distanciaAtual === undefined || novaDistancia < distanciaAtual){
distancias.set(vizinho.destino, novaDistancia)
anteriores.set(vizinho.destino, atual.no)
fila.push({
no: vizinho.destino,
distancia: novaDistancia
})
}

})

}

return null

}

function reconstruirCaminho(anteriores, destino){

const caminho = [destino]
let atual = destino

while(anteriores.has(atual)){
atual = anteriores.get(atual)
caminho.unshift(atual)
}

return caminho

}

export function encontrarKRotas(grafo, origens, destinos, k){

const origensLista = Array.isArray(origens) ? origens : [origens]
const destinosLista = Array.isArray(destinos) ? destinos : [destinos]
const primeiraRota = encontrarRota(grafo, origensLista, destinosLista)

if(!primeiraRota){
return []
}

const rotasEncontradas = [primeiraRota]
const candidatas = []

while(rotasEncontradas.length < k){

const rotaAnterior = rotasEncontradas[rotasEncontradas.length - 1]

for(let i = 0; i < rotaAnterior.length - 1; i += 1){

const noEsporao = rotaAnterior[i]
const caminhoRaiz = rotaAnterior.slice(0, i + 1)
const grafoModificado = removerArestasEnosDoCaminhoRaiz(grafo, rotasEncontradas, caminhoRaiz, i)
const rotaEsporao = encontrarRota(grafoModificado, [noEsporao], destinosLista)

if(!rotaEsporao){
continue
}

const rotaTotal = caminhoRaiz.slice(0, i).concat(rotaEsporao)
const chave = rotaTotal.join(">")
const jaExiste = rotasEncontradas.some(rota=>rota.join(">") === chave) ||
candidatas.some(candidata=>candidata.rota.join(">") === chave)

if(!jaExiste){
candidatas.push({
rota: rotaTotal,
tempo: calcularTempoDaRota(grafo, rotaTotal)
})
}

}

if(candidatas.length === 0){
break
}

candidatas.sort((a, b)=>a.tempo - b.tempo)

const proxima = candidatas.shift()

rotasEncontradas.push(proxima.rota)

}

return rotasEncontradas.map(rota=>({
rota,
tempo: calcularTempoDaRota(grafo, rota)
}))

}

function removerArestasEnosDoCaminhoRaiz(grafo, rotasEncontradas, caminhoRaiz, indiceEsporao){

const grafoModificado = {}

Object.keys(grafo).forEach(no=>{
grafoModificado[no] = grafo[no].slice()
})

rotasEncontradas.forEach(rota=>{

if(rota.length <= indiceEsporao + 1){
return
}

let mesmaRaiz = true

for(let i = 0; i <= indiceEsporao; i += 1){
if(rota[i] !== caminhoRaiz[i]){
mesmaRaiz = false
break
}
}

if(!mesmaRaiz){
return
}

const noOrigem = rota[indiceEsporao]
const noDestino = rota[indiceEsporao + 1]

if(grafoModificado[noOrigem]){
grafoModificado[noOrigem] = grafoModificado[noOrigem].filter(aresta=>aresta.destino !== noDestino)
}

})

caminhoRaiz.slice(0, indiceEsporao).forEach(no=>{
delete grafoModificado[no]
})

return grafoModificado

}

function calcularTempoDaRota(grafo, rota){

let total = 0

for(let i = 0; i < rota.length - 1; i += 1){
const origemId = rota[i]
const destinoId = rota[i + 1]
const aresta = (grafo[origemId] || []).find(item=>item.destino === destinoId)

if(aresta?.tempo){
total += Number(aresta.tempo)
}

}

return total

}
