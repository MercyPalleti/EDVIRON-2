# EDVIRON Frontend

## Project Setup Instructions

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and define necessary variables, e.g.:
    ```env
    VITE_API_URL=http://localhost:5000
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

---

## Pages & Components Documentation

### Pages

- **Login.jsx**  
  Allows the user to authenticate by providing email and password.

- **Dashboard.jsx**  
  Displays an overview of transactions and provides navigation.
  📊 Dashboard.jsx – Filters and Sorting Functionality

The Dashboard page displays a table of transactions and provides several filters to customize the displayed data. Here's how to use the filters:

✅ Column Sorting

Each column header (e.g., Payment Time, Amount, etc.) is clickable.

Clicking the column header toggles between ascending (ASC) and descending (DESC) order.

The currently active sort column and order are applied to the API query, updating the displayed data in real time.

✅ Status Filter

A dropdown allows you to filter transactions by their status (e.g., Completed, Pending, Failed).

Select a specific status from the dropdown to show only transactions matching that status.

✅ Date Filter

You can filter transactions by a date range.

Enter the start date and end date in the provided date pickers.

After selecting dates, the displayed transactions will update to include only those within the specified range.

✅ School ID Filter

A text input allows you to enter a School ID.

After entering a valid School ID, only transactions linked to that school will be displayed.

- **CreatePayment.jsx**  
  Form to create a new payment entry.

- **SchoolTransactions.jsx**  
  Displays a filtered list of transactions related to specific schools.

---

### Components

- **Navbar.jsx**  
  The navigation bar with links to different sections.

- **FiltersPanel.jsx**  
  Provides filtering options for transactions (e.g., by date, school).

- **Pagination.jsx**  
  Handles paginated display of transaction data.

- **ProtectedRoute.jsx**  
  Protects routes by ensuring the user is authenticated.

- **TransactionsTable.jsx**  
  Displays transaction data in a table format.

---

## Build for Production

```bash
npm run build
```

---

## Notes

- Ensure `.env` is properly set up to point to your backend API.
