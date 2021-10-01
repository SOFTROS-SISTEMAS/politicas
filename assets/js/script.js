class Politicas {
    constructor() {
        this.markdown = new showdown.Converter()
        this.urls = {
            privacidade: "https://raw.githubusercontent.com/SOFTROS-SISTEMAS/politicas/master/privacidade.md",
            termos: "https://raw.githubusercontent.com/SOFTROS-SISTEMAS/politicas/master/termos.md"
        }
    }

    imprimir(md) {
        const html = this.markdown.makeHtml(md)
        document.getElementById("conteudo").innerHTML = html
    }

    requisicao(url) {
        fetch(url)
            .then(conteudo => {
                conteudo.text()
                    .then(markdown => {
                        this.imprimir(markdown)
                    })
                    .catch(() => {
                        this.imprimir('Não foi possível ler o markdown')
                    })
            })
            .catch(() => {
                this.imprimir('Não foi possível completar a requisição')
            })
    }

    termos() {
        this.requisicao(this.urls.termos)
    }

    privacidade() {
        this.requisicao(this.urls.privacidade)
    }

    url() {
        const tipo = window.location.search.replace("?", "")

        switch (tipo) {
            case "termos":
                return this.termos()

            case "privacidade": 
                return this.privacidade()
        }
    }
}

const politicas = new Politicas
politicas.url()


