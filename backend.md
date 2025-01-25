## Backend Structure with Supabase and Authentication

### **Backend File Structure**
```
/backend
├── config/
│   ├── agents.yaml        # Agent configurations
│   ├── tasks.yaml         # Task configurations
│   ├── settings.py        # App configuration and environment variables
├── src/
│   ├── __init__.py        # Marks the directory as a Python module
│   ├── main.py            # Main entry point for the application
│   ├── crew.py            # CrewAI agent, task, and crew definitions
│   ├── database.py        # Supabase connection and database operations
│   ├── utils.py           # Utility functions (e.g., logging, response helpers)
│   ├── api/
│   │   ├── __init__.py    # Marks the API directory as a Python module
│   │   ├── routes.py      # API routes for user interaction
│   ├── services/
│   │   ├── __init__.py    # Marks the services directory as a Python module
│   │   ├── resource_service.py  # Logic for resource recommendations
│   │   ├── roadmap_service.py   # Logic for generating roadmaps
│   ├── auth/
│   │   ├── __init__.py    # Marks the auth directory as a Python module
│   │   ├── auth_routes.py # Authentication-related API routes
│   │   ├── auth_service.py # Logic for authentication and user management
├── scripts/
│   ├── seed_database.py   # Script to seed the database with initial data
│   ├── deploy.sh          # Deployment script
├── supabase/
│   ├── schema.sql         # SQL file for initializing Supabase schema
│   ├── migrations/        # Folder for Supabase migrations
├── .env                   # Environment variables
├── requirements.txt       # Python dependencies
└── README.md              # Documentation for the project
```

---

### **File Descriptions**

#### **`config/` Directory**
- **`agents.yaml`**: Defines agent configurations, including roles, goals, and tools.
- **`tasks.yaml`**: Defines task configurations, specifying agents, descriptions, and outputs.
- **`settings.py`**: Loads environment variables and provides global configuration settings.

#### **`src/` Directory**
- **`main.py`**: Entry point for the application, starts the CrewAI workflow.
- **`crew.py`**: Defines agents, tasks, and the CrewAI workflow lifecycle.
- **`database.py`**: Handles Supabase connection and provides helper functions for database operations.
- **`utils.py`**: Utility functions like logging, response formatting, and helper methods.
- **`api/routes.py`**: Defines FastAPI routes for user interaction and resource retrieval.

#### **`src/services/` Directory**
- **`resource_service.py`**: Contains logic for recommending resources.
- **`roadmap_service.py`**: Implements roadmap generation logic.

#### **`src/auth/` Directory**
- **`auth_routes.py`**: API routes for authentication (e.g., register, login, token verification).
- **`auth_service.py`**: Core logic for authentication, including password hashing, token management, and user validation.

#### **`scripts/` Directory**
- **`seed_database.py`**: Script to seed the database with initial data.
- **`deploy.sh`**: Script to automate deployment.

#### **`supabase/` Directory**
- **`schema.sql`**: SQL file defining the database schema for Supabase.
- **`migrations/`**: Folder for managing database schema migrations.

---

### **How It Works**
1. **Run the Application**: `python src/main.py`
    - Starts the CrewAI workflow for generating resources and reports.
2. **Authentication**: Users can register, log in, and authenticate using the endpoints in `auth_routes.py`.
3. **Database Support**: Supabase handles user and resource data, with schema defined in `supabase/schema.sql`.
4. **Modularity**: Services, authentication, and workflows are modularized for maintainability and scalability.
5. **Deployment**: Use `deploy.sh` to automate deployment.

---