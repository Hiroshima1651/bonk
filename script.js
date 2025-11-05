function supportIdea(id) {
    const idea = ideas.find(i => i.id === id);
    idea.supporters++;
    renderIdeas();
    showModal(
        '❤️ Apoio Registrado!',
        `Obrigado por apoiar "${idea.title}"! Seu apoio ajuda esta ideia a ganhar visibilidade e se tornar realidade.`,
        ''
    );
}

function discussIdea(id) {
    const idea = ideas.find(i => i.id === id);
    if (!comments[id]) comments[id] = [];
    
    const commentsHTML = comments[id].map(c => `
        <div class="comment">
            <div class="comment-author">${c.author}</div>
            <div>${c.text}</div>
        </div>
    `).join('');

    showModal(
        `💬 Discutir: ${idea.title}`,
        `Compartilhe suas opiniões e sugestões sobre esta ideia:`,
        `
        <div class="discussion-area">
            <textarea class="discussion-input" id="commentInput" placeholder="Escreva seu comentário..."></textarea>
            <button class="btn btn-discuss" onclick="addComment(${id})">Enviar Comentário</button>
            <div class="comments">${commentsHTML || '<p style="color: #999; text-align: center; padding: 20px;">Seja o primeiro a comentar!</p>'}</div>
        </div>
        `
    );
}

function addComment(id) {
    const input = document.getElementById('commentInput');
    const text = input.value.trim();
    if (text) {
        if (!comments[id]) comments[id] = [];
        comments[id].push({
            author: 'Usuário ' + Math.floor(Math.random() * 1000),
            text: text
        });
        const idea = ideas.find(i => i.id === id);
        idea.discussions = comments[id].length;
        renderIdeas();
        discussIdea(id);
    }
}

function showModal(title, text, extra) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalText').textContent = text;
    document.getElementById('modalExtra').innerHTML = extra;
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Inicializar
renderTabs();
renderIdeas();