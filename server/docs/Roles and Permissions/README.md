# Roles and Permissions

Roles and permissions are essential in every enterprise application. For Garosa Dist, we took the approach of Role-Based access. This means an user can have a single role and depending on what role the user is assigned, it can perform different actions on the application. The following Use Case Diagram can help the reader identificate the actos and cases of the system to understand better when each role and permission is applied to.

![Use Cases](/docs/Roles%20and%20Permissions/source/use_case.svg)

## Roles

The following table contains the information about each role defined on the system. At the moment there are 3 roles, which only the Administrator role cannot be created directly on the system.

| Role Name | Description |
|---|---|
| Administrator | User who manages the users and distribution points of the system |
| Supervisor | User who manages the distribution routes of the system and assign them to a Distributor User |
| Distributor | User who accepts the distribution route and creates a report a for each distribution point to complete the distribution route |

As mentionated above, the system cannot create an Administrator user due security issues and the scope of the project. To create more Administrator users run the following script on the database.

```
    INSERT INTO user_access (userId, roleId, createdOn, updatedOn, deleted)
    VALUES(USERID, 1, NOW(), NOW(), 0);
```

*Note: Replace the USERID with the Id of the user to add the role.*

## Permission Roles

The following table contains the information of each permission role as well as the defaults for each role on the database. This role permissions are used on the user token once logged in on the system.

| Permission Name | Description | Administrator | Supervisor | Distributor |
|---|---|---|---|---|
| canCreateUser | The user can created Supervisors or Distributors users | Enabled | Disabled | Disabled |
| canReadUser | The user can read the information of other users | Enabled | Enabled | Enabled |
| canUpdateUser | The user can update information of other users | Enabled | Disabled | Disabled |
| canDeleteUser | The user can delete another Supervisor or Distributor user | Enabled | Disabled | Disabled |
| canCreateDistributionPoint | The user can create a distribution point | Enabled | Disabled | Disabled |
| canReadDistributionPoint | The user can read the information of a distribution point | Enabled | Enabled | Enabled |
| canUpdateDistributionPoint | The user can update the information of a distribution point | Enabled | Disabled | Disabled |
| canDeleteDistributionPoint | The user can delete a distribution point | Enabled | Disabled | Disabled |
| canSelectDistributionPoint | The user can select a distribution point to assign it to a distribution route | Disabled | Enabled | Disabled |
| canCreateDistributionRoute | The user can create a distribution route | Disabled | Enabled | Disabled |
| canReadDistributionRoute | The user can read the information of a distribution route | Enabled | Enabled | Enabled |
| canUpdateDistributionRoute | The user can update the information of a distribution route | Disabled | Enabled | Disabled |
| canDeleteDistributionRoute | The user can delete the distribution route | Enabled | Enabled | Disabled |
| canAcceptDistributionRoute | The user can accept a distribution route to complete it | Disabled | Disabled | Enabled |
| canCompleteDistributionRoute | The user can complete the distribution route | Disabled | Disabled | Enabled |
| canCreateReport | The user can create a report of a distribution point | Disabled | Disabled | Enabled |
| canReadReport | The user can read a report of a distribution point | Enabled | Enabled | Enabled |
| canUpdateReport | The user can update a report of a distribution point | Disabled | Disabled | Enabled |
| canDeleteReport | The user can delete a report of a distribution point | Enabled | Disabled | Disabled |