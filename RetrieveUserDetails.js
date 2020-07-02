const customerDetails = {
    "customerid": "IJ101"
};

function retrieveUserDetails(customerid) {
    if(!customerid) {
        return {
            success: false
        }
    }
    else if(customerid == customerDetails.customerid) {
        return {
            success:true,
            customer : {
                id: "IJ101",
                name: "Tom Jha",
                last_login: "04 Feb 2018",
                balance: "$3000",
            },
            transaction:[{
                date: "01 Feb 2018",
                desc: "Room Rent",
                amount: "$700"
            },
            {
                date: "02 Feb 2018",
                desc: "Morrision",
                amount: "$40"
            }
            ]
        }
    }
    else if(customerid == ""){
        return {
            success: false
        }
    }
}
module.exports = {
    retrieveUserDetails
}