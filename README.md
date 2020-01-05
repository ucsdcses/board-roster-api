# Board roster API

## Requirements

- [node & npm](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/lang/en/)
- [git](https://www.robinwieruch.de/git-essential-commands/)

## Installation

- `git clone https://github.com/ucsdcses/board-roster-api.git`
- `cd board-roster-api`
- `npm install` or `yarn`
- Set the google cloud credentails as env variables for `GOOGLE_APPLICATION_CREDENTIALS` and `GOOGLE_APPLICATION_TOKEN`
- `yarn dev
- optional: include _.env_ in your _.gitignore_


## API Documentation

**Get board memberss**
----
  Get a list of the board members active currently under CSES

* **URL**

  /api/v1/board

* **Method:**

  `GET`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
      [
        [
          "President", 
          "CSESPresident", 
          "CSESPres@ucsd.edu"
        ],
        ....
      ]
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```javascript
      []
    ```

* **Sample Call:**

  ```bash
    http GET https://board-roster-api.herokuapp.com/api/v1/board
  ```
