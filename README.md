#API Documentation
all end points should start with `/api`

* ### Visits
| Endpoint      | Method           | Request body  | Response body
| ------------- |:-------------:| -----:| -----:|
| /visits/**{id}**/results      | GET      |   `empty` |  `[{id, value, item_id, item_name, test_name}, .. etc]` |
