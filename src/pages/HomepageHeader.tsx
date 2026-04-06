import Link from '@docusaurus/Link';
import React, {useState, useEffect} from 'react';
import styles from './index.module.css';

const GITHUB_REPO_API = 'https://api.github.com/repos/grimmory-tools/grimmory';
const STARS_FALLBACK_LABEL = 'Star on GitHub';

function formatStarsLabel(starCount: number): string {
  const formattedCount = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(starCount);

  return `${formattedCount}+ Stars`;
}

function HomepageHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const [starsLabel, setStarsLabel] = useState(STARS_FALLBACK_LABEL);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchStars = async () => {
      try {
        const response = await fetch(GITHUB_REPO_API, {
          headers: {
            Accept: 'application/vnd.github+json',
          },
        });

        if (!response.ok) {
          throw new Error(`GitHub stars fetch failed: ${response.status}`);
        }

        const data = (await response.json()) as {stargazers_count?: unknown};
        const starCount = data.stargazers_count;

        if (typeof starCount !== 'number' || !Number.isFinite(starCount)) {
          throw new Error('GitHub stars payload missing stargazers_count');
        }

        const nextLabel = formatStarsLabel(starCount);

        if (isMounted) {
          setStarsLabel(nextLabel);
        }
      } catch {
        if (isMounted) {
          setStarsLabel(STARS_FALLBACK_LABEL);
        }
      }
    };

    void fetchStars();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <header className={styles.heroBanner}>
        <div className={styles.heroBackground}>
          <div className={styles.floatingOrb1}></div>
          <div className={styles.floatingOrb2}></div>
          <div className={styles.floatingOrb3}></div>
          <div className={styles.gridPattern}></div>
        </div>
        <div className="container">
          <div className={`${styles.heroContent} ${isVisible ? styles.heroVisible : ''}`}>
            <div className={styles.statusNotice} role="status" aria-live="polite">
              <strong>Project Status:</strong> Booklore was an AGPLv3 open source project, and the original maintainer chose to shut it down. Grimmory is a community fork run by former contributors and is currently a work in progress as setup continues.
            </div>
            <span className={styles.badge}>
              <span className={styles.badgePulse}></span>
              Your Self-Hosted Library
            </span>
            <h1 className={styles.heroTitle}>
              Welcome to <span className={styles.gradient}>Grimmory</span>
            </h1>
            <p className={styles.heroTagline}>
              A modern way to organize, access, and self-host your digital library.
            </p>
            <div className={styles.buttons}>
              <Link
                className={`button button--primary button--lg ${styles.primaryButton}`}
                to="/docs/getting-started">
                <span>Get Started</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
            <div className={styles.linksRow}>
              <a
                href="https://github.com/grimmory-tools/grimmory"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkItem}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                <span>{starsLabel}</span>
              </a>
              <a
                href="https://github.com/grimmory-tools/grimmory"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkItem}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/>
                </svg>
                <span>Self-Hosted</span>
              </a>
              <a
                href="https://discord.gg/vNsB8CTebs"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkItem}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span>Discord</span>
              </a>
              <a
                href="https://opencollective.com/grimmory"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkItem}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12c2.54 0 4.894-.79 6.834-2.135l-3.107-3.109a7.715 7.715 0 1 1 0-13.512l3.107-3.109A11.943 11.943 0 0 0 12 0zm9.865 5.166l-3.109 3.107A7.67 7.67 0 0 1 19.715 12a7.682 7.682 0 0 1-.959 3.727l3.109 3.107A11.943 11.943 0 0 0 24 12c0-2.54-.79-4.894-2.135-6.834z"/>
                </svg>
                <span>Sponsor</span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default HomepageHeader;
