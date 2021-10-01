const converter = new showdown.Converter()

fetch('https://raw.githubusercontent.com/SOFTROS-SISTEMAS/politicas/master/privacidade.md').then(response => {
    response.text().then(md => {
        const html = converter.makeHtml(md)
        document.getElementById("conteudo").innerHTML = html
    })
})

    

