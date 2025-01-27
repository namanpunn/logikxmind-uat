sequenceDiagram
    participant User
    participant Backend
    participant Supabase
    participant CrewAI
    participant Gemini
    
    User->>Backend: POST /generate-roadmap (JWT)
    Backend->>Supabase: Get user data by UUID
    Supabase-->>Backend: User profile + history
    Backend->>CrewAI: Kickoff roadmap generation
    CrewAI->>Gemini: Analyze profile
    Gemini-->>CrewAI: Key insights
    CrewAI->>Supabase: Save new roadmap
    Supabase-->>Backend: Confirmation
    Backend-->>User: Personalized roadmap
    
    User->>Backend: POST /chat (JWT + message)
    Backend->>Supabase: Get context + history
    Supabase-->>Backend: Complete user context
    Backend->>CrewAI: Solve problem
    CrewAI->>Gemini: Generate solution
    Gemini-->>CrewAI: Step-by-step help
    Backend->>Supabase: Save interaction
    Backend-->>User: Personalized help

backend/
├── .env
├── app/
    ├── main.py
    ├── crew/
    │   ├── __init__.py
    │   ├── agents.yaml
    │   ├── tasks.yaml
    │   ├── crew_manager.py
    │   └── chat_crew.py
    ├── auth/
    │   ├── __init__.py
    │   └── jwt_handler.py
    ├── services/
    │   ├── __init__.py
    │   ├── supabase_service.py
    │   └── gemini_service.py
    ├── models/
    │   ├── __init__.py
    │   ├── user_data.py
    │   └── schemas.py