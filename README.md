# Test-Wallex

## Run server local
 
 1. open terminal
 2. open this project in terminal
 3. execute command in below:
	 - yarn
	 - yarn start
 4. open "http://localhost:3000/users" in your browser

## Send Query with Graphql

### List
```
{
  users{
    id
    firstName
    lastName
    birthOfDate
    email
    password
  }
}
```

### Read
```
{
  user(id: "5d0d3b3dd724f66f3c75aacf"){
    id
    firstName
    lastName
    birthOfDate
    email
    password
  }
}
```

### Create
```
mutation{
  addUser(
    firstName: "aditya"
    lastName: "wira"
    birthOfDate: "1998/08/15"
    email: "aditya@localhost.com"
    password: "aditlocal"
  ){
    message
  }
}
```

### Update
```
mutation{
  editUser(
    id: "5d0d3b3dd724f66f3c75aacf"
    firstName: "admin"
    lastName: "local"
    birthOfDate: "1998/08/15"
    email: "admin@localhost.com"
    oldPassword: "adminlocal"
    newPassword: "adminlocal"
  ) {
    message
  }
}
```

### Delete
```
mutation{
  deleteUser(id: "5d0d3cc3d724f66f3c75aad0"){
    message
  }
}
```