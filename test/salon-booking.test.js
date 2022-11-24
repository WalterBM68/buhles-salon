const assert = require('assert');
const  SalonBooking = require('../salon-booking');
const pgPromise = require('pg-promise');
const pgp = pgPromise();

const DATABASE_URL= process.env.DATABASE_URL || "postgresql://postgres:pg123@localhost:5432/buhle_salon";
const config = { 
	connectionString : DATABASE_URL
}

if (process.env.NODE_ENV == 'production') {
	config.ssl = { 
		rejectUnauthorized : false
	}
}

const db = pgp(config);

let booking = SalonBooking(db);

describe("The Booking Salon", function () {


    it("should be able to find all clients that have registered", async function () {
        const clients = await booking.findClient('0824591714');
        
        assert.equal('0824591714', clients.phone_number); 
    });

    it("should be able to find treatment by code", async function () {
        const treatments = await booking.findTreatment('BGT');
    
        assert.equal('BGT', treatments.code); 
    });

    it("should be able to find a stylist", async function () {
        const stylist = await booking.findStylist('0784561234');
        
        assert.equal('0784561234', stylist.phone_number); 
    });

    it("should be able to allow a client to make a booking", async function () {
        const client = await booking.findClient('0824591714');
        const treatmentId = await booking.findTreatment('BGT');
        const stylistId = await booking.findStylist('0784561234');

        let date = '2022-10-24';
        let time = '07:00';

        await booking.makeBooking(date, time, client.id, treatmentId.id, stylistId.id);
        
        const bookings = await booking.findClientBookings(client.id);
        assert.equal(1, bookings.length);
        await db.none("delete from booking;");
    });

    it("should be able to get client booking(s)", async function () {
        
        const client1 = await booking.findClient("0780019875");
        const client2 = await booking.findClient("0728894561");
        
        const treatment1 = await booking.findTreatment("KYT");
        const treatment2 = await booking.findTreatment("NUZ");

        const stylistId1 = await booking.findStylist('0846548991');
        const stylistId2 = await booking.findStylist('0724570014');

        const time1 = '07:00:00';
        const date = '2022-09-24';

        const time2 = '09:00:00';
        const aDate = '2022-11-24';
 
        await booking.makeBooking(date, time1, client1.id, treatment1.id,  stylistId1.id);
        await booking.makeBooking(aDate, time2, client1.id, treatment2.id, stylistId2.id);
        await booking.makeBooking(aDate, time2, client2.id, treatment1.id, stylistId2.id);

        const bookings = await booking.findClientBookings(client1.id);

        assert.equal(2, bookings.length)
        await db.none("delete from booking;");
    })

    it("should be able to get bookings for a date", async function () {
        
        const client1 = await booking.findClient("0780019875");
        const client2 = await booking.findClient("0728894561");
        
        const treatment1 = await booking.findTreatment("KYT");
        const treatment2 = await booking.findTreatment("NUZ");

        const stylistId1 = await booking.findStylist('0846548991');
        const stylistId2 = await booking.findStylist('0724570014');

        const time1 = '07:00:00';
        const date = '2022-09-24';

        const time2 = '09:00:00';
        const aDate = '2022-11-24';
 
        await booking.makeBooking(date, time1, client1.id, treatment1.id,  stylistId1.id);
        await booking.makeBooking(aDate, time2, client1.id, treatment2.id, stylistId2.id);
        await booking.makeBooking(aDate, time2, client2.id, treatment1.id, stylistId2.id);

        const bookings = await booking.findAllBookings(aDate);

        assert.equal(2, bookings.length)
        await db.none("delete from booking;");
    });

    it.skip("should be able to find the total income for a day", async function() {
        const client1 = await booking.findClient("0780019875");
        const client2 = await booking.findClient("0728894561");
        
        const treatment1 = await booking.findTreatment("KYT");
        const treatment2 = await booking.findTreatment("NUZ");

        const stylistId1 = await booking.findStylist('0846548991');
        const stylistId2 = await booking.findStylist('0724570014');

        const time1 = '07:00:00';
        const date = '2022-09-24';

        const time2 = '09:00:00';
        const aDate = '2022-11-24';
 
        await booking.makeBooking(date, time1, client1.id, treatment1.id,  stylistId1.id);
        await booking.makeBooking(aDate, time2, client1.id, treatment2.id, stylistId2.id);
        await booking.makeBooking(aDate, time2, client2.id, treatment1.id, stylistId2.id);
        
        const sum = await booking.totalIncomeForDay('2022-11-24');

        assert.equal(Number(sum.incomeAmount), 425);
        await db.none("delete from booking;");
    })

    it.skip("should be able to find the most valuable client", async function() {
        
        assert.equal(1, 2);
       
    })
    it.skip("should be able to find the total commission for a given stylist", async function() {
            
        assert.equal(1, 2);
       
    })

    after(function () {
        db.$pool.end()
    });

});