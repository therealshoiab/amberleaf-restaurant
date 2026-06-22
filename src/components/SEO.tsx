import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  url = window.location.href,
  image = './images/amberleaf-storefront.jpg',
}) => {
  useEffect(() => {
    // Update Document Title
    const formattedTitle = `${title} | Amberleaf Restaurant - Fine Dine & Cafe, Srinagar`;
    document.title = formattedTitle;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', formattedTitle);

    // Update OpenGraph Description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', description);

    // Update OpenGraph Image
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', image);

    // Update OpenGraph URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', url);
  }, [title, description, url, image]);

  return null; // SEO component does not render visual output
};
