# Assessment using Laravel & React

## Installation & Setup

### Backend (Laravel)
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the Backend folder:
   ```
   cd task-backend
   ```
3. Install dependencies:
   ```
   composer install
   ```
4. Copy `.env` file and set up database:
   ```
   cp .env.example .env
   php artisan key:generate
   ```
5. Set up database credentials in `.env`:
   ```env
   DB_DATABASE= '<database name>'
   DB_USERNAME= root
   DB_PASSWORD=
   ```
6. Run migrations and seeder:
   ```
   php artisan migrate --seed
   ```
7. Start the Laravel server:
   ```
   php artisan serve
   ```

### Frontend (React.js)
1. Navigate to the frontend folder:
   ```
   cd task-frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the React development server:
   ```
   npm start
   ```
   ```

The project runs on `http://localhost:3000` in your browser.

## Additional Information

# Login Credentials
1. Email -> admin@gmail.com
   Password -> admin@admin

2. Email -> user@gmail.com
   Password -> admin@admin

3. A logged-in user can only edit or delete comments they have posted.
To test this functionality, log in with different user credentials and attempt to edit or delete comments.

