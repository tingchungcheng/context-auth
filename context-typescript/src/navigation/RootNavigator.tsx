import React from 'react';
import {AuthStack} from './AuthStack';

/**
 * Milestone A: auth stack only (Login + Signup).
 * Milestone B will add an app stack (Home) when `user` is set.
 */
export function RootNavigator() {
  return <AuthStack />;
}
