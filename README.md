# Call Recording
https://mega.nz/#!seZlDaDD!aNrochmu1fbonFfUN9ymSWO5Vbs79a6OYkoggxbN_Rc

#API Documentation

all end points should start with `/api`

* ### Visits
| Endpoint                      | Method  | Request body                  | Response body                                           |
| -------------                 | ------  | --------------                | -----------                                             |
| `/visits/{id}/results`        | `GET`   |   `empty`                     |  `[{id, value, item_id, item_name, test_name}, .. etc]` |
| `/visits/{id}/results`        | `PATCH` |   `[{id, value} .. etc]`      | `empty`                                                 |
| `/visits/{id}/results-report` | `GET`   |   `empty`                     | `pdf file`                                              |
| `/visits/{id}`                | `PATCH` |   `{patient_id, notes, tests_ids: [list of numbers]}`| `empty`                          |
| `/visits`                     | `POST` |   `{patient_id, notes, tests_ids: [list of numbers]}`| `empty`                          |




* ### Users
| Endpoint       | Method | Request body                  | Response body         |
| -------------  | ------ | --------------                | -----------           |
| `/users/login` | `POST` |   `{mobile_number, password}` |  `true` \|\| `false`  |
