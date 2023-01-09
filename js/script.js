(async ()=>{
    handleMenu();
    const articles = await handleArticles();
    handleModal(articles);
})()

function handleMenu() {
    const menubtn = document.getElementById('menubtn');
    const menucheck = document.getElementById('menu');
    const header = document.getElementsByTagName('header')[0];
    menubtn.addEventListener('click', (e)=>{
        header.classList.toggle('show')
    })
}

async function handleArticles() {
    const articles = await fetch('/articles.json');
    const json = await articles.json();
    addArticles(json);
    return json;
}

function addArticles(articles) {
    const articlesDiv = document.getElementById('articles');

    let i = 0;
    articles.forEach(article => {
        i++;
        const card = document.createElement('div');
        card.classList.add('card');
        card.id = article.id;
        card.style.animationDelay = `${i/2}s`;

        const img = document.createElement('img');
        img.src = article.images[0];

        const text = document.createElement('div');
        text.classList.add('text');
        const title = document.createElement('p');
        title.classList.add('title');
        title.innerText = article.title;
        const desc = document.createElement('p');
        desc.classList.add('desc');
        desc.innerHTML = article.description;
        text.appendChild(title);
        text.appendChild(desc);

        card.appendChild(img);
        card.appendChild(text);

        articlesDiv.appendChild(card);
    });
    return;
}

function handleModal(articles) {
    const cards = document.querySelector('.articles');
    cards.addEventListener('click', (e)=>{
        // Ignore if the article div is being clicked
        if (e.target.id !== 'articles') createModal(findArticle(e.target.id, articles));
    });
}

function createModal(article) {
    // Get the modal element
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.addEventListener('click', (e)=>{
        if (e.target.id === 'modal') {
            modal.remove();
        }
    })

    const imgDiv = document.createElement('div');
    imgDiv.classList.add('img');
    const img = document.createElement('img');
    imgDiv.appendChild(img);

    const text = document.createElement('div');
    text.classList.add('text');
    const title = document.createElement('p');
    const desc = document.createElement('p');

    console.log(article);

    title.innerText = article.title;
    desc.innerHTML = article.description;

    text.appendChild(title);
    text.appendChild(desc);

    let i = 0
    img.src = article.images[i];
    img.addEventListener('click', (e)=>{
        i += 1;

        if (i >= article.images.length) i = 0

        img.src = article.images[i]
    });

    modal.appendChild(imgDiv);
    modal.appendChild(text)
    document.body.appendChild(modal);
}

function findArticle(id, articles) {
    let response;
    for (const i in articles) {
        if (articles[i].id == id) {
            response = articles[i];
            break;
        }
    }
    return response;
}