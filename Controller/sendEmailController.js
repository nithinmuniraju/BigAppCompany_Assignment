
const db = require("../models");
const emailSchems = db.emails;

const { validateUserEmail, cronHandler}  = require('../utils/helper');

exports.createMail = async (req, res, next) => {
    try{
        /**
         * req.body.schedule must be in format of timestamp
         * Format Ex: "2020-12-31T20:19:01/2020-12-31 20:19:01"
         */
        const { to, from, schedule } = req.body;

        const validateEmail = validateUserEmail(to);
        if(!validateEmail){
            res.status(400).send({
                success: false,
                message: 'Please enter proper email',
            })
        }
        const emailData = {
            to: to,
            from: from,
            schedule: schedule
        }

        const createEmail = await emailSchems.create(emailData);
        if(createEmail){
            //Calling Cron function to schedule email job
            cronHandler(schedule, to);

            res.status(200).send({
                success: true,
                message: 'Data Created',
                Data: createEmail
            })
        } else {
            res.status(400).send({
                success: false,
                message: 'No Data Created',
                Data: []
            })
        }
    } catch(err){
        console.log('EmailCreationException::', err);
        res.status(400).send('Somthing went wrong!!')
    }
}

exports.editMail = async (req, res, next) => {
    try{
        /**
         * req.body.schedule must be in format of timestamp
         * Format Ex: "2020-12-31T20:19:01/2020-12-31 20:19:01"
         */
        const { id, to, from, schedule } = req.body;
        
        const validateEmail = validateUserEmail(to);
        if(!validateEmail){
            res.status(400).send({
                success: false,
                message: 'Please enter proper email',
            })
        }

        const getScheduledEmail = await emailSchems.findByPk(id);

        if(getScheduledEmail){
            const emailData = {
                to: to,
                from: from,
                schedule: schedule
            }
            const updatedData = await getScheduledEmail.update(emailData)

            if(updatedData) {
                //Calling Cron function to schedule email job
                cronHandler(schedule, to);

                res.status(200).send({
                    success: true,
                    message: 'Data Updated',
                    Data: updatedData
                })
            }
        } else {
            res.status(400).send({
                success: false,
                message: 'No Data Found',
                Data: []
            })
        }
    } catch(err){
        console.log('EmailEditException::', err);
        res.status(400).send('Somthing went wrong!!')
    }
}

exports.getAll = async (req, res, next) => {
    try{
        const { limit, offset, page} = req.query;
        const limitValue = !limit ? 10 : parseInt(limit);
        const offsetValue = !offset ? 0: parseInt(offset);
    
    
        const getAllDetails = await emailSchems.findAndCountAll({
            offset: offsetValue,
            limit: limitValue
        });
    
        if(getAllDetails.count > 0){
            res.status(200).send({
                success: true,
                message: 'Data Created',
                Data: getAllDetails
            })
        } else {
            res.status(400).send({
                success: false,
                message: 'No Data Found',
                Data: []
            })
        }
    } catch(err) {
        console.log('GetAllException::', err);
        res.status(400).send('Somthing went wrong!!')
    }
}
exports.getEmailById = async (req, res, next) => {
    try{
        const id = req.query.id
        const getScheduledEmail = await emailSchems.findByPk(id);
        if(getScheduledEmail){
            res.status(200).send({
                success: false,
                message: 'Successful',
                Data: getScheduledEmail
            })
        } else {
            res.status(400).send({
                success: false,
                message: 'No Data Found',
                Data: []
            })
        }
        
    } catch(err) {
        console.log('DeleteException::', err);
        res.status(400).send('Somthing went wrong!!')
    }
}

exports.deleteSchedule = async (req, res, next) => {
    try{
        const id = req.body.id
        const getScheduledEmail = await emailSchems.findByPk(id);
        if(getScheduledEmail){
            const deletedData = await getScheduledEmail.destroy();
            res.status(200).send({
                success: false,
                message: 'Deleted successfullt',
                Data: deletedData.dataValues
            })
        } else {
            res.status(400).send({
                success: false,
                message: 'No Data Found',
                Data: []
            })
        }
        
    } catch(err) {
        console.log('DeleteException::', err);
        res.status(400).send('Somthing went wrong!!')
    }
}

// async function scheduleEmail(schedule, to) {
//     try{
//         /**
//          * Cron runs for scheduled datetime
//          * Format Ex: 2020-12-31T20:19:01/2020-12-31 20:19:01
//          * For every scheduled time cron gets triggred
//         */
//         const scheduleDate = new Date(schedule).toString().split(' ');
//         const week = scheduleDate[0];
//         const month = scheduleDate[1];
//         const day = scheduleDate[2];

//         const getTime = scheduleDate[4].split(':');
        
//         const hours = getTime[0];
//         const minute = getTime[1];
//         const sec = getTime[2];

//         job  = cron.schedule(`${sec} ${minute} ${hours} ${day} ${month} ${week}`, async () => {
//             sendMail(`Happy New Year`, "Hello BigAppCompant, Happy New Year", to);
//         });
//     } catch(err) {
//         console.log('ScheduleEmailException::', err);
//     }
// }