class OpenGallery extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :root {
          --subtleBackgroundColor: #f5f5f5;
          --activeColor: #74d274;
          --logoColor: #cccccc;
          --photoBackground: #f4f4f4;
        }

        @media (prefers-color-scheme: dark) {
          :root {
            --subtleBackgroundColor: #3a3b3b;
            --activeColor: #74d274;
            --logoColor: #555555;
            --photoBackground: #1a1a1a;
          }
        }

        img {
          max-width: 100%;
          margin: 1em 0;

          &[width] {
            margin: 0;
            vertical-align: middle;
          }
        }

        .photos {
          display: flex;
          gap: 1em;
          flex-wrap: nowrap;
          overflow: auto;
          align-items: center;

          .image-link {
            flex-shrink: 0;
          }

          img {
            background-color: var(--photoBackground);
          }
        }

        figure {
          margin: 1em 0 3em;

          img {
            margin: 0 auto;
            max-height: calc(100vh - 6em);
            background-color: var(--photoBackground);
            display: block;
          }

          .image-link {
            display: block;
            width: fit-content;
            margin: 0 auto 0.5em;
          }

          p {
            margin-bottom: 0;
          }
        }

        .photos-wrapper {
          &:focus { outline: none; }
          scroll-behavior: smooth;
          clear: both;
          text-align: center;
        }

        [value*="grid"]:checked ~ .photos-wrapper {
          display: grid;
          column-gap: 2.5em;
          grid-template-columns: repeat(2, 1fr);
          grid-auto-flow: dense;

          .figure-landscape {
            grid-column: span 2;
          }

          figure {
            margin-bottom: 0;
            align-self: start;
          }

          img {
            max-height: none;
            height: auto;
          }
        }

        [value="grid3fr"]:checked ~ .photos-wrapper {
          grid-template-columns: repeat(3, 1fr);

          .figure-landscape {
            grid-column: span 3;
          }
        }

        [value="x-scroll"]:checked ~ .photos-wrapper {
          display: flex;
          overflow: auto;
          gap: 1.5em;
          scroll-snap-type: x mandatory;
          scroll-snap-align: center;

          figure {
            scroll-snap-align: center;
            margin-bottom: 0;
            flex-shrink: 0;
            width: min-content;

            &:has(.portrait) figcaption {
              max-width: calc(100vh * 0.667 - 6em);
              margin: auto;
            }

            &:has(.landscape) figcaption {
              max-width: calc(100vw * 0.667 - 2em);
              margin: auto;
            }
          }

          img {
            max-height: calc(100vh - 6em);
            max-width: calc(100vw - 5em);
            flex-shrink: 0;
          }
        }

        figcaption {
          padding: .5em 1em;

          font-size: 0.8em;
          font-style: italic;
          font-family: ui-monospace,sfmono-regular,sf mono,Menlo,Consolas,liberation mono,monospace;

          p {
            margin: 0;
            font-size: 0.8em;
          }
        }

        [data-status-loading] {
          margin: .17em 0 0;
          display: block;
          opacity: .3;
          animation: loading .5s infinite alternate;
        }

        @media (max-height: 540px), (max-width: calc(100vh * 1.4)) {
          body {
            padding: 0 2em;
          }

          .photos-wrapper {
            margin-left: -2em;
            margin-right: -2em;

            img {
              max-height: none;

              &.landscape {
                height: calc(100vw / 1.5);
              }
              &.portrait {
                height: calc(100vw / 0.667);
              }
              &.square {
                height: 100vw;
              }
            }
          }

          [name="layout"] {
            &, + label { visibility: hidden; }
          }
        }

        [name="layout"] {
          &, + input { visibility: hidden; }
        }

        [name="layout"] + label {
          position: relative;
          left: -25px;
        }

        [value*=grid]:checked~.photos-wrapper .figure-landscape {
          grid-column: span 2
        }

        [value*=grid]:checked~.photos-wrapper figure {
          margin-bottom: 0;
          align-self: start
        }

        [value*=grid]:checked~.photos-wrapper img {
          max-height: none;
          height: auto;
        }

        [value=grid3fr]:checked~.photos-wrapper {
          grid-template-columns: repeat(3,1fr)
        }

        [value=grid3fr]:checked~.photos-wrapper .figure-landscape {
          grid-column: span 3;
        }

        [name="layout"]:checked {
          & + label path {
            fill: #74d274;
          }

          &:focus + label {
            outline: auto;
            outline-color: #74d274;
          }
        }

        [data-page-type="photos"] {
          input {
            position: absolute;
            left: -100px;
          }

          label {
            top: -30px;
            left: 100px;
            padding: .5em;
            cursor: pointer;
            position: relative;
            display: inline-flex;
          }
        }
      </style>
      <div>
        <input type="radio" name="layout" value="y-scroll" id="y-scroll" checked="">
        <label for="y-scroll">
          <svg width="15" height="15" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><title>vertical scroll</title><path d="M55 0a5 5 0 0 1 5 5v31a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5V5a5 5 0 0 1 5-5h50ZM55 47a5 5 0 0 1 5 5v8H0v-8a5 5 0 0 1 5-5h50Z" fill="#D9D9D9"></path></svg>
        </label>

        <input type="radio" name="layout" value="x-scroll" id="x-scroll">
        <label for="x-scroll">
          <svg width="15" height="15" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><title>horizontal scroll</title><path d="M0 5a5 5 0 0 1 5-5h30a5 5 0 0 1 5 5v50a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5V5ZM47 5a5 5 0 0 1 5-5h8v60h-8a5 5 0 0 1-5-5V5Z" fill="#D9D9D9"></path></svg>
        </label>

        <input type="radio" name="layout" value="grid2fr" id="grid2fr">
        <label for="grid2fr">
          <svg width="15" height="15" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><title>grid 2 columns</title><path d="M0 37c0-2 2-4 4-4h19c2 0 4 2 4 4v19c0 2-2 4-4 4H4c-2 0-4-2-4-4V37zM0 4c0-2 2-4 4-4h19c2 0 4 2 4 4v19c0 2-2 4-4 4H4c-2 0-4-2-4-4V4zM33 37c0-2 2-4 4-4h19c2 0 4 2 4 4v19c0 2-2 4-4 4H37c-2 0-4-2-4-4V37zM33 4c0-2 2-4 4-4h19c2 0 4 2 4 4v19c0 2-2 4-4 4H37c-2 0-4-2-4-4V4z" fill="#D9D9D9"></path></svg>
        </label>


        <input type="radio" name="layout" value="grid3fr" id="grid3fr">
        <label for="grid3fr">
          <svg width="15" height="15" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><title>grid 3 columns</title><path d="M22 4c0-2 2-4 4-4h8c2 0 4 2 4 4v8c0 2-2 4-4 4h-8c-2 0-4-2-4-4V4zM0 26c0-2 2-4 4-4h8c2 0 4 2 4 4v8c0 2-2 4-4 4H4c-2 0-4-2-4-4v-8zM22 26c0-2 2-4 4-4h8c2 0 4 2 4 4v8c0 2-2 4-4 4h-8c-2 0-4-2-4-4v-8zM0 48c0-2 2-4 4-4h8c2 0 4 2 4 4v8c0 2-2 4-4 4H4c-2 0-4-2-4-4v-8zM44 26c0-2 2-4 4-4h8c2 0 4 2 4 4v8c0 2-2 4-4 4h-8c-2 0-4-2-4-4v-8zM22 48c0-2 2-4 4-4h8c2 0 4 2 4 4v8c0 2-2 4-4 4h-8c-2 0-4-2-4-4v-8zM44 48c0-2 2-4 4-4h8c2 0 4 2 4 4v8c0 2-2 4-4 4h-8c-2 0-4-2-4-4v-8zM0 4c0-2 2-4 4-4h8c2 0 4 2 4 4v8c0 2-2 4-4 4H4c-2 0-4-2-4-4V4zM44 4c0-2 2-4 4-4h8c2 0 4 2 4 4v8c0 2-2 4-4 4h-8c-2 0-4-2-4-4V4z" fill="#D9D9D9"></path></svg>
        </label>


        <div class="photos-wrapper"></div>
        <div class="loading-state">Loading...</div>
      </div>
    `;

    this.photosWrapper = this.shadowRoot.querySelector('.photos-wrapper');
    this.imageContainer = this.shadowRoot.querySelector('.photos-wrapper');
    this.loadingState = this.shadowRoot.querySelector('.loading-state');

    this.fetchImages();
    this.viewMode = localStorage.getItem('galleryViewMode') || 'y-scroll';
  }

  connectedCallback() {
    this.attachEventListeners();
    this.applySavedViewMode();
  }

  attachEventListeners() {
    const radioButtons = this.shadowRoot.querySelectorAll(
      'input[name="layout"]'
    );
    radioButtons.forEach((radio) => {
      radio.addEventListener('change', this.onLayoutChange.bind(this));
    });
  }

  onLayoutChange(event) {
    this.viewMode = event.target.value;
    localStorage.setItem('galleryViewMode', this.viewMode);
  }

  fetchImages() {
    const jsonUrl = this.getAttribute('src');
    this.loadingState.style.display = 'block';

    fetch(jsonUrl)
      .then((response) => response.json())
      .then((data) => {
        if (!data || !Array.isArray(data.items)) {
          throw new Error('Data is not in expected format');
        }
        this.images = data.items;
        this.renderImages();
        this.applySavedViewMode();
        this.loadingState.style.display = 'none';
      })
      .catch((error) => {
        console.error('Error fetching JSON data:', error);
        this.loadingState.style.display = 'none';
      });
  }

  renderImages() {
    this.imageContainer.innerHTML = '';

    this.images.forEach((image, index) => {
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      img.src = image._open_gallery.url;
      img.href = image._open_gallery.url;
      img.alt = image._open_gallery.alt;
      img.loading = this.isFirstImage(index) ? 'eager' : 'lazy';

      img.addEventListener('click', () => {
        window.open(img.href, '_blank');
      });

      const caption = document.createElement('figcaption');
      caption.textContent = image._open_gallery.caption;
      const date = document.createElement('summary');
      date.textContent = `(${image._open_gallery.date})`;
      const details = document.createElement('details');

      if (image._open_gallery._details) {
        details.textContent = image._open_gallery._details;
      }

      caption.appendChild(date);
      caption.appendChild(details);
      figure.appendChild(img);

      if (image._open_gallery.class) {
        figure.classList.add(image._open_gallery.class);
        img.style.aspectRatio = '1.5 / 0';
      } else {
        img.style.aspectRatio = '0.667 / 0';
      }

      figure.appendChild(caption);

      this.imageContainer.appendChild(figure);
    });

    if (window.innerWidth < 768) {
      this.viewMode = 'y-scroll';
    }
  }

  isFirstImage(index) {
    return index === 0;
  }

  applySavedViewMode() {
    const radioButton = this.shadowRoot.querySelector(
      `input[value="${this.viewMode}"]`
    );
    if (radioButton) {
      radioButton.checked = true;
    }
  }
}

customElements.define('open-gallery', OpenGallery);
