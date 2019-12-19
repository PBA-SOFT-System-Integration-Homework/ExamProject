## API Endpoints

### Auth
| Endpoint |      Method | Request Body | Response Body |
|-----------|-------------|-------------|---------------|
|`/api/v1/auth` | POST | `{"username": "", "password": ""}` | `{"username": "", "role": "" }`|

### Users
| Endpoint | Method | Request Body | Response Body |
|-----------|------------|------------|------------|
|`/api/v1/users` | POST | `{ "newUser": {"username": "", "password": ""}}` | `{"success": msg }` |

### Events
| Endpoint | Method | Request Body | Response Body |
|-----------|---------|------------|------------------|
|`/api/v1/events` | GET | TDB | `[]`|
