**1. Changes in the bookFactory:**

In the `bookFactory`, I changed the key named `category` to `genre` to better align with literary terminology. I also added a key called rating to store numbers between 1 and 5, which correspond to the number of stars the book deserves.

I’m still thinking about adding another property called `notes`, where the user can store their thoughts, favorite quotes, and any notes they have about the book.

**2. removeBook by delete or filter:**

When I was thinking about the `removeBook` method, two ideas came to my mind. The first was to use the `filter` method, but since I didn’t need to keep the original array, using `delete` also seemed like a good choice.

However, after some research into the `delete` syntax, I understood that this operator only deletes the content but does not remove the position from the array. This means the array would keep the same length as before, which would cause problems for other methods like `listAll`, `bookCount`, etc.

Because of that, I decided to use the `filter` method, reassigning the original array with the result of the condition. This effectively removes the book with the provided title, if that title exists in the original array.

this.books = this.books.filter(book => book.title !== title);

**updateBook:** 

My first solution was to ask for the `key` the user wanted to change and the new value, then check if the title provided by the user exists in the array of objects. After that, change the value assigned to the `key`. 

```js
const book = this.books.find(book => book.title === title);

       if (book) {

           book[category] = change;

       }
```

It worked, but I started to think about what if the user wants to change more than one thing at the same time, like they finished the book, wanted to give stars, and also change the author, or whatever. I did some research and understood that a better option would be to have an `object` as a parameter for the method `updateBook`:

myBookshelf.updateBook("O morro dos ventos uivantes", { genre: "Romance", pages: 473, rating: "5" });

Here, I have all the keys that the user wanted to change. 

```js
updateBook: function (title, updates) {
       const book = this.books.find(book => book.title === title);
       if (book) {
           for (const key in updates) {
               book[key] = updates[key];
           }
       }
   },
```

**Statistics:**

For statistics, I choose to use `getters` instead of `methods`. That’s because I understood that `getters` are for reading and `methods` are for actions. And in the statistics case, reading was what I wanted. 

I didn’t have to change any values, to print anything, so, it was easier to go through the `array` called `books` and find their length, for example, how many were unread, etc. 

```js
bookCount() {

       return this.books.length;

   },

   get readBooksCount() {

       return this.books.filter(book => book.read === true).length;

   },
```

**getRandomBook:** 

The exercise suggested showing a random book, but when thinking about the product, it made more sense to surface a random book the user hasn’t read yet. The idea is to encourage reading and help users rediscover the books they already own, which is one of the benefits of using the bookshelf page I’m building. 

To do that, I had to change the structure of my `unreadBookCount`. First, it looked like this: 

```js
   get unreadBookCount() {

       return this.books.filter(book => book.read === false).length;

   },

```

The problem was that I needed the unreadBooks array now, not only its size. So, I created a `getter` called `unreadBooks` that would be used by two different `getters`: `unreadBooksCount` and `getRandomBook`.

```js
get unreadBooks() {
       return this.books.filter(book => book.read === false);
   },
get unreadBooksCount() {
       return this.unreadBooks.length;
   },
get getRandomBook() {
    if (this.unreadBooks === 0) {
        return `Unfortunately, you don’t have any unread books on your bookshelf yet!`;
    
    }
    const randomUnreadPosition = Math.floor(Math.random() * this.unreadBooksCount);

    return `Here’s a book from your shelf to discover today: ${this.unreadBooks[randomUnreadPosition].title} - ${this.unreadBooks[randomUnreadPosition].author} ${this.unreadBooks[randomUnreadPosition].pages}p • ${this.unreadBooks[randomUnreadPosition].genre}`;
},
```

**Questions:**

1. How to display the stars?

