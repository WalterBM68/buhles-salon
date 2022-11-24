
module.exports = function salonBooking(db) {

    const storingClientDetails = async (firstName, lastName, phoneNumber) => {
        await db.none('insert into client (first_name, last_name, phone_number) values ($1, $2, $3);', [firstName, lastName, phoneNumber]);   
    }
    const findClient = async (phoneNumber) => {
        const client = await db.oneOrNone("select phone_number from client where phone_number = $1;", [phoneNumber]);
        return client;    
    }
    const theTreatement = async (theCode, price, the_type) => {
        await db.none('insert into treatment (code, price, the_type) values ($1, $2, $3);', [theCode, price, the_type]);
    }
    const findTreatment = async (code) => {
        const theStylists = await db.oneOrNone("select code from treatment where code = $1;", [code]);
        return theStylists;    
    }
    const findAllTreatments = async () => {
        const theStylists = await db.manyOrNone("select * from treatment;");
        return theStylists;    
    }
    const registerTheStylists = async (name, surname, cellNumber, percentage) => {
        await db.none('insert into stylist (first_name, last_name, phone_number, commission_percentage) values ($1, $2, $3, $4)', [name, surname, cellNumber, percentage]);
    }
    const findStylist = async (phoneNumber) => {
        const theStylists = await db.oneOrNone("select phone_number from stylist where phone_number = $1;", [phoneNumber]);
        return theStylists;    
    }
    const makeBooking = async (date, time, clientId, treatmentId, stylistId) => {
        await db.none('insert into booking (booking_date, booking_time, client_id, treatment_id, stylist_id) values ($1, $2, $3 $4);', [date, time, clientId, treatmentId, stylistId]);    
    }
    const findAllBookings = async (date) => {
        const bookingDate = await db.oneOrNone('select booking_date from booking where booking_date = $1;', [date]);
        return bookingDate;
    }
    const findClientBookings = async (clientID) =>{
        const theClient = await db.oneOrNone('select * from booking where client_id = $1;',[clientID]);
        return theClient;
    }
   
    const findStylistsForTreatment = async (treatmentId) => {
        const theTreatement = await db.manyOrNone(`select first_name, the_type from stylist join booking on stylist.id = booking.stylist_id join treatment on booking.treatment_id = treatment.id;`);
        return theTreatement;
    }
    const findAllBookingsByDateAndTime = async (date, time) => {
        if(date){
            await db.manyOrNone('select booking_date from booking where booking_date = $1;', [date]);
        }
        if(time){

        }
        const timeAndDateBookings = await db.manyOrNone(``);
        return timeAndDateBookings;
    }

    return {
        storingClientDetails,
        findClient,
        registerTheStylists,
        findStylist,
        theTreatement,
        findTreatment,
        findAllTreatments,
        makeBooking,
        findAllBookings,
        findClientBookings,
        findStylistsForTreatment,
        findAllBookingsByDateAndTime
    }
}  