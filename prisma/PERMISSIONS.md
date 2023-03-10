# Permissions

This document outlines the design and implementation of the permissions system in our class registration system. By defining specific rules for different user roles and entities, we ensure that only authorized users have access to sensitive information and resources, while protecting against unauthorized access and data loss.

# Design

Users are assigned a role, and the roles include permissions. This allows us to easily authorize users for certain tasks. A Typescript representation of the relation:

```ts
type User = {
  id: number;
  // Other User fields
  role: {
    // Role type
    id: string;
    name: string;
    permissions: {
      // Permission type
      id: string;
      name: string; // Entity concerned
      action: string; // Action performed on the Entity
    }[];
  };
};
```

Actions follow standard CRUD operations and additionally self-operations like viewing one's own profile.

```ts
enum Actions {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  CREATE_SELF = 'CREATE_SELF',
  READ_SELF = 'READ_SELF',
  UPDATE_SELF = 'UPDATE_SELF',
  DELETE_SELF = 'DELETE_SELF',
}
```

The `_SELF` values are mainly for regular Users who must not be allowed to access and modify resources that do not concern them.

## Entity / Action table

| Entity                                   | User                     | Admin                    | Notes                                    |
| ---------------------------------------- | ------------------------ | ------------------------ | ---------------------------------------- |
| User, UserCourse, UserSchedule           | \*\_SELF                 | \*                       |                                          |
| Course, Quiz, Question, Answer, Schedule | none                     | \*                       |                                          |
| QuestionFeedback                         | CREATE_SELF, UPDATE_SELF | \*                       |                                          |
| Role, UserRole                           | none                     | except DELETE_SELF       | Prevent leaving the system with no admin |
| Permission                               | none                     | none                     | Permissions managed directly in SQL      |
| RolePermission                           | none                     | \*                       |                                          |
| Session                                  | CREATE_SELF, DELETE_SELF | CREATE_SELF, DELETE_SELF | Login / Logout                           |
