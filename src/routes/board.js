var express = require('express');
var router = express.Router();
const fs = require('fs');
import { google } from 'googleapis';

import { getNewToken, authorize } from '../config/googleAuth';

/* GET board members 
  Return type: [[board position, name, email], ...]
*/
router.get('/', function (req, res, next) {
  // Load client secrets from a local file.
  //console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    authorize(JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS), getBoardMembers, res);
  }
});

module.exports = router;

/**
 * Sends the board positions, names and emails of the board members as json:
 * @see https://docs.google.com/spreadsheets/d/1Lkq_3bH0Xxmr_Z2z_9W9htGdTRr39K9KRQTwX3fXoeI/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */

function getBoardMembers(auth, response) {
  const sheets = google.sheets({ version: 'v4', auth });

  // calculate which year's board roster is to be sent i.e. 2018-2019, 2019-2020 etc
  let today = new Date();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let prevYear;
  if (month < 10) {
    prevYear = year - 1;
  } else {
    prevYear = year;
    year = prevYear + 1;
  }

  sheets.spreadsheets.values.get({
    spreadsheetId: '1Lkq_3bH0Xxmr_Z2z_9W9htGdTRr39K9KRQTwX3fXoeI',
    range: `${prevYear}-${year}!A2:C`,
  }, (err, res) => {
    if (err) {
      response.status(500).json([]);
      return;
    }
    const rows = res.data.values;
    if (rows.length) {
      console.log(`Board roster found in spreadsheet`);
      // send columns A and C, which correspond to indices 0 and 2 and are board position, name and email respectively
      response.send(rows);
    } else {
      console.log('No data found in board roster');
      response.status(200).json([]);
      return;
    }
  });
}