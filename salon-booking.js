
module.exports = function salonBooking(db) {

    const storingClientDetails = async (firstName, lastName, phoneNumber) => {
        try {
            await db.none('insert into client (first_name, last_name, phone_number) values ($1, $2, $3);', [firstName, lastName, phoneNumber]);   
        } catch (error) {
            console.log(error)
        }
    }
    const findClient = async (phoneNumber) => {
        try {
            const client = await db.manyOrNone("select phone_number from client where phone_number = $1;", [phoneNumber]);
            return client;    
        } catch (error) {
            console.log(error)
        }
    }
    const theTreatement = async (theCode, price, the_type) => {
        try {
            await db.none('insert into treatment (code, price, the_type) values ($1, $2, $3);', [theCode, price, the_type]);
        } catch (error) {
            console.log(error);
        }
    }
    const findTreatment = async (code) => {
        try {
            const theStylists = await db.manyOrNone("select code from treatment where code = $1;", [code]);
            return theStylists;    
        } catch (error) {
            console.log(error);
        }
    }
    const findAllTreatments = async () => {
        try {
            const theStylists = await db.manyOrNone("select * from treatment;");
            return theStylists;    
        } catch (error) {
            console.log(error);
        }
    }
    const registerTheStylists = async (name, surname, cellNumber, percentage) => {
        try {
            await db.none('insert into stylist (first_name, last_name, phone_number, commission_percentage) values ($1, $2, $3, $4)', [name, surname, cellNumber, percentage]);
        } catch (error) {
            console.log(error);
        }
    }
    const findStylist = async (phoneNumber) => {
        try {
            const theStylists = await db.manyOrNone("select phone_number from stylist where phone_number = $1;", [phoneNumber]);
            return theStylists;    
        } catch (error) {
            console.log(error);
        }
    }
    const makeBooking = async (date, time, clientId, treatmentId, stylistId) => {
        try {
            await db.none('insert into booking (booking_date, booking_time, client_id, treatment_id, stylist_id) values ($1, $2, $3 $4);', [date, time, clientId, treatmentId, stylistId]);
        } catch (error) {
           console.log(error); 
        }
    }
    const seeTheBookings = async () => {
        try {
            const allbookings = await db.manyOrNone('select * from booking;');
            return allbookings;
        } catch (error) {
            console.log(error);
        }
    }
    const findAllBookings = async (date) => {
        const bookingDate = await db.manyOrNone('select booking_date from booking where booking_date = $1;', [date]);
        return bookingDate;
    }
    const findClientBookings = async (clientID) =>{
        const theClient = await db.manyOrNone('select client_id from booking where client_id = $1;',[clientID]);
        return theClient;
    }
    const findStylistsForTreatment = async (treatmentId) => {
        const theTreatement = await db.manyOrNone(`select first_name, the_type from stylist join booking on stylist.id = booking.stylist_id join treatment on booking.treatment_id = treatment.id;`);
        return theTreatement;
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
        seeTheBookings,
        findAllBookings,
        findClientBookings,
        findStylistsForTreatment
    }
}  