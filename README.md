# 🐎 Vue Horse Racing UI – Animated Sprite Edition

This is a Vue 3 project simulating a horse racing UI with animated horse sprites. It demonstrates how to use a sprite sheet to create galloping horse animations using CSS and Vue components.

---

## 🚀 Features

- 🎮 Race simulation interface
- 🐎 Animated galloping horses via sprite sheet
- 🎨 Clean, responsive UI design
- 📦 Built with Vite + Vue 3
- 🧩 Modular component structure

---

## 📁 Project Structure

```
horse-racing-ui/
├── public/                    # Static files
├── src/
│   ├── assets/                # Images including horse-sprite-sheet.png
│   ├── components/            # Vue components (RaceTrack.vue, Horse.vue, etc.)
│   ├── App.vue                # Root Vue component
│   └── main.js                # App initialization
├── package.json
├── vite.config.js
└── README.md
```

---

## 🎨 Animated Horse Sprite

The project uses a 4-frame horizontal sprite sheet of a running horse:

- File: `src/assets/horse-sprite-sheet.png`

### CSS Animation:
```css
.horseSprite{
  position:absolute;
  top:6px;
  width:28px;
  height:28px;
  background-image:url('/src/assets/horse-sprite.svg');
  background-repeat:no-repeat;
  background-size:224px 28px; /* 8 * 28 */
  animation:gallop 0.6s steps(8) infinite;
  left:0%;
  transition:left linear;
}

@keyframes gallop {
  from { background-position: 0 0; }
  to   { background-position: -224px 0; }
}
```

### Vue Usage:
```vue
<template>
  <img
    src="@/assets/horse-sprite.svg"
    class="horse-sprite"
    alt="Running Horse"
  />
</template>
```

---

## 🛠 Setup & Run

```bash
npm install
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 📄 License

This project was built for demonstration purposes using AI assistance. You may reuse or modify freely.

---
