import React, {useEffect, useRef, useState} from 'react';
import styles from './index.module.css';

type FeatureItem = {
  icon: string;
  title: string;
  description: string;
};

const features: FeatureItem[] = [
  {
    icon: '📚',
    title: 'Smart Organization',
    description: 'Organize your library with shelves, filters, magic shelves, and lightning-fast search. Find what you need in seconds.',
  },
  {
    icon: '✨',
    title: 'Magic Shelves',
    description: 'Create dynamic collections that auto-update based on your rules. Let Grimmory organize as your library grows.',
  },
  {
    icon: '🧠',
    title: 'Automatic Metadata',
    description: 'Fetch book details, covers, and reviews from top sources automatically. Rich metadata with minimal effort.',
  },
  {
    icon: '🌐',
    title: 'OPDS Support',
    description: 'Connect reading apps for wireless downloads anywhere. Access your books from any compatible device.',
  },
  {
    icon: '📖',
    title: 'Built-in Reader',
    description: 'Read EPUBs, PDFs, and comics in your browser with position sync, notes, and customization.',
  },
  {
    icon: '👥',
    title: 'Multi-User Ready',
    description: 'Share your library and manage access with granular permissions. Useful for families and teams.',
  },
  {
    icon: '🔄',
    title: 'Kobo & KOReader Sync',
    description: 'Sync content and reading progress across Kobo and KOReader devices seamlessly.',
  },
  {
    icon: '✉️',
    title: 'Email Sharing',
    description: 'Send books to your Kindle or any email with just one click.',
  },
];

function FeatureCard({feature, index}: {feature: FeatureItem; index: number}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      {threshold: 0.1}
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={cardRef} className="col col--3">
      <div
        className={styles.featureCard}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.05}s`,
        }}
      >
        <div className={styles.featureIcon}>{feature.icon}</div>
        <h3 className={styles.featureTitle}>{feature.title}</h3>
        <p className={styles.featureDescription}>{feature.description}</p>
      </div>
    </div>
  );
}

function HomepageFeatures() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
        }
      },
      {threshold: 0.1}
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.features} id="features">
      <div className="container">
        <div
          ref={headerRef}
          className={styles.featuresHeader}
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h2 className={styles.featuresTitle}>Why Choose Grimmory?</h2>
          <p className={styles.featuresSubtitle}>
            Everything you need to build and maintain your personal digital library
          </p>
        </div>
        <div className={`row ${styles.featuresRow}`} style={{justifyContent: 'center'}}>
          {features.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomepageFeatures;
