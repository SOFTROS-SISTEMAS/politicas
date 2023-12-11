class Politicas {
    constructor() {
        this.markdown = new showdown.Converter()
        this.urls = {
            privacidade: "/privacidade.md",
            termos: "/termos.md",
            exclusao: "/exclusao.md"
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

    exclusao() {
        this.requisicao(this.urls.exclusao)
    }

    url() {
        const tipo = window.location.search.replace("?", "")

        switch (tipo) {
            case "termo":
                return this.termos()

            case "privacidade": 
                return this.privacidade()

            case "exclusao":
                return this.exclusao()
        }
    }
}

const politicas = new Politicas
politicas.url()


