import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { NewsFeedSection } from './components/NewsFeedSection.tsx';
import { EnterpriseSolutionsCatalog } from './components/EnterpriseSolutionsCatalog.tsx';
import { CleanCoreMatrixSection } from './components/CleanCoreMatrixSection.tsx';
import { SolutionAdvisorSection } from './components/SolutionAdvisorSection.tsx';
import { SAPFunctionalScenariosSection } from './components/SAPFunctionalScenariosSection.tsx';
import { ArticleDetailModal } from './components/ArticleDetailModal.tsx';
import { CustomFeedInspectorModal } from './components/CustomFeedInspectorModal.tsx';
import { Footer } from './components/Footer.tsx';
import { SAPNewsItem, SAPCategory } from './types/sap.ts';
import { OFFICIAL_SAP_CURATED_NEWS } from './utils/sapParser.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<'news' | 'functional' | 'solutions' | 'clean-core' | 'advisor'>('news');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<SAPCategory>('all');
  const [newsItems, setNewsItems] = useState<SAPNewsItem[]>(OFFICIAL_SAP_CURATED_NEWS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [activeArticle, setActiveArticle] = useState<SAPNewsItem | null>(null);
  const [isFeedInspectorOpen, setIsFeedInspectorOpen] = useState<boolean>(false);

  const fetchNews = (forceRefresh = false) => {
    setIsLoading(true);
    if (forceRefresh) setIsSyncing(true);

    const params = new URLSearchParams();
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (searchQuery.trim()) params.set('search', searchQuery.trim());
    if (forceRefresh) params.set('forceRefresh', 'true');

    fetch(`/api/sap/feed?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.items)) {
          setNewsItems(data.items);
        }
      })
      .catch((err) => {
        console.warn('Could not fetch from server feed endpoint, using curated database:', err);
      })
      .finally(() => {
        setIsLoading(false);
        setIsSyncing(false);
      });
  };

  useEffect(() => {
    fetchNews();
  }, [selectedCategory]);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  // Handle live search with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchNews();
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleImportItems = (newItems: SAPNewsItem[]) => {
    setNewsItems((prev) => {
      const combined = [...newItems, ...prev];
      const seen = new Set<string>();
      return combined.filter((item) => {
        const key = item.title.toLowerCase().trim().slice(0, 50);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    });
    setActiveTab('news');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans selection:bg-[#0070F2]/15 selection:text-[#0070F2]">
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAdvisorModal={() => setActiveTab('advisor')}
        isSyncing={isSyncing}
        onRefreshFeed={() => fetchNews(true)}
      />

      <main className="flex-1">
        {/* Render Tab Contents */}
        {activeTab === 'news' && (
          <>
            <HeroSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onExploreAdvisor={() => setActiveTab('advisor')}
              onOpenFeedInspector={() => setIsFeedInspectorOpen(true)}
              newsCount={newsItems.length}
            />
            <NewsFeedSection
              items={newsItems}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onOpenArticle={(item) => setActiveArticle(item)}
              isLoading={isLoading}
              searchQuery={searchQuery}
            />
          </>
        )}

        {activeTab === 'functional' && (
          <SAPFunctionalScenariosSection />
        )}

        {activeTab === 'solutions' && (
          <EnterpriseSolutionsCatalog
            onOpenAdvisorModal={() => setActiveTab('advisor')}
            onFilterNewsByCategory={(cat) => {
              setSelectedCategory(cat as SAPCategory);
              setActiveTab('news');
            }}
          />
        )}

        {activeTab === 'clean-core' && (
          <CleanCoreMatrixSection
            onOpenAdvisorModal={() => setActiveTab('advisor')}
          />
        )}

        {activeTab === 'advisor' && (
          <SolutionAdvisorSection
            onOpenArticle={(item) => setActiveArticle(item)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Article Detail & AI Strategic Briefing Modal */}
      {activeArticle && (
        <ArticleDetailModal
          article={activeArticle}
          onClose={() => setActiveArticle(null)}
        />
      )}

      {/* Live SAP RSS Feed Inspector Modal */}
      {isFeedInspectorOpen && (
        <CustomFeedInspectorModal
          onClose={() => setIsFeedInspectorOpen(false)}
          onImportItems={handleImportItems}
        />
      )}
    </div>
  );
}
