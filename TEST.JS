const targetElement = document.body;
const rawHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=c840ppHHIAfTsYbL&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
targetElement.insertAdjacentHTML('beforeend', rawHTML);
