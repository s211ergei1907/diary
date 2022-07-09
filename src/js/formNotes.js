export function formNotes(notes) {
    return notes.map(({ title, content, createDate, modified, lastModified, imageLink, id }) => {
        //ToDo add checked
        return `
            <div class="note" id='${id}'>
                    <div>
                        <h2 class="note__title">${title}</h2>
                        <input class="checkbox" type="checkbox" data-id=${id}><br/>
                        <button class="change_note" data-id=${id}>Изменить</button>
                    </div>
                    <div class="note__content">${content}</div>
                    <p class="note__createDate">Создано: ${createDate}</p>
                    ${imageLink ? `<img class="images__js" src="${imageLink}" alt="">` : ''}
                    ${modified ? `<p>Изменено: <i> ${lastModified}</i></p>` : ''}
            </div>
        `;
    });
}