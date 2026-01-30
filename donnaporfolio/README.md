# Donna Norkai Omaboe - Portfolio Website

A modern, interactive portfolio website showcasing creative work, software projects, and professional experience. Built with HTML, CSS (Tailwind), and vanilla JavaScript with smooth animations and responsive design.

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between dark and light themes with smooth transitions
- **Interactive Animations**:
  - Click spark effects on all pages
  - Bounce cards animation for creative work section
  - Hover image animations on project listings
  - Smooth scroll animations
- **Splash Screen**: Elegant gradient splash screen with background image on page load
- **Project Showcase**: 
  - Software projects section
  - Creative projects section
  - Dedicated projects page with tab navigation
- **Modern UI/UX**: Clean, minimalist design with purple (brand-lilac) accent color

## 📁 Project Structure

```
donnaporfolio/
├── index.html          # Main homepage
├── projects.html       # Projects showcase page
├── script.js           # JavaScript functionality
├── assets/
│   ├── Donna1-8.jpg   # Profile images
│   └── posters/       # Creative work images
└── README.md          # This file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **Vanilla JavaScript**: No framework dependencies
- **GSAP**: Animation library for bounce cards effect
- **Canvas API**: For click spark animations

## 🎨 Design Features

- **Color Scheme**:
  - Primary: Brand Lilac (#C8A2C8)
  - Background: Light (#fafafa) / Dark (#0a0a0a)
  - Text: Adaptive based on theme

- **Typography**: Outfit font family (Google Fonts)
- **Animations**: Smooth transitions and hover effects throughout

## 📱 Pages

### Homepage (index.html)
- Hero section with tagline
- Selected projects list with hover animations
- About section with profile image
- Creative work section with bounce cards
- Contact section

### Projects Page (projects.html)
- Tab navigation (Software Projects / Creative Projects)
- Project listings with hover image animations
- Same layout style as homepage projects section

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/donnaporfolio.git
   cd donnaporfolio
   ```

2. **Open in browser**:
   - Simply open `index.html` in your browser, or
   - Use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```

3. **Access the website**:
   - Navigate to `http://localhost:8000` in your browser

## 🎯 Usage

- **Navigation**: Use the sidebar (desktop) or hamburger menu (mobile) to navigate between sections
- **Theme Toggle**: Click the dark mode toggle in the sidebar to switch themes
- **Projects**: Hover over project items to see image animations
- **Click Effects**: Click anywhere on the page to see spark animations
- **Creative Work**: Hover over bounce cards to see interactive animations

## 📝 Customization

### Changing Colors
Edit the Tailwind config in `index.html`:
```javascript
colors: {
    'brand-lilac': '#C8A2C8',
    'brand-lilac-dark': '#B080B0',
    'brand-black': '#0a0a0a',
    'brand-white': '#fafafa',
}
```

### Adding Projects
Edit the projects section in `index.html` and `projects.html`:
- Add new project items following the existing structure
- Update images in the `assets` folder
- Modify project details (name, description, year)

### Modifying Animations
- **Click Sparks**: Edit `sparkConfig` in `script.js`
- **Bounce Cards**: Adjust GSAP animations in `script.js`
- **Hover Effects**: Modify CSS classes in HTML files

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Donna Norkai Omaboe**
- Portfolio: [Your Portfolio URL]
- LinkedIn: [https://www.linkedin.com/in/donna-omaboe/](https://www.linkedin.com/in/donna-omaboe/)
- GitHub: [https://github.com/norkaid](https://github.com/norkaid)
- Email: donnaomaboe2005@gmail.com

## 🙏 Acknowledgments

- **Tailwind CSS** for the utility-first CSS framework
- **GSAP** for powerful animation capabilities
- **Google Fonts** for the Outfit font family
- Design inspiration from modern portfolio websites

## 🔮 Future Enhancements

- [ ] Implement contact form
- [ ] Add project detail pages
- [ ] Integrate analytics
- [ ] Add more interactive animations
- [ ] Implement smooth page transitions
- [ ] Add loading states
- [ ] Optimize images and performance

---

**Note**: This is a static website. For dynamic features, consider integrating with a backend service or CMS.

