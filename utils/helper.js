var cron = require('node-cron');
const { sendMail } = require('../utils/mailHelper');

const validateUserEmail = function (email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const cronHandler = function(schedule, to, id){
    try{
        /**
         * Cron runs for scheduled datetime
         * Format Ex: 2020-12-31T20:19:01/2020-12-31 20:19:01
         * For every scheduled time cron gets triggred
        */
        const scheduleDate = new Date(schedule).toString().split(' ');
        const week = scheduleDate[0];
        const month = scheduleDate[1];
        const day = scheduleDate[2];

        const getTime = scheduleDate[4].split(':');
        
        const hours = getTime[0];
        const minute = getTime[1];
        const sec = getTime[2];

        job  = cron.schedule(`${sec} ${minute} ${hours} ${day} ${month} ${week}`, async () => {
            sendMail(`Happy New Year`, "Hello BigAppCompant, Happy New Year", to, id);
        });
    } catch(err) {
        console.log('ScheduleEmailException::', err);
    }
}
module.exports = {
    validateUserEmail,
    cronHandler
}