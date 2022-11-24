const assert = require('assert');
const  SalonBooking = require('../salon-booking');
const pgPromise = require('pg-promise');
const pgp = pgPromise();

const DATABASE_URL= process.env.DATABASE_URL || "postgresql://postgres:pg123@localhost:5432/buhle_salon_booking";
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

    beforeEach(async function () {
        await db.none("delete from client;");
        await db.none("delete from stylist;");
        await db.none("delete from treatment;");
        await db.none("delete from booking;");
  
    });

    it("should be able to find all clients that have registered", async function () {
        try {
            await booking.storingClientDetails('Kgotso', 'Makwana', '0756478521');
            const clients = await booking.findClient('0756478521');
            
            assert.equal('0756478521', clients[0].phone_number); 
        } catch (error) {
           console.log(error); 
        }
    });

    it("should be able to find treatment by code", async function () {
        try {
            await booking.theTreatement('BGT', 'R215', 'Manicure');
            const treatments = await booking.findTreatment('BGT');
        
            assert.equal('BGT', treatments[0].code); 
        } catch (error) {
            console.log(error)
        }
    });
    it("should be able to list treatments", async function () {
        try {
            await booking.theTreatement('BGT', 'R215', 'Manicure');
            await booking.theTreatement('PPH', 'R175', 'Pedicure');
            const treatments = await booking.findAllTreatments();
        
            assert.equal('BGT', treatments[0].code); 
            assert.equal('R215', treatments[0].price);
            assert.equal('Manicure', treatments[0].the_type);
            //second treatment
            assert.equal('PPH', treatments[1].code);
            assert.equal('R175', treatments[1].price);
            assert.equal('Pedicure', treatments[1].the_type);
        } catch (error) {
            console.log(error)
        }
    });

    it("should be able to find a stylist", async function () {
        try {
            await booking.registerTheStylists("Nosipho", "Xulu", "0846548991", "0.19"); 
            const stylist = await booking.findStylist('0846548991');
            
            assert.equal('0846548991', stylist[0].phone_number); 
        } catch (error) {
            console.log(error);
        }
    });

    it("should be able to allow a client to make a booking", async function () {
        try {
            await booking.storingClientDetails('Kgotso', 'Makwana', '0756478521');
            const client = await booking.findClient('0756478521');
            
            await booking.theTreatement('BGT', 'R215', 'Manicure');
            const treatmentId = await booking.findTreatment('BGT');

            await booking.registerTheStylists("Nosipho", "Xulu", "0846548991", "0.19"); 
            const stylist = await booking.findStylist('0846548991');

            
            const time = '07:00';
            const date = '2022-11-24';

            console.log(client.id);
            console.log(treatmentId.id);
            console.log(stylist.id);

            await booking.makeBooking(date, time, client.id, treatmentId.id,  stylist.id);
            
            const bookings = await booking.findClientBookings(client.id);
            console.log(booking);
            assert.equal(167, client.id);
            
        } catch (error) {
            console.log(error)
        }
    });

    it.skip("should be able to get client booking(s)", async function () {
        try {
            const client1 = await booking.findClient("***");
            const client2 = await booking.findClient("***");
            
            const treatment1 = await booking.findTreatment("***");
            const treatment2 = await booking.findTreatment("***");
    
            await booking.booking(treatment1.id, client1.id, date, time);
            await booking.booking(treatment2.id, client1.id, date, time);
            await booking.booking(treatment1.id, client2.id, date, time);
    
            const bookings = await booking.findAllBookings(client);
    
            assert.equal([], clientBooking)
            
        } catch (error) {
           console.log(error) 
        }
    })

    it.skip("should be able to get bookings for a date", async function () {
        try {
            const client1 = await booking.findClient("***");
            const client2 = await booking.findClient("***");
    
            const treatment1 = await booking.findTreatment("***");
            const treatment2 = await booking.findTreatment("***");
    
            await booking.booking(treatment1.id, client1.id, date, time);
            await booking.booking(treatment2.id, client1.id, date, time);
            await booking.booking(treatment3.id, client2.id, date, time);
    
            const bookings = await booking.findAllBookings({date, time});
    
            assert.equal([], bookings);
            
        } catch (error) {
            console.log(error)
        }

    });

    it.skip("should be able to find the total income for a day", async function() {
        try {
            
            assert.equal(1, 2);
        } catch (error) {
            console.log(error)
        }
    })

    it.skip("should be able to find the most valuable client", async function() {
        try {
            
            assert.equal(1, 2);
        } catch (error) {
            console.log(error)
        }
    })
    it.skip("should be able to find the total commission for a given stylist", async function() {
        try {
            
            assert.equal(1, 2);
        } catch (error) {
            console.log(error)
        }
    })

    after(function () {
        db.$pool.end()
    });

});