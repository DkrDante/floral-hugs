import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Homepage from './pages/homepage-romantic-digital-gifting-platform';
import MomentSchedulerDeliveryExperience from './pages/moment-scheduler-delivery-experience';
import GiftGalleryInteractiveCatalog from './pages/gift-gallery-interactive-catalog';
import LoveStoryBuilderPersonalizationStudio from './pages/love-story-builder-personalization-studio';
import GiftRecipientExperienceMagicalDeliveryInterface from './pages/gift-recipient-experience-magical-delivery-interface';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<GiftGalleryInteractiveCatalog />} />
        <Route path="/homepage-romantic-digital-gifting-platform" element={<Homepage />} />
        <Route path="/moment-scheduler-delivery-experience" element={<MomentSchedulerDeliveryExperience />} />
        <Route path="/gift-gallery-interactive-catalog" element={<GiftGalleryInteractiveCatalog />} />
        <Route path="/love-story-builder-personalization-studio" element={<LoveStoryBuilderPersonalizationStudio />} />
        <Route path="/gift-recipient-experience-magical-delivery-interface" element={<GiftRecipientExperienceMagicalDeliveryInterface />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;