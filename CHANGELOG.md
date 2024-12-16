# Changelog

## [Unreleased] 

## [0.0.6] 2024-12-16
### Added
- Added SASS support for better styling management.
- Modified User model with extra fields like `username`, `dateOfBirth`, `gender`, and `profilePhoto`.
- Added Enums for `AccountStatus`, `gender`, and `roles` for better data consistency and validation.
- Updated Admin's view (`Users.ejs`) to reflect new user model fields and add functionality for managing roles and statuses.

### Changed
- Updated user model to include `username` as a non-unique field, a default profile photo, gender options, and date of birth.
- Enhanced the styling of Admin's user table with icons for verification status.

### Fixed
- Fixed styling issues related to user forms and dynamic rendering.

## [0.0.5] 2024-12-14
### Added
- Added favicon.ico for better branding.
- Added FontAwesome icons to enhance UI elements.
- Added admin actions to users table for easier management.

### Changed
- Incorporated EJS for rendering dynamic views and templates, allowing the display of user data.
- Migrated project from CommonJS to ES6 Modules for modern syntax and improved module handling.

### Fixed
- Fixed issues related to form submission and data validation for user creation.

## [0.0.4] 2024-12-10 
### Added
- Implemented MongoDB support with Mongoose for user data management.
- Created a User collection in MongoDB to store and manage user information.
- Updated the project with routes and form handling for adding new users.

### Changed
- Incorporated EJS for rendering dynamic views and templates, allowing the display of user data.

### Fixed
    Fixed issues related to form submission and data validation for user creation.
    
### [0.0.3] - 2024-12-07
### Added
- Incorporated header with today's date.

### Changed
- Migrated from Jade (deprecated) to Pug for template rendering.
- Decided to further migrate from Pug to EJS due to better documentation and community support.

### Fixed
- Adjusted project structure to accommodate the changes in template engines.

## [0.0.2] - 2024-12-03
### Added
- Initial migration steps from Jade to Pug, and subsequently to EJS.

### Changed
- Replaced Jade template syntax with Pug and finally with EJS, following project’s needs for better documentation and support.

## [0.0.1] - 2024-11-30
### Added
- Set up basic project structure with Jade template engine, Express framework and Docker techonologies.