import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
// 移除下面这行导入
// import ContactButton from './components/layout/ContactButton';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Gallery from './pages/Gallery';
import CaseStudy from './pages/CaseStudy';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  const [currentPath, setCurrentPath] = React.useState(window.location.hash);

  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);

    if (!window.location.hash) {
      window.location.hash = '#/';
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const getCaseStudyIdFromHash = () => {
    const match = currentPath.match(/#\/case-study\/(.+)/);
    return match ? match[1] : undefined;
  };

  const renderContent = () => {
    if (currentPath === '#/' || currentPath === '') {
      return <Home />;
    } else if (currentPath === '#/portfolio') {
      return <Portfolio />;
    } else if (currentPath === '#/gallery') {
      return <Gallery />;
    } else if (currentPath.startsWith('#/case-study/')) {
      return <CaseStudy id={getCaseStudyIdFromHash()} />;
    } else if (currentPath === '#/about') {
      return <About />;
    } else if (currentPath === '#/contact') {
      return <Contact />;
    } else {
      return <Home />;
    }
  };

  React.useEffect(() => {
    let title = 'Design Studio';

    if (currentPath === '#/') {
      title = 'Design Studio | Visual Storytelling';
    } else if (currentPath === '#/portfolio') {
      title = 'Our Portfolio | Design Studio';
    } else if (currentPath === '#/gallery') {
      title = 'Case Study Gallery | Design Studio';
    } else if (currentPath.startsWith('#/case-study/')) {
      const caseId = getCaseStudyIdFromHash();
      title = `Case Study ${caseId} | Design Studio`;
    } else if (currentPath === '#/about') {
      title = 'About Us | Design Studio';
    } else if (currentPath === '#/contact') {
      title = 'Contact | Design Studio';
    }

    document.title = title;
  }, [currentPath]);

  return (
    <>
      <Header />
      {renderContent()}
      <Footer />
      {/* 移除下面这行组件 */}
      {/* <ContactButton /> */}
    </>
  );
}

export default App
