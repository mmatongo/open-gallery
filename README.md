`OpenGallery` is a custom web component that creates a dynamic image gallery within a web page. The component fetches image data from a JSON source and displays the images in a customizable layout. It supports multiple layout options, responsive design, and accessibility enhancements to provide a user-friendly experience.

#### Features

- **Dynamic Image Loading:** Fetches images from a JSON source and displays them within the component.
- **Customizable Layouts:** Supports multiple layout options. Users can switch between grid, masonry, and list views.

#### Usage
Add the following script tag to the HTML file where you want to use the `OpenGallery` component:

```html
<script src="path/to/open-gallery.js" type="module"></script>
```

1. **HTML Structure:** Place the `<open-gallery>` tag in the HTML document where you want the gallery to appear.

   ```html
   <open-gallery src="path/to/images.json"></open-gallery>
   ```

2. **Attributes:**
   - `src`: Specifies the URL of the JSON file containing the images' data.

3. **JSON Structure:** The JSON file should follow the specified format, containing image details such as URL, alternative text, caption, and date.

   ```json
   {
       "items": [
           {
               "_open_gallery": {
                   "url": "image_url.jpg",
                   "alt": "Image description",
                   "caption": "Image caption",
                   "date": "Image date"
               }
           }
       ]
   }
   ```

