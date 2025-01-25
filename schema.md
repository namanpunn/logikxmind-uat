# **Schema Architecture for Mentor AI**

## **1. User Collection Schema**

```json
{
  "type": "object",
  "properties": {
    "user_id": {
      "type": "string",
      "description": "Unique identifier for the user."
    },
    "name": {
      "type": "string",
      "description": "Full name of the user."
    },
    "email": {
      "type": "string",
      "description": "Email address of the user."
    },
    "password_hash": {
      "type": "string",
      "description": "Hashed password for secure authentication."
    },
    "career_fields": {
      "type": "array",
      "items": {
        "type": "string",
        "description": "Career fields of interest (e.g., 'Frontend', 'Data Science')."
      }
    },
    "target_companies": {
      "type": "array",
      "items": {
        "type": "string",
        "description": "List of companies the user is targeting."
      }
    },
    "roadmap": {
      "type": "object",
      "additionalProperties": {
        "type": "array",
        "items": {
          "type": "string",
          "description": "Tasks for each semester in the roadmap."
        }
      },
      "description": "Roadmap split into semesters with tasks."
    },
    "certifications": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "cert_id": {
            "type": "string",
            "description": "Unique identifier for the certification."
          },
          "name": {
            "type": "string",
            "description": "Name of the certification."
          },
          "issuer": {
            "type": "string",
            "description": "Organization that issued the certification."
          },
          "issue_date": {
            "type": "string",
            "format": "date",
            "description": "Date when the certification was issued."
          }
        },
        "required": ["cert_id", "name", "issuer", "issue_date"]
      }
    },
    "progress_data": {
      "type": "object",
      "properties": {
        "completed_tasks": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "List of completed tasks."
        },
        "ongoing_tasks": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "List of ongoing tasks."
        }
      },
      "required": ["completed_tasks", "ongoing_tasks"]
    },
    "persistent_logs": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of the message."
          },
          "message": {
            "type": "string",
            "description": "Message content."
          },
          "sender": {
            "type": "string",
            "enum": ["user", "ai"],
            "description": "Indicates whether the message was sent by the user or AI."
          }
        },
        "required": ["timestamp", "message", "sender"]
      }
    }
  },
  "required": ["user_id", "name", "email", "password_hash"]
}
```

---

## **2. Resource Collection Schema**

```json
{
  "type": "object",
  "properties": {
    "resource_id": {
      "type": "string",
      "description": "Unique identifier for the resource."
    },
    "title": {
      "type": "string",
      "description": "Title of the resource."
    },
    "description": {
      "type": "string",
      "description": "Brief description of the resource."
    },
    "category": {
      "type": "string",
      "description": "Category of the resource (e.g., 'Frontend', 'Backend')."
    },
    "link": {
      "type": "string",
      "description": "URL to access the resource."
    },
    "metadata": {
      "type": "object",
      "properties": {
        "duration": {
          "type": "string",
          "description": "Duration of the resource content."
        },
        "difficulty": {
          "type": "string",
          "enum": ["Beginner", "Intermediate", "Advanced"],
          "description": "Difficulty level of the resource."
        },
        "type": {
          "type": "string",
          "enum": ["Video", "Article", "Book", "Course"],
          "description": "Type of resource."
        }
      },
      "required": ["duration", "difficulty", "type"]
    },
    "feedback": {
      "type": "object",
      "properties": {
        "positive": {
          "type": "integer",
          "description": "Number of positive feedback."
        },
        "negative": {
          "type": "integer",
          "description": "Number of negative feedback."
        }
      },
      "required": ["positive", "negative"]
    },
    "vector_embedding": {
      "type": "array",
      "items": {
        "type": "number"
      },
      "description": "Vector embedding for AI-based recommendations."
    }
  },
  "required": ["resource_id", "title", "category", "link"]
}
```

---

## **3. Chat History (Persistent Memory) Schema**

```json
{
  "type": "object",
  "properties": {
    "chat_id": {
      "type": "string",
      "description": "Unique identifier for the chat session."
    },
    "user_id": {
      "type": "string",
      "description": "Identifier of the user associated with the chat."
    },
    "messages": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "message_id": {
            "type": "string",
            "description": "Unique identifier for the message."
          },
          "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of the message."
          },
          "message_text": {
            "type": "string",
            "description": "Content of the message."
          },
          "sender": {
            "type": "string",
            "enum": ["user", "ai"],
            "description": "Indicates whether the message was sent by the user or AI."
          },
          "metadata": {
            "type": "object",
            "properties": {
              "context": {
                "type": "string",
                "description": "Context or intent of the message."
              },
              "response_quality": {
                "type": "integer",
                "description": "Feedback on AI response quality (1-5 scale)."
              }
            }
          }
        },
        "required": ["message_id", "timestamp", "message_text", "sender"]
      }
    }
  },
  "required": ["chat_id", "user_id", "messages"]
}
```

---

## **4. Company Collection Schema**

```json
{
  "type": "object",
  "properties": {
    "company_id": {
      "type": "string",
      "description": "Unique identifier for the company."
    },
    "company_name": {
      "type": "string",
      "description": "Name of the company."
    },
    "job_descriptions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "job_id": {
            "type": "string",
            "description": "Unique identifier for the job."
          },
          "role": {
            "type": "string",
            "description": "Job role or title."
          },
          "requirements": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "List of required skills for the job."
          },
          "description": {
            "type": "string",
            "description": "Description of the job role."
          }
        },
        "required": ["job_id", "role", "requirements", "description"]
      }
    },
    "preferred_colleges": {
      "type": "array",
      "items": {
        "type": "string",
        "description": "List of college IDs preferred by the company."
      }
    }
  },
  "required": ["company_id", "company_name"]
}
```