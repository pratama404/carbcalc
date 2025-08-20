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
    { resource: 'air-quality', action: 'read' },
    { resource: 'profile', action: 'read' },
    { resource: 'profile', action: 'update' }
  ],
  premium: [
    { resource: 'carbon', action: 'create' },
    { resource: 'carbon', action: 'read' },
    { resource: 'challenges', action: 'create' },
    { resource: 'challenges', action: 'read' },
    { resource: 'air-quality', action: 'read' },
    { resource: 'profile', action: 'read' },
    { resource: 'profile', action: 'update' }
  ],
  government: [
    { resource: 'carbon', action: 'create' },
    { resource: 'carbon', action: 'read' },
    { resource: 'air-quality', action: 'read' },
    { resource: 'profile', action: 'read' },
    { resource: 'profile', action: 'update' },
    { resource: 'users', action: 'read' }
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
    { resource: 'validation', action: 'create' },
    { resource: 'validation', action: 'update' }
  ]
}

export function hasPermission(userRole: UserRole, resource: string, action: string): boolean {
  const permissions = ROLE_PERMISSIONS[userRole] || []
  return permissions.some(p => p.resource === resource && p.action === action)
}

export function canAccessFeature(userRole: UserRole, feature: string): boolean {
  const featurePermissions: Record<string, UserRole[]> = {
    'carbon-calculator': ['user', 'premium', 'government', 'admin'],
    'air-quality': ['user', 'premium', 'government', 'admin'],
    'challenges': ['user', 'premium', 'admin'],
    'articles': ['admin'],
    'article-management': ['admin'],
    'challenge-validation': ['admin'],
    'user-management': ['government', 'admin']
  }

  return featurePermissions[feature]?.includes(userRole) || false
}