export type UserRole = 'user' | 'premium' | 'government' | 'admin'

export interface Permission {
  resource: string
  action: 'create' | 'read' | 'update' | 'delete'
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  user: [
    { resource: 'carbon', action: 'create' },
    { resource: 'carbon', action: 'read' },
    { resource: 'challenges', action: 'create' },
    { resource: 'challenges', action: 'read' },
    { resource: 'articles', action: 'read' },
    { resource: 'air-quality', action: 'read' },
    { resource: 'profile', action: 'read' },
    { resource: 'profile', action: 'update' }
  ],
  premium: [
    { resource: 'carbon', action: 'create' },
    { resource: 'carbon', action: 'read' },
    { resource: 'challenges', action: 'create' },
    { resource: 'challenges', action: 'read' },
    { resource: 'articles', action: 'read' },
    { resource: 'air-quality', action: 'read' },
    { resource: 'profile', action: 'read' },
    { resource: 'profile', action: 'update' },
    { resource: 'analytics', action: 'read' }, // Premium feature
    { resource: 'advanced-reports', action: 'read' } // Premium feature
  ],
  government: [
    { resource: 'carbon', action: 'read' },
    { resource: 'challenges', action: 'read' },
    { resource: 'articles', action: 'read' },
    { resource: 'air-quality', action: 'read' },
    { resource: 'analytics', action: 'read' },
    { resource: 'system-reports', action: 'read' }, // Government access
    { resource: 'user-data', action: 'read' } // Read-only access to aggregated data
  ],
  admin: [
    { resource: 'carbon', action: 'create' },
    { resource: 'carbon', action: 'read' },
    { resource: 'carbon', action: 'update' },
    { resource: 'carbon', action: 'delete' },
    { resource: 'challenges', action: 'create' },
    { resource: 'challenges', action: 'read' },
    { resource: 'challenges', action: 'update' },
    { resource: 'challenges', action: 'delete' },
    { resource: 'articles', action: 'create' },
    { resource: 'articles', action: 'read' },
    { resource: 'articles', action: 'update' },
    { resource: 'articles', action: 'delete' },
    { resource: 'air-quality', action: 'read' },
    { resource: 'profile', action: 'read' },
    { resource: 'profile', action: 'update' },
    { resource: 'users', action: 'read' },
    { resource: 'users', action: 'update' },
    { resource: 'analytics', action: 'read' },
    { resource: 'system-reports', action: 'read' },
    { resource: 'validation', action: 'create' }, // Validate challenges
    { resource: 'validation', action: 'update' }
  ]
}

export function hasPermission(userRole: UserRole, resource: string, action: string): boolean {
  const permissions = ROLE_PERMISSIONS[userRole] || []
  return permissions.some(p => p.resource === resource && p.action === action)
}

export function canAccessFeature(userRole: UserRole, feature: string): boolean {
  const featurePermissions: Record<string, UserRole[]> = {
    'carbon-calculator': ['user', 'premium', 'admin'],
    'air-quality': ['user', 'premium', 'government', 'admin'],
    'challenges': ['user', 'premium', 'admin'],
    'articles': ['user', 'premium', 'government', 'admin'],
    'article-management': ['admin'],
    'challenge-validation': ['admin'],
    'analytics': ['premium', 'government', 'admin'],
    'user-management': ['admin'],
    'system-reports': ['government', 'admin']
  }

  return featurePermissions[feature]?.includes(userRole) || false
}