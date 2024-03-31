import { Autocomplete } from '@mui/material';
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function PaymentSuccssfull() {

    const {courseId} = useParams('courseId');
    const {username,userrole,jwtToken} = useContext(AuthContext);

    useEffect(() => {
        
        const urlParam = new URLSearchParams(window.location.search);
        const paymentId = urlParam.get('razorpay_payment_id');
        const paymentLinkId = urlParam.get('razorpay_payment_link_id');
        const paymentStatus = urlParam.get('razorpay_payment_link_status');
        
        updatePaymentDetails(paymentId,paymentLinkId);
    }, []);

    const updatePaymentDetails = (paymentId,paymentLinkId) => {

        const formData = {
            paymentId,
            courseId,
            paymentLinkId
          };
        const backendEndpoint = `http://localhost:8080/payments/update-payment-details`;
        console.log(formData);
        fetch(backendEndpoint, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          })
            .then((response) => response.json())
            .then((data) => {
              
              console.log('Success:', data);
            })
            .catch((error) => {
              
              console.error('Error:', error);
              // Handle error
            });
    }

    return (
        <div>
            PaymentSuccssfull
            PaymentSuccssfull
        </div>
    )
}

export default PaymentSuccssfull
