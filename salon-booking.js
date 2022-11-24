
module.exports = function salonBooking(db) {

    const findClient = async (phoneNumber) => {
        return await db.oneOrNone("select * from client where phone_number = $1", [phoneNumber]); 
    }
    async function findTreatment(code) {
        return await db.oneOrNone("SELECT * FROM treatment WHERE code = $1", [code])
    }
    const findAllTreatments = async () => {
        return await db.manyOrNone("select * from treatment");
    }
    const findStylist = async (phoneNumber) => {
        return await db.oneOrNone("select * from stylist where phone_number = $1", [phoneNumber]);
    }
    const makeBooking = async (date, time, clientId, treatmentId, stylistId) => {
        await db.none("INSERT INTO booking (booking_date, booking_time, client_id, treatment_id, stylist_id) VALUES ($1, $2, $3, $4, $5)", [date, time, clientId, treatmentId, stylistId])     
    }
    const findClientBookings = async (clientID) => {
        return await db.any('select * from booking where client_id = $1',[clientID]);
    }
    const findAllBookings = async (date) => {
        return await db.any('select * from booking where booking_date = $1', [date]);
    }
    const totalIncomeForDay = async (date) => {
        return await db.oneOrNone("select price AS SUM(incomeAmount) from booking join treatment ON booking.treatment_id = treatment.id where booking.booking_date = $1", [date])
    }
    const findStylistsForTreatment = async (treatmentId) => {
        return await db.manyOrNone(`select first_name, the_type from stylist join booking on stylist.id = booking.stylist_id join treatment on booking.treatment_id = treatment.id;`);
    }
    const findAllBookingsByDateAndTime = async (date, time) => {
        if(date && !time){
           return await db.oneOrNone('select * from booking where booking_date = $1;', [date]);
        }else if(time && !date){
            return await db.oneOrNone('select * from booking where booking_time = $1;', [time]);
        }else{
            return await db.any("select * from booking where booking_date = $1 AND booking_time = $2", [date, time])
        }
    }

    return {
        findClient,
        findStylist,
        findTreatment,
        findAllTreatments,
        makeBooking,
        findAllBookings,
        totalIncomeForDay,
        findClientBookings,
        findStylistsForTreatment,
        findAllBookingsByDateAndTime
    }
}  