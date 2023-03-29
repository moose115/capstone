# Routing

This document roughly describes the sitemap of the website, providing routing information for current and to-do pages. The URLs are organised in a tree-like list, with each endpoint and base path having a brief description. `/` as prefix means a directory under `/pages` while a non-prefixed name like `index` should translate to a file named `index.tsx`.

- `/` root directory, contains basic pages like homepage, about etc
  - `index` the main page, provides general info about the website
  - `about` more info about MHS and their services
  - `classes` more info about classes
  - `signup` a 3 stage signup page, where 1 is basic info, 2 is detailed info and 3 is consents
  - `verify` after signing up through a modal window form the user is redirected to this page, tell user to check their email and verify their account
  - `register` class registration page, serves as a confirmation page for classes, select online / in-person delivery and schedules if any
  - `myclass` display the current class page
  - `quiz` quiz for the current class
- `/profile` the directory for user related content, like contact information or classes in-progess/completed
  - `index` main dashboard, present basic user info and classes summary
  - `settings` settings page where user may update their information, change password etc
- `/admin` administation routes
  - `index` main dashboard, display some analytics (focus on that later)
  - `/classes` managing classes
    - `index` view all classes, because it's only one type treat it like versions of one course and make one version active. Table-like, make selectable and batch operations like duplicate, delete
    - `:id` view one class in detail, edit title, description, manage the quiz for the class
    - `create` rather self explanatory
  - `/users` managing users
    - `index` table with users, brief info, search field, batch operations
    - `:id` view / edit a single user
    - `create` again self explanatory
  - `registrations` this page contains information about current registrations. For example, shows that one user has registered for a class and it's in progress, while other has completed it with passing the quiz
