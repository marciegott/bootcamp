/* 1: FACTORY FUNCTIONS: Crie bookFactory que retorna um objeto com 
title, author (String), pages, category e read (Boolean, false por padrão)
*/

function bookFactory(title, author, pages, genre, read = false, rating) {
    return {
        title,
        author,
        pages,
        genre,
        read,
        rating
    };
}

function printBook(book) {
    const stars = "⭐".repeat(book.rating);
    if (book.read) {
        console.log(`- [x] ${book.title} - ${book.author} (${book.pages}p) • ${book.genre} ${stars}`);
    } else {
        console.log(`- [ ] ${book.title} - ${book.author} (${book.pages}p) • ${book.genre}`);
    }
}

//2. Crie um objeto myBookshelf com: name e books (array vazio)
const myBookshelf = {
    nome: "Bookshelf da Marcie",
    books: [],
    //METHODS
    addBook: function (title, author, pages, genre, read, rating) {
        this.books.push(bookFactory(title, author, pages, genre, read, rating));
    },
    listAll: function () {
        this.books.forEach(book => {
            printBook(book);
        });
    },
    markAsRead: function (title) {
        //bookFound recebe o objeto inteiro se der true na minha condição
        const bookFound = this.books.find(book => book.title === title);
        if (bookFound) {
            bookFound.read = true;
        } else {
            console.log(`It seems you don't have ${title} in your bookself`);
        }
    },
    removeBook: function (title) {
        this.books = this.books.filter(book => book.title !== title);
    },
    updateBook: function (title, updates) {
        const book = this.books.find(book => book.title === title);
        if (book) {
            for (const key in updates) {
                book[key] = updates[key];
            }
        }
    },
    filterBooksBy: function (criteria, filter) {
        this.books.filter(book => book[criteria] === filter).forEach(book => {
            printBook(book);
        }
        );
    },
    //STATISTICS 
    get bookCount() {
        return this.books.length;
    },
    get readBooksCount() {
        return this.books.filter(book => book.read === true).length;
    },
    get unreadBooks() {
        return this.books.filter(book => book.read === false);
    },
    get unreadBooksCount() {
        return this.unreadBooks.length;
    },
    //transformar isso aqui em funçao
    getRandomBook: function () {
        if (this.unreadBooksCount === 0) {
            return `Unfortunately, you don’t have any unread books on your bookshelf yet!`;
        }
        const randomUnreadPosition = Math.floor(Math.random() * this.unreadBooksCount);
        //atribuir this.unread.mmdmdmd[sshhshshs] por variável
        return `Here’s a book from your shelf to discover today: ${this.unreadBooks[randomUnreadPosition].title} - ${this.unreadBooks[randomUnreadPosition].author} ${this.unreadBooks[randomUnreadPosition].pages}p • ${this.unreadBooks[randomUnreadPosition].genre}`;

    },
    get pageCount() {
        return this.books.reduce((total, book) => {
            return total + book.pages;
        }, 0);
    },
    get pagesRead() {
        return this.books.filter(book => book.read === true).reduce((total, book) => {
            return total + book.pages;
        }, 0);
    },
    get readingProgress() {
        if (this.bookCount === 0) {
            return 0;
        }
        return Math.round((this.readBooksCount / this.bookCount) * 100);
    },
    get readingProgressMessage() {
        if (this.bookCount === 0) {
            return "You don't have any books on your bookshelf yet. Once you add some, you'll be able to explore fun reading statistics.";
        }
        if (this.readBooksCount === 0) {
            return "You haven't read any of your books yet, but today seems like a perfect day to start!";
        }
        // criar mensagens personalizadas para quem leu bastante e pouco
        if (this.readingProgress > 50) {
            return `Congratulations! You've read ${readingProgress}% of your bookshelf!`
        }
        return `You've read ${this.readingProgress}% of your bookshelf. So many great stories are still ahead!`;
    },
};


//5. Popular dados com addBook
myBookshelf.addBook("De férias com você", "Emily Henry", 427, "Romance");
myBookshelf.addBook("Nem te conto", "Emily Henry", 488, "Romance");
myBookshelf.addBook("Daisy Jones and The Six", "Taylor Jenkins Reid", 360, "Romance");
myBookshelf.addBook("O avesso da Pele", "Jeferson Tenorio", 192, "Literatura contemporânea brasileira");
myBookshelf.addBook("A cabeça do Santo", "Socorro Acioli", 427, "Literatura contemporânea brasileira");
myBookshelf.addBook("Meridiana", "Eliana Alves Cruz", 184, "Literatura contemporânea brasileira");
myBookshelf.addBook("Poeta Chileno", "Alejandro Zambra", 432, "Literatura latinoamericana");
myBookshelf.addBook("O morro dos ventos uivantes", "Emily Bronte", 472, "Clássicos da literatura");

// TESTING THE METHODS

//listAll():
myBookshelf.listAll();
console.log("___________");

//markAsRead 
myBookshelf.markAsRead("PO avesso da Pele");
myBookshelf.markAsRead("O avesso da Pele");
myBookshelf.listAll();
console.log("___________");

//removeBook
myBookshelf.removeBook("A cabeça do Santo");

//listAll() to see the changes
myBookshelf.listAll();
console.log("___________");

//updateBook() 
myBookshelf.updateBook("O morro dos ventos uivantes", { genre: "Romance", pages: 473, rating: 5 });
myBookshelf.updateBook("O avesso da Pele", { rating: 5 });
myBookshelf.listAll();


//filterBooksBy
myBookshelf.filterBooksBy("genre", "Romance");
console.log("___________");

//showing the statistics 
console.log(`You have ${myBookshelf.bookCount} books on your bookshelf`);
const bookOrBooks = myBookshelf.readBooksCount === 1 ? "book" : "books"; // para corrigir a frase para o plural ou singular de acordo com a quantidade de livros lidos
console.log(`You've read ${myBookshelf.readBooksCount} ${bookOrBooks} on your bookshelf. Good job!`);
console.log(`You haven't read ${myBookshelf.unreadBooksCount} books on your bookshelf, which means ${myBookshelf.unreadBooksCount} opportunities to have fun :)`); //o que fazer se é um só
console.log(`In case you're curious, we did the math: you have ${myBookshelf.pageCount} pages on your bookshelf. So far, you've read ${myBookshelf.pagesRead} of them.`);
console.log(myBookshelf.readingProgressMessage);
console.log(myBookshelf.getRandomBook());
console.log(myBookshelf.getRandomBook());


