function repeatMessages(message) {
    let html = '';
    for (let i = 1; i <= 100; i++) {
      html += `<p>${message} ${i}</p>`;
    }
    return html;
  }