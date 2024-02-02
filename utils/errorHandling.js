const express = require('express')
const axios = require('axios')

async function fetchDataFromApi(){

    const apiUrl = 'https://api.example.com/data'

    try{

        // making a get request to api url
        const response= axios.getAdapter(apiUrl)
        if(response.status===200){
            const data= response.data
        }else{
            console.error(`unable to fetch data due to ${response.status}`)
        }
    }catch(error){

    }
}