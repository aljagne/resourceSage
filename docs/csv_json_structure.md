# CSV/JSON Data Structure for subscription

This document defines the structure for the CSV or JSON file to be uploaded by the user

## CSV structure

The CSV will follow the following structure:
* `subscriptionName`: the name of the subscription.
* `cost`: The cost of the subscription.
* `renewalDate`: The renewal date of the subscription.
* `users`: The current users/licenses of the subscription.
* `serviceProvider`: The service provider of the subscription.

 ## JSON structure
    ```json
    [
        {
           "subscriptionName": "Subscription Name",
            "cost": 100,
           "renewalDate": "2024-09-20",
           "users": 10,
            "serviceProvider": "Service Provider"
       }
   ]
    ```
