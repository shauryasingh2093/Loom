import { createBrowserRouter } from 'react-router';
import { Root } from './pages/Root';
import { SplashPage } from './pages/SplashPage';
import { ScanPage } from './pages/ScanPage';
import { DashboardPage } from './pages/DashboardPage';
import { CompanionPage } from './pages/CompanionPage';
import { ActivityPage } from './pages/ActivityPage';
import { BalancedPage } from './pages/BalancedPage';
import { ScribblePage } from './pages/ScribblePage';
import { WeaveTodayPage } from './pages/WeaveTodayPage';
import { PatternInsightsPage } from './pages/PatternInsightsPage';
import { MeetLoomPage } from './pages/MeetLoomPage';
import { PrivacySafetyPage } from './pages/PrivacySafetyPage';
import { StepOutsidePage } from './pages/StepOutsidePage';
import { StepOutsideDonePage } from './pages/StepOutsideDonePage';
import { BodyScanPage } from './pages/BodyScanPage';
import { BodyScanDonePage } from './pages/BodyScanDonePage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: SplashPage },
      { path: 'scan', Component: ScanPage },
      { path: 'dashboard', Component: DashboardPage },
      { path: 'companion', Component: CompanionPage },
      { path: 'activity', Component: ActivityPage },
      { path: 'balanced', Component: BalancedPage },
      { path: 'scribble', Component: ScribblePage },
      { path: 'weave', Component: WeaveTodayPage },
      { path: 'threads', Component: PatternInsightsPage },
      { path: 'guide', Component: MeetLoomPage },
      { path: 'privacy', Component: PrivacySafetyPage },
      { path: 'step-outside', Component: StepOutsidePage },
      { path: 'step-outside-done', Component: StepOutsideDonePage },
      { path: 'body-scan', Component: BodyScanPage },
      { path: 'body-scan-done', Component: BodyScanDonePage },
    ],
  },
]);
