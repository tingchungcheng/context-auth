import React from 'react';
import {AuthTabs} from './AuthTabs';

/**
 * Milestone A: auth tabs (Login + Signup) with floating bottom bar.
 * Milestone B will add an app stack (Home) when `user` is set.
 */
export function RootNavigator() {
  return <AuthTabs />;
}
