var CronJob = require('cron').CronJob;
var notificationsWorker = require('/notificationsworker');
var moment = require('moment');

const schedulerFactory = function() {
    return {
        start: function() {
            new CronJob('00 * * * * *', function() {
                console.log('Running Send Notifications Worker for ' +
                    moment().format());
                notificationsWorker.run();
            }, null, true, '');
        },
    };
}

module.exports = schedulerFactory();