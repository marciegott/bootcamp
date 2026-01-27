const books = [
    {
        title: "Dom Casmurro",
        author: "Machado de Assis",
        pages: 256,
        read: true,
        category: "Literatura Brasileira"
    },
    {
        title: "A Hora da Estrela",
        author: "Clarice Lispector",
        pages: 88,
        read: false,
        category: "Literatura Brasileira"
    },
    {
        title: "Meridiana",
        author: "Eliana Alves Cruz",
        pages: 184,
        read: true,
        category: "Literatura Brasileira"
    }
];

// 1. Criar uma função que retorna a quantidade total de livros da estante.
function countBooks(books) {
    return books.length;
}

// 2. Criar funções que retornam: quantidade de livros lidos e quantidade de livros não lidos 
function countReadBooks(books) {
    return books.reduce((total, book) => {
        if (book.read) {
            total += 1;
        }
        return total;
    }, 0);
}

function countUnreadBooks(books) {
    return books.reduce((total, book) => {
        if (!book.read) {
            total += 1;
        }
        return total;
    }, 0);
}

// 3. Criar uma função que retorna: total de páginas da estante => usar .reduce().
function countPages(books) {
    return books.reduce((total, book) => {
        total += book.pages;
        return total;
    }, 0);
}

// 4. Criar uma função que: considera apenas livros lidos e soma o total de páginas lidas
function countReadPages(books) {
    //book.filter(tuafuncao).reduce(tuaoturafincao)
    return books.filter((book) => { return book.read === true }).reduce((total, book) => { return total += book.pages; }, 0);
}

// TESTES:
console.log(`O total de livros na estante é de ${countBooks(books)} livros`);
console.log(`O total de livros lidos é de ${countReadBooks(books)} livros`);
console.log(`O total de livros não lidos é de ${countUnreadBooks(books)} livros`);
console.log(`O total de páginas da estante é ${countPages(books)} páginas`);
console.log(`O total de páginas lidas da estante é ${countReadPages(books)} páginas`);


