import Head from "next/head";
import React, { useEffect, useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Output from "@/components/Output";
import Input from "@/components/Input";
import LoginForm from "@/components/LoginForm";

import { useAuth } from "@/contexts/auth"
const baseUrl = process.env.NEXT_PUBLIC_URL


export default function Home() {
  const { user, login, token } = useAuth() // destructuring 

  // State to store the cookie stand data
  const [cookieStands, setCookieStands] = useState([]);

  async function gitcook() {
    if (token) {
    // Assuming you've obtained the access token as shown in your code

    // Construct the URL for the protected route you want to access
    const protectedUrl = `${baseUrl}/api/v1/Cookies/`;
    // Set up options for the GET request to the protected route
    const protectedOptions = {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token.access}` // Include the access token in the Authorization header
      }
    };
    // Make the GET request to the protected route
    const protectedResponse = await fetch(protectedUrl, protectedOptions);
    // Check the response status
    if (protectedResponse.status === 200) {
      const protectedData = await protectedResponse.json();
      protectedData.forEach((value) => {
        console.log(value); // This will log the current value
        // Update the state using the previous state
        setCookieStands((prevCookieStands) => [...prevCookieStands, value]);
      });
      console.log("Protected Data:", protectedData);
    } else {
      console.log("Failed to access protected route.");
    }
  }}
  async function postDataToProtectedRoute( postData) {
    if (token) {
      // Construct the URL for the protected route you want to access
      const protectedUrl =  `${baseUrl}/api/v1/Cookies/`;
      // Set up options for the POST request to the protected route
      const protectedOptions = {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token.access}`, // Include the access token in the Authorization header
          "Content-Type": "application/json" // Specify content type as JSON
        },
        body: JSON.stringify(postData) // Convert the data to JSON and set it as the request body
      };
      try {
        // Make the POST request to the protected route
        const protectedResponse = await fetch(protectedUrl, protectedOptions);
        // Check the response status
        if (protectedResponse.status === 201) {
          const responseData = await protectedResponse.json();
          setCookieStands([...cookieStands, responseData]);
        } else {
          throw new Error("Failed to post data.");
        }
      } catch (error) {
        throw new Error(`Error: ${error.message}`);
      }
    } else {
      throw new Error("Token is missing.");
    }
  }

  async function deletData( idPost) {
    if (token) {
      // Construct the URL for the protected route you want to access
      const protectedUrl =  `${baseUrl}/api/v1/Cookies/${idPost}`;
      // Set up options for the POST request to the protected route
      const protectedOptions = {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token.access}`, // Include the access token in the Authorization header
        },
      };
      try {
        // Make the POST request to the protected route
        const protectedResponse = await fetch(protectedUrl, protectedOptions);
        // Check the response status
        console.log(protectedResponse.status )

        if (protectedResponse.status === 204) {
          setCookieStands([])
          gitcook()
        } else {
          throw new Error("Failed to post data.");
        }
      } catch (error) {
        throw new Error(`Error: ${error.message}`);
      }
    } else {
      throw new Error("Token is missing.");
    }
  }

  
  function loginformhundeler(event) {
    event.preventDefault();
    const username = event.target.username.value
    const password = event.target.password.value
    login(username, password)
  }
  // Function to add a new cookie stand
  const addCookieStand = (event) => {
    event.preventDefault();
    // Create a new cookie stand object
    const newCookieStand = {
      id: cookieStands.length + 1, // Generate a unique ID
      location: event.target.location.value,
      minimum_customers_per_hour: parseInt(event.target.minCustomersPerHour.value),
      maximum_customers_per_hour: parseInt(event.target.maxCustomersPerHour.value),
      average_cookies_per_sale: parseFloat(event.target.avgCookiesPerSale.value),
    };
    // Update the cookie stands state with the new cookie 
    postDataToProtectedRoute( newCookieStand)
    // Reset the form fields
    event.target.reset();
  };
  useEffect(() => {
    gitcook(); // Call the function whenever the route is accessed
  }, [token]); 
  return (
    <>
      <Head>
        <title>Cookie Stand Admin</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex flex-col items-center flex-grow py-4 space-y-8">
          {!user ? (
            <LoginForm loginformhundeler={loginformhundeler} />
          ) : (
            <>
              <Input handeler={addCookieStand} />
              <Output cookieStands={cookieStands} deletData={deletData} />
            </>
          )}
        </main>
      </div>
      <Footer cookieStands={cookieStands} />

    </>
  );
}


