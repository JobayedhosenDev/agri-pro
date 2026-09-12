# AGRI-PRO Machinery — WordPress Conversion & Handover Guide

> **Total Proposed Development Price:** **€500 (All-Inclusive, No Hidden Costs)**  
> **Scope:** Complete Multi-Page Website + Mobile Responsive Design + Custom Gutenberg/FSE Conversion Architecture + SEO Optimization + Video/Live Walkthrough Handover.

---

## 1. Dual-Mode Architecture (Custom Standalone OR WordPress)
This website was intentionally built with clean, modular HTML5, Vanilla CSS variables (`:root`), and pure JavaScript. It offers you complete freedom:
1. **Option A (Instant Custom Standalone):** Can be hosted directly on any web host, Apache, Nginx, or cPanel with 0 configuration.
2. **Option B (Direct WordPress Conversion):** The structure maps 1:1 to standard WordPress template hierarchy and Gutenberg block architecture.

---

## 2. Converting into WordPress (Step-by-Step)

### A. Theme Structure Mapping
| HTML Template File | WordPress Theme Equivalent |
|---|---|
| `index.html` | `front-page.php` / `page-home.php` |
| `products.html` | `archive-product.php` |
| `product-detail.html` | `single-product.php` |
| `services.html` | `page-services.php` or `archive-service.php` |
| `about.html` | `page-about.php` |
| `contact.html` | `page-contact.php` |
| `news.html` | `home.php` / `index.php` |
| `resources.html` | `page-resources.php` |
| `css/main.css`, `components.css`, `responsive.css` | `style.css` (enqueued in `functions.php`) |
| `js/main.js`, `products.js`, `forms.js` | Enqueued scripts via `wp_enqueue_script()` |

### B. WordPress Enqueueing in `functions.php`
```php
<?php
function agripro_theme_scripts() {
    // Styles
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@500;600;700;800&display=swap', array(), null);
    wp_enqueue_style('agripro-main', get_template_directory_uri() . '/css/main.css', array(), '1.0');
    wp_enqueue_style('agripro-components', get_template_directory_uri() . '/css/components.css', array(), '1.0');
    wp_enqueue_style('agripro-responsive', get_template_directory_uri() . '/css/responsive.css', array(), '1.0');

    // Scripts
    wp_enqueue_script('agripro-main', get_template_directory_uri() . '/js/main.js', array(), '1.0', true);
    if (is_page('products') || is_post_type_archive('product')) {
        wp_enqueue_script('agripro-products', get_template_directory_uri() . '/js/products.js', array(), '1.0', true);
    }
    wp_enqueue_script('agripro-forms', get_template_directory_uri() . '/js/forms.js', array(), '1.0', true);
}
add_action('wp_enqueue_scripts', 'agripro_theme_scripts');
```

---

## 3. Administrator Handover Tutorial

### How to Edit Pages
- Navigate to **WP Admin &rarr; Pages**.
- Click **Edit** on any page (Home, About, Services, Contact).
- All text blocks and headings can be edited using the native WordPress Block Editor (Gutenberg) without page builder slowdown.

### How to Edit & Add Products
- Navigate to **WP Admin &rarr; Products** (or Custom Post Type `product`).
- Click **Add New Product**.
- Enter Product Title (e.g. *RT-1800 Rotary Tiller*), category (*Soil Preparation*), and specifications in custom fields (ACF or native meta).
- Set the Featured Image using a clean photo on a white background.
- Hit **Publish**. The product will automatically appear in the catalog grid and filter buttons.

### How to Add & Edit Services
- Go to **WP Admin &rarr; Pages &rarr; Services** (or Custom Post Type `service`).
- Each service block contains a title, summary, features list, and icon.
- You can duplicate any service block directly in the editor.

### How to Publish News & Articles
- Go to **WP Admin &rarr; Posts &rarr; Add New**.
- Write your article title and content.
- Set Categories (*Technical Guides*, *Maintenance*, *Company News*).
- Upload a Featured Image and click **Publish**.

### How to Replace Images
- Go to **WP Admin &rarr; Media &rarr; Add New** or click directly on any image in the Gutenberg Block Editor and select **Replace**.
- Upload WebP or compressed JPG images for maximum PageSpeed score.

### How to Manage Inquiries & Lead Generation
- Inquiries can be received via **WPForms**, **Contact Form 7**, or **Fluent Forms**.
- Go to **WP Admin &rarr; WPForms &rarr; Entries** (or your inbox) to review customer inquiries, tractor horsepower details, and requested machinery models.

### How to Update Menus
- Go to **WP Admin &rarr; Appearance &rarr; Menus**.
- Drag and drop links to rearrange pages, add external links, or create sub-items.

### How to Update Basic SEO
- Install **Yoast SEO** or **Rank Math** plugin.
- On each page/product edit screen, customize the **SEO Title**, **Meta Description**, and **Focus Keyphrase**.

---

## 4. Performance & Hosting Recommendations
- **Hosting:** Fast European cloud VPS or managed WordPress hosting (SiteGround, Hetzner, Cloudways, or Hostinger EU).
- **PHP:** Use PHP 8.2 or 8.3 with OPcache enabled.
- **Caching:** WP Rocket or LiteSpeed Cache.
- **Image Optimization:** Convert uploads automatically to WebP using ShortPixel or WebP Express.
