# Purple Cross – Employee Management Dashboard

## Features

### Employee List
- Displays all employees in a sortable and filterable table
- Shows:
  - Full name
  - Occupation
  - Department
  - Employment status (derived from date of employment)
  - Termination status (derived from termination date)
- Status labels follow the rules defined in the case study
- Pagination for better performance and usability

### Employee Actions
- **View** employee details
- **Edit** employee information
- **Delete** employee with confirmation dialog

### Create & Edit Employee
- Form with validation for required fields
- Prevents duplicate employee codes
- Supports optional termination dates
- Cancel and save actions behave as expected

### Import / Export
- Export employees to a JSON file
- Import employees from a JSON file with basic validation

### UI Enhancements
- Header with application title and logged-in user badge
- Toast notifications for actions (create, delete, import)
- Responsive layout
- Consistent spacing and alignment across pages

---

## Project Setup

```bash
npm install
npm run dev
