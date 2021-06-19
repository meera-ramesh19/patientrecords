// var CronJob = require('cron').CronJob;
// var notificationsWorker = require('../workers/notificationsWorker');
// var moment = require('moment');

// const schedulerFactory = function() {
//     return {
//         start: function() {
//             new CronJob('00 * * * * *', function() {
//                 console.log('Running Send Notifications Worker for ' +
//                     moment().format());
//                 notificationsWorker.run();
//             }, null, true, '');
//         },
//     };
// }

// module.exports = schedulerFactory();


const CronJob = require('cron').CronJob;
const notifications = require('./notifications');
const moment = require('moment');

/**
 * Starts a scheduled cron job to check every minute if notifications have to be
 * send and starts sending those.
 */
function start() {
    new CronJob(
        '00 * * * * *', // run every minute
        () => {
            const currentTime = new Date();
            // which code to run
            console.log(
                `Running Send Notifications Worker for ${moment(currentTime).format()}`
            );
            notifications.checkAndSendNecessaryNotifications(currentTime);
        },
        null, // don't run anything after finishing the job
        true, // start the timer
        '' // use default timezone
    );
}

module.exports = {
    start,
};