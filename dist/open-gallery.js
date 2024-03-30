class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML='\n      <style>\n        :root {\n          --subtleBackgroundColor: #f5f5f5;\n          --activeColor: #74d274;\n          --logoColor: #cccccc;\n          --photoBackground: #f4f4f4;\n        }\n\n        @media (prefers-color-scheme: dark) {\n          :root {\n            --subtleBackgroundColor: #3a3b3b;\n            --activeColor: #74d274;\n            --logoColor: #555555;\n            --photoBackground: #1a1a1a;\n          }\n        }\n\n        img {\n          max-width: 100%;\n          margin: 1em 0;\n\n          &[width] {\n            margin: 0;\n            vertical-align: middle;\n          }\n        }\n\n        .photos {\n          display: flex;\n          gap: 1em;\n          flex-wrap: nowrap;\n          overflow: auto;\n          align-items: center;\n\n          .image-link {\n            flex-shrink: 0;\n          }\n\n          img {\n            background-color: var(--photoBackground);\n          }\n        }\n\n        figure {\n          margin: 1em 0 3em;\n\n          img {\n            margin: 0 auto;\n            max-height: calc(100vh - 6em);\n            background-color: var(--photoBackground);\n            display: block;\n          }\n\n          .image-link {\n            display: block;\n            width: fit-content;\n            margin: 0 auto 0.5em;\n          }\n\n          p {\n            margin-bottom: 0;\n          }\n        }\n\n        .photos-wrapper {\n          &:focus { outline: none; }\n          scroll-behavior: smooth;\n          clear: both;\n          text-align: center;\n        }\n\n        [value*="grid"]:checked ~ .photos-wrapper {\n          display: grid;\n          column-gap: 2.5em;\n          grid-template-columns: repeat(2, 1fr);\n          grid-auto-flow: dense;\n\n          .figure-landscape {\n            grid-column: span 2;\n          }\n\n          figure {\n            margin-bottom: 0;\n            align-self: start;\n          }\n\n          img {\n            max-height: none;\n            height: auto;\n          }\n        }\n\n        [value="grid3fr"]:checked ~ .photos-wrapper {\n          grid-template-columns: repeat(3, 1fr);\n\n          .figure-landscape {\n            grid-column: span 3;\n          }\n        }\n\n        [value="x-scroll"]:checked ~ .photos-wrapper {\n          display: flex;\n          overflow: auto;\n          gap: 1.5em;\n          scroll-snap-type: x mandatory;\n          scroll-snap-align: center;\n\n          figure {\n            scroll-snap-align: center;\n            margin-bottom: 0;\n            flex-shrink: 0;\n            width: min-content;\n\n            &:has(.portrait) figcaption {\n              max-width: calc(100vh * 0.667 - 6em);\n              margin: auto;\n            }\n\n            &:has(.landscape) figcaption {\n              max-width: calc(100vw * 0.667 - 2em);\n              margin: auto;\n            }\n          }\n\n          img {\n            max-height: calc(100vh - 6em);\n            max-width: calc(100vw - 5em);\n            flex-shrink: 0;\n          }\n        }\n\n        figcaption {\n          padding: .5em 1em;\n\n          font-size: 0.8em;\n          font-style: italic;\n          font-family: ui-monospace,sfmono-regular,sf mono,Menlo,Consolas,liberation mono,monospace;\n\n          p {\n            margin: 0;\n            font-size: 0.8em;\n          }\n        }\n\n        [data-status-loading] {\n          margin: .17em 0 0;\n          display: block;\n          opacity: .3;\n          animation: loading .5s infinite alternate;\n        }\n\n        @media (max-height: 540px), (max-width: calc(100vh * 1.4)) {\n          body {\n            padding: 0 2em;\n          }\n\n          .photos-wrapper {\n            margin-left: -2em;\n            margin-right: -2em;\n\n            img {\n              max-height: none;\n\n              &.landscape {\n                height: calc(100vw / 1.5);\n              }\n              &.portrait {\n                height: calc(100vw / 0.667);\n              }\n              &.square {\n                height: 100vw;\n              }\n            }\n          }\n\n          [name="layout"] {\n            &, + label { visibility: hidden; }\n          }\n        }\n\n        [name="layout"] {\n          &, + input { visibility: hidden; }\n        }\n\n        [name="layout"] + label {\n          position: relative;\n          left: -25px;\n        }\n\n        [value*=grid]:checked~.photos-wrapper .figure-landscape {\n          grid-column: span 2\n        }\n\n        [value*=grid]:checked~.photos-wrapper figure {\n          margin-bottom: 0;\n          align-self: start\n        }\n\n        [value*=grid]:checked~.photos-wrapper img {\n          max-height: none;\n          height: auto;\n        }\n\n        [value=grid3fr]:checked~.photos-wrapper {\n          grid-template-columns: repeat(3,1fr)\n        }\n\n        [value=grid3fr]:checked~.photos-wrapper .figure-landscape {\n          grid-column: span 3;\n        }\n\n        [name="layout"]:checked {\n          & + label path {\n            fill: #74d274;\n          }\n\n          &:focus + label {\n            outline: auto;\n            outline-color: #74d274;\n          }\n        }\n\n        [data-page-type="photos"] {\n          input {\n            position: absolute;\n            left: -100px;\n          }\n\n          label {\n            top: -30px;\n            left: 100px;\n            padding: .5em;\n            cursor: pointer;\n            position: relative;\n            display: inline-flex;\n          }\n        }\n      </style>\n      <div>\n        <input type="radio" name="layout" value="y-scroll" id="y-scroll" checked="">\n        <label for="y-scroll">\n          <svg width="15" height="15" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><title>vertical scroll</title><path d="M55 0a5 5 0 0 1 5 5v31a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5V5a5 5 0 0 1 5-5h50ZM55 47a5 5 0 0 1 5 5v8H0v-8a5 5 0 0 1 5-5h50Z" fill="#D9D9D9"></path></svg>\n        </label>\n\n        <input type="radio" name="layout" value="x-scroll" id="x-scroll">\n        <label for="x-scroll">\n          <svg width="15" height="15" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><title>horizontal scroll</title><path d="M0 5a5 5 0 0 1 5-5h30a5 5 0 0 1 5 5v50a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5V5ZM47 5a5 5 0 0 1 5-5h8v60h-8a5 5 0 0 1-5-5V5Z" fill="#D9D9D9"></path></svg>\n        </label>\n\n        <input type="radio" name="layout" value="grid2fr" id="grid2fr">\n        <label for="grid2fr">\n          <svg width="15" height="15" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><title>grid 2 columns</title><path d="M0 37c0-2 2-4 4-4h19c2 0 4 2 4 4v19c0 2-2 4-4 4H4c-2 0-4-2-4-4V37zM0 4c0-2 2-4 4-4h19c2 0 4 2 4 4v19c0 2-2 4-4 4H4c-2 0-4-2-4-4V4zM33 37c0-2 2-4 4-4h19c2 0 4 2 4 4v19c0 2-2 4-4 4H37c-2 0-4-2-4-4V37zM33 4c0-2 2-4 4-4h19c2 0 4 2 4 4v19c0 2-2 4-4 4H37c-2 0-4-2-4-4V4z" fill="#D9D9D9"></path></svg>\n        </label>\n\n\n        <input type="radio" name="layout" value="grid3fr" id="grid3fr">\n        <label for="grid3fr">\n          <svg width="15" height="15" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><title>grid 3 columns</title><path d="M22 4c0-2 2-4 4-4h8c2 0 4 2 4 4v8c0 2-2 4-4 4h-8c-2 0-4-2-4-4V4zM0 26c0-2 2-4 4-4h8c2 0 4 2 4 4v8c0 2-2 4-4 4H4c-2 0-4-2-4-4v-8zM22 26c0-2 2-4 4-4h8c2 0 4 2 4 4v8c0 2-2 4-4 4h-8c-2 0-4-2-4-4v-8zM0 48c0-2 2-4 4-4h8c2 0 4 2 4 4v8c0 2-2 4-4 4H4c-2 0-4-2-4-4v-8zM44 26c0-2 2-4 4-4h8c2 0 4 2 4 4v8c0 2-2 4-4 4h-8c-2 0-4-2-4-4v-8zM22 48c0-2 2-4 4-4h8c2 0 4 2 4 4v8c0 2-2 4-4 4h-8c-2 0-4-2-4-4v-8zM44 48c0-2 2-4 4-4h8c2 0 4 2 4 4v8c0 2-2 4-4 4h-8c-2 0-4-2-4-4v-8zM0 4c0-2 2-4 4-4h8c2 0 4 2 4 4v8c0 2-2 4-4 4H4c-2 0-4-2-4-4V4zM44 4c0-2 2-4 4-4h8c2 0 4 2 4 4v8c0 2-2 4-4 4h-8c-2 0-4-2-4-4V4z" fill="#D9D9D9"></path></svg>\n        </label>\n\n\n        <div class="photos-wrapper"></div>\n        <div class="loading-state">Loading...</div>\n      </div>\n    ',this.photosWrapper=this.shadowRoot.querySelector(".photos-wrapper"),this.imageContainer=this.shadowRoot.querySelector(".photos-wrapper"),this.loadingState=this.shadowRoot.querySelector(".loading-state"),this.fetchImages(),this.viewMode=localStorage.getItem("galleryViewMode")||"y-scroll"}connectedCallback(){this.attachEventListeners(),this.applySavedViewMode()}attachEventListeners(){this.shadowRoot.querySelectorAll('input[name="layout"]').forEach((n=>{n.addEventListener("change",this.onLayoutChange.bind(this))}))}onLayoutChange(n){this.viewMode=n.target.value,localStorage.setItem("galleryViewMode",this.viewMode)}fetchImages(){const n=this.getAttribute("src");this.loadingState.style.display="block",fetch(n).then((n=>n.json())).then((n=>{if(!n||!Array.isArray(n.items))throw new Error("Data is not in expected format");this.images=n.items,this.renderImages(),this.applySavedViewMode(),this.loadingState.style.display="none"})).catch((n=>{console.error("Error fetching JSON data:",n),this.loadingState.style.display="none"}))}renderImages(){this.imageContainer.innerHTML="",this.images.forEach((n=>{const e=document.createElement("figure"),t=document.createElement("img");t.src=n._open_gallery.url,t.href=n._open_gallery.url,t.alt=n._open_gallery.alt,t.addEventListener("click",(()=>{window.open(t.href,"_blank")}));const a=document.createElement("figcaption");a.textContent=n._open_gallery.caption;const o=document.createElement("p");o.textContent=`(${n._open_gallery.date})`,a.appendChild(o),e.appendChild(t),n._open_gallery.class&&e.classList.add(n._open_gallery.class),e.appendChild(a),this.imageContainer.appendChild(e)})),window.innerWidth<768&&(this.viewMode="y-scroll")}applySavedViewMode(){const n=this.shadowRoot.querySelector(`input[value="${this.viewMode}"]`);n&&(n.checked=!0)}}customElements.define("open-gallery",n);
