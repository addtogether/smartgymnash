var options = {
    "key": "rzp_test_uaMOlz231PzshJ", // Enter the Key ID generated from the Dashboard
    "amount": 2000*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Rent management",
    "description":"Gym Membership",
    "image": "../images/Logo.png",
    "handler": function (response){
        dbhandler(response);
        // console.log(response);
    }
};

var rzp1 = new Razorpay(options);
rzp1.on('payment.failed', function (response){
    alert(response.error.description);
    // console.log(response);
});

let btn = document.getElementById('btn');

btn.onclick=()=>{
     rzp1.open();
}

function dbhandler(res){
    if(res.razorpay_payment_id != null){
        let payment_id = res.razorpay_payment_id;
        let object = {
            method: "POST",                        // declares HTTP request method
            headers: {
                "Content-Type": "application/json",  // declares format of data
                "Accept": "application/json"

            },
            body: JSON.stringify(
                {
                    "payment_id": payment_id,

                }
            )

        };
        alert('Payment Successful');
        fetch("http://localhost:3000/payment", object);

        // //Ajax
        // let xhr = new XMLHttpRequest(); //creating XML object
        // xhr.open("POST", "backend/payment.php", true);
        // xhr.onload = ()=>{
        //     if(xhr.readyState == XMLHttpRequest.DONE){
        //         if(xhr.status == 200){
        //             let data = xhr.response;
        //             if(data == "success"){
        //                 alert('Payment Successful');
        //                 location.href = "dashboard.php";
        //             }
        //             else{
        //                 alert(data);
        //             }
        //         }
        //     }
        // }
        // Sending data from Ajax to php
       // let formData = new FormData(form); //creating new formData
        //formData.append("payid",res.razorpay_payment_id);
        //xhr.send(formData); // sending form data to php
    }
    else{
        alert("Payment Not Successful");
    }
}