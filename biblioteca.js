class EntidadeBibliografica{
    constructor(codigo, titulo, autor, anoPublicacao){
        this.codigo = codigo;
        this.titulo = titulo;
        this.autor = autor;
        this.anoPublicacao = anoPublicacao;
        this.isEmprestado = false;
        this.usuarioEmprestado = null;
    }

    emprestar(usuario)
    {
        if(this.isEmprestado === false)
        {
            this.isEmprestado = true;
            this.usuarioEmprestado = usuario;
            console.log(`Item emprestado para ${usuario.nome} com sucesso.`);
            return true;
        }
        else
        {
            console.log("Livro já emprestado");
            alert("Livro já emprestado");
            return false;
        }
    }

    devolver()
    {
        if(this.isEmprestado === true)
        {
            this.isEmprestado = false;
            this.usuarioEmprestado = null;
            
            return true;
        }
        else
        {
            console.log("Livro já devolvido");
            alert("Livro já devolvido");
            return false;
        }
    }
}

const GeneroLivro = {
    TEXTOS_RELIGIOSOS : "Textos Religiosos",
    TERROR : "Terror",
    COMEDIA : "Comédia",
    ROMANCE : "Romance",
    SUSPENSE : "Suspense",
    DRAMA : "Drama",
    FICCAO_CIENTIFICA : "Ficção Científica",
    HISTORIA : "História",
    CIENCIA : "Ciência",
    PROGRAMAÇÃO : "Programação"
};

class Livro extends EntidadeBibliografica{
    constructor(codigo, titulo, autor, anoPublicacao, isEmprestado, usuarioEmprestado, genero){
        super(codigo, titulo, autor, anoPublicacao, isEmprestado, usuarioEmprestado);
        this.genero = genero;
    }

    informacao()
    {
        console.log(this);

        if (this.usuarioEmprestado)
            {
                alert(`Livro: ${this.titulo} \nAutor: ${this.autor} \nAno: ${this.anoPublicacao} \nGênero: ${this.genero} \nEmprestado para: ${this.usuarioEmprestado.nome}`);
                return;
            }
                    
        alert(`Livro: ${this.titulo} \nAutor: ${this.autor} \nAno: ${this.anoPublicacao} \nGênero: ${this.genero} \nEmprestado para: Ninguém`);
    }
}

class Revista extends EntidadeBibliografica{
    constructor(codigo, titulo, autor, anoPublicacao, isEmprestado, usuarioEmprestado, edicao){
        super(codigo, titulo, autor, anoPublicacao, isEmprestado, usuarioEmprestado);
        this.edicao = edicao;
    }

    informacao() 
    {
        console.log(this);

        if (this.usuarioEmprestado)
            {
                alert(`Revista: ${this.titulo} \nAutor: ${this.autor} \nAno: ${this.anoPublicacao} \nEdição: ${this.edicao} \nEmprestado para: ${this.usuarioEmprestado.nome}`);
                return;
            }
                    
        alert(`Revista: ${this.titulo} \nAutor: ${this.autor} \nAno: ${this.anoPublicacao} \nEdição: ${this.edicao} \nEmprestado para: Ninguém`);
    }
}

class Usuario{
    constructor(nome, registroAcademico, dataNascimento){
        this.nome = nome;
        this.registroAcademico = registroAcademico;
        this.dataNascimento = dataNascimento;
    }
}

class Biblioteca{
    constructor(){
        this.acervo = []; 
        this.usuarios = [];
    }
    
    popularAcervo(acervoAPIreturn, usuarioAPIreturn){
        acervoAPIreturn.forEach(item => {
            if(item.entidadeBibliografica === "Livro")
            {
                let itemTemp = new Livro(item.codigo, item.titulo, item.autor, item.anoPublicacao, item.isEmprestado, item.usuarioEmprestado, item.genero);
                biblioteca.adicionarItem(itemTemp);
            }
            else if(item.entidadeBibliografica === "Revista")
            {
                let itemTemp = new Revista(item.codigo, item.titulo, item.autor, item.anoPublicacao, item.isEmprestado, item.usuarioEmprestado, item.edicao);
                biblioteca.adicionarItem(itemTemp);
            }
        });

        usuarioAPIreturn.forEach(usuario => {
            this.usuarios.push(new Usuario(usuario.nome, usuario.registroAcademico, usuario.dataNascimento));
        });
    }

    adicionarItem(item){
        const verificacaoCodigo = this.acervo.find(verificacaoCodigo => verificacaoCodigo.codigo === item.codigo);

        if(verificacaoCodigo)
        {
            if (primeiroAcesso == true)
            {
                primeiroAcesso = false; // genio da bola
            }
            else
            {
                console.log("Código já cadastrado");
                alert("Código já cadastrado");
                return;
            }
        }
        else{
            this.acervo.push(item);
            console.log(`Item ${item.titulo} adicionado ao acervo`);
        }
        
    }

    adicionarUsuario(usuario){
        this.usuarios.push(usuario);
        console.log(`Usuário ${usuario.nome} adicionado ao sistema`)
    }

    listarAcervo(){
        console.log("Acervo da Biblioteca:");
        const infoAlert = []; // sou muito esperto
        if (this.acervo.length > 0){
            this.acervo.forEach(item => {
                infoAlert.push(`Código: ${item.codigo} \nTítulo: ${item.titulo} \nAutor: ${item.autor} \nAno: ${item.anoPublicacao} \n`);
                console.log(`Código: ${item.codigo} \nTítulo: ${item.titulo} \nAutor: ${item.autor} \nAno: ${item.anoPublicacao} \n`)
            });
            alert(infoAlert.join('\n')); 
        }
        else{
            console.log("Acervo vazio");
        }
    }

    emprestarItem(codigoItem, registroAcademicoUsuario){
        const item = this.acervo.find(item => item.codigo === codigoItem);
        console.log(item);
        
        if(item)
        {
            const usuario = this.usuarios.find(usuario => usuario.registroAcademico === registroAcademicoUsuario);

            if (usuario){
                item.emprestar(usuario);
            }
            else{
                console.log("Usuário não encontrado");
                alert("Usuário não encontrado");
            }
        }
        else
        {
            console.log("Item não encontrado");
            alert("Item não encontrado");
        }
    }

    devolverItem(codigoItem){
        let item = this.acervo.find(item => item.codigo === codigoItem);

        if(item)
        {
            item.devolver();
        }
        else
        {
            console.log("Item não encontrado");
            alert("Item não encontrado");
        }
    }

}