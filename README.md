# Yu-Ju Lee's Personal Website

https://gdirection.github.io/

## Overview

This website has been refactored to use a data-driven approach, making content editing much easier.

## Structure

```
.
├── index.html              # Main HTML structure (minimal, mostly layout)
├── data/                   # All website content in JSON format
│   ├── profile.json        # Profile info, bio, social links
│   ├── education.json      # Education history
│   ├── publications.json   # Publications, patents, presentations
│   ├── experience.json     # Professional experience
│   └── academic.json       # Academic services and experience
├── js/
│   ├── content-loader.js   # Dynamically loads content from JSON files
│   └── ...                 # Other JavaScript files
└── css/                    # Stylesheets (unchanged)
```

## How to Edit Content

Instead of editing the HTML file, simply edit the JSON files in the `data/` directory.


## Benefits of This Approach

1. **Easy to Edit**: No HTML knowledge needed - just edit simple JSON files
2. **Safe**: Can't accidentally break the website structure
3. **Quick**: Find and update content in seconds instead of scrolling through HTML
4. **Maintainable**: Content is separated from presentation
5. **Version Control**: Easy to track what changed in git diffs

## Testing Locally

To test the website locally, you need to serve it through a web server (not just opening index.html in a browser, due to CORS restrictions on loading JSON files).

### Option 1: Python
```bash
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

### Option 2: Node.js
```bash
npx http-server

# Then visit: http://localhost:8080
```

### Option 3: VS Code
Install the "Live Server" extension and click "Go Live" in the status bar.

## Technical Notes

- Content is loaded dynamically using vanilla JavaScript (no frameworks required)
- All content loads in parallel for optimal performance
- Falls back gracefully if JavaScript is disabled (though content won't display)
- Compatible with all modern browsers
